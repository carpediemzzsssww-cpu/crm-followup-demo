import type { FollowUpEvent } from '../../types';
import EventCard from './EventCard';

interface EventListProps {
  events: FollowUpEvent[];
  onVoid: (event: FollowUpEvent) => void;
}

export default function EventList({ events, onVoid }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="card-enterprise flex min-h-72 flex-col items-center justify-center border-dashed px-4 py-10 text-center">
        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M7 4h10M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m-3-3h6" />
          </svg>
        </div>
        <p className="text-base font-medium text-text-primary">暂无跟进记录</p>
        <p className="mt-1 text-sm text-text-secondary">点击「新增跟进」开始记录第一条</p>
      </div>
    );
  }

  return (
    <section className="space-y-3">
      {events.map((event) => (
        <EventCard key={event.event_id} event={event} onVoid={onVoid} />
      ))}
    </section>
  );
}
