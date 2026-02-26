import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { followUpEvents } from "../mock/followUpEvents";
import type { FollowUpEvent } from "../types";

export interface FollowUpFilter {
  type: FollowUpEvent["follow_up_type"] | "all";
  person: string | "all";
}

export interface FollowUpState {
  events: FollowUpEvent[];
  filter: FollowUpFilter;
}

export type FollowUpAction =
  | { type: "ADD_EVENT"; payload: FollowUpEvent }
  | {
      type: "VOID_EVENT";
      payload: {
        event_id: string;
        void_reason?: string;
        voided_by: string;
        voided_at?: string;
      };
    }
  | { type: "SET_FILTER"; payload: Partial<FollowUpFilter> };

const defaultFilter: FollowUpFilter = {
  type: "all",
  person: "all",
};

const initialState: FollowUpState = {
  events: followUpEvents,
  filter: defaultFilter,
};

export function followUpReducer(
  state: FollowUpState,
  action: FollowUpAction
): FollowUpState {
  switch (action.type) {
    case "ADD_EVENT": {
      const exists = state.events.some(
        (item) => item.event_id === action.payload.event_id
      );

      if (exists) {
        return state;
      }

      return {
        ...state,
        events: [action.payload, ...state.events],
      };
    }

    case "VOID_EVENT": {
      const voidedAt = action.payload.voided_at ?? new Date().toISOString();
      return {
        ...state,
        events: state.events.map((event) => {
          if (event.event_id !== action.payload.event_id) {
            return event;
          }

          return {
            ...event,
            status: "voided",
            void_reason: action.payload.void_reason ?? "记录作废",
            voided_by: action.payload.voided_by,
            voided_at: voidedAt,
          };
        }),
      };
    }

    case "SET_FILTER":
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.payload,
        },
      };

    default:
      return state;
  }
}

interface FollowUpStoreContextValue {
  state: FollowUpState;
  dispatch: Dispatch<FollowUpAction>;
  getEventsByCustomer: (customerId: string) => FollowUpEvent[];
  getFilteredEvents: (
    customerId: string,
    filter?: Partial<FollowUpFilter>
  ) => FollowUpEvent[];
}

const FollowUpStoreContext = createContext<FollowUpStoreContextValue | null>(
  null
);

interface FollowUpStoreProviderProps {
  children: ReactNode;
}

export function FollowUpStoreProvider({ children }: FollowUpStoreProviderProps) {
  const [state, dispatch] = useReducer(followUpReducer, initialState);

  const getEventsByCustomer = useCallback(
    (customerId: string) =>
      state.events.filter((event) => event.customer_id === customerId),
    [state.events]
  );

  const getFilteredEvents = useCallback(
    (customerId: string, filter?: Partial<FollowUpFilter>) => {
      const appliedFilter: FollowUpFilter = {
        ...state.filter,
        ...filter,
      };

      return state.events.filter((event) => {
        if (event.customer_id !== customerId) {
          return false;
        }

        if (
          appliedFilter.type !== "all" &&
          event.follow_up_type !== appliedFilter.type
        ) {
          return false;
        }

        if (
          appliedFilter.person !== "all" &&
          event.created_by !== appliedFilter.person
        ) {
          return false;
        }

        return true;
      });
    },
    [state.events, state.filter]
  );

  const value = useMemo<FollowUpStoreContextValue>(
    () => ({
      state,
      dispatch,
      getEventsByCustomer,
      getFilteredEvents,
    }),
    [state, dispatch, getEventsByCustomer, getFilteredEvents]
  );

  return createElement(FollowUpStoreContext.Provider, { value }, children);
}

export function useFollowUpStore(): FollowUpStoreContextValue {
  const context = useContext(FollowUpStoreContext);
  if (!context) {
    throw new Error("useFollowUpStore must be used within a FollowUpStoreProvider");
  }
  return context;
}
