import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { textOfValue, useI18n } from '../../i18n';
import EventList from '../../components/followup/EventList';
import FilterBar, { type FilterValue } from '../../components/followup/FilterBar';
import NewEventDrawer, { type NewEventPayload } from '../../components/followup/NewEventDrawer';
import OverviewBar from '../../components/followup/OverviewBar';
import VoidModal from '../../components/followup/VoidModal';
import Badge from '../../components/ui/Badge';
import { customers } from '../../mock/customers';
import { useFollowUpStore } from '../../store/followUpStore';
import type { FollowUpEvent } from '../../types';
import { generateId } from '../../utils/uuid';

const tabs = [
  { key: 'basic', labelKey: 'customerDetail.tab.basic' },
  { key: 'followup', labelKey: 'customerDetail.tab.followup' },
  { key: 'opportunity', labelKey: 'customerDetail.tab.opportunity' },
  { key: 'documents', labelKey: 'customerDetail.tab.documents' }
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function CustomerDetail() {
  const { locale, t } = useI18n();
  const { id } = useParams<{ id: string }>();
  const customer = customers.find((item) => item.customer_id === id);

  const { state, dispatch, getEventsByCustomer, getFilteredEvents } = useFollowUpStore();

  const [activeTab, setActiveTab] = useState<TabKey>('followup');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [voidTarget, setVoidTarget] = useState<FollowUpEvent | null>(null);

  useEffect(() => {
    dispatch({ type: 'SET_FILTER', payload: { type: 'all', person: 'all' } });
  }, [dispatch, id]);

  const allEvents = useMemo(() => {
    if (!id) {
      return [];
    }

    return getEventsByCustomer(id)
      .slice()
      .sort(
        (left, right) =>
          new Date(right.follow_up_time).getTime() - new Date(left.follow_up_time).getTime()
      );
  }, [getEventsByCustomer, id]);

  const filteredEvents = useMemo(() => {
    if (!id) {
      return [];
    }

    return getFilteredEvents(id)
      .slice()
      .sort(
        (left, right) =>
          new Date(right.follow_up_time).getTime() - new Date(left.follow_up_time).getTime()
      );
  }, [getFilteredEvents, id]);

  if (!customer || !id) {
    return (
      <main className="min-h-screen bg-neutral-bg px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-card border border-border-color bg-white p-6">
          <p className="text-text-primary">{t('customerDetail.notFound')}</p>
          <Link to="/customers" className="mt-3 inline-block text-primary hover:underline">
            {t('customerDetail.backToList')}
          </Link>
        </div>
      </main>
    );
  }

  const customerName = textOfValue(customer.name, locale);

  const handleCreateEvent = (payload: NewEventPayload) => {
    const now = new Date().toISOString();
    dispatch({
      type: 'ADD_EVENT',
      payload: {
        event_id: generateId(),
        customer_id: customer.customer_id,
        created_by: payload.created_by,
        follow_up_type: payload.follow_up_type,
        follow_up_time: payload.follow_up_time,
        summary: payload.summary,
        intention_level: payload.intention_level ?? undefined,
        next_follow_up_time: payload.next_follow_up_time,
        action_items: payload.action_items,
        status: 'normal',
        created_at: now
      }
    });
  };

  const handleFilterChange = (value: FilterValue) => {
    dispatch({ type: 'SET_FILTER', payload: value });
  };

  const handleVoidConfirm = (eventId: string, reason: string) => {
    dispatch({
      type: 'VOID_EVENT',
      payload: {
        event_id: eventId,
        void_reason: reason,
        voided_by: 'current_user',
        voided_at: new Date().toISOString()
      }
    });

    setVoidTarget(null);
  };

  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl space-y-4">
        <nav className="text-sm text-text-secondary">
          <Link to="/customers" className="hover:text-primary hover:underline">
            {t('customerDetail.listCrumb')}
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-text-primary">{customerName}</span>
        </nav>

        <header className="rounded-card border border-border-color bg-white p-4 shadow-card">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-semibold text-text-primary">{customerName}</h1>
            <Badge variant="segment" value={customer.customer_segment} />
          </div>

          <div className="mt-5 border-b border-slate-200">
            <div className="flex flex-wrap gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`-mb-px border-b-2 pb-2 text-sm ${
                    activeTab === tab.key
                      ? 'border-primary font-semibold text-primary'
                      : 'border-transparent font-medium text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {t(tab.labelKey)}
                </button>
              ))}
            </div>
          </div>
        </header>

        {activeTab === 'followup' ? (
          <section className="space-y-4">
            <OverviewBar events={allEvents} />
            <FilterBar
              events={allEvents}
              value={state.filter}
              onFilterChange={handleFilterChange}
              onNewClick={() => setDrawerOpen(true)}
            />
            <EventList events={filteredEvents} onVoid={(event) => setVoidTarget(event)} />
          </section>
        ) : (
          <section className="rounded-card border border-border-color bg-white py-20 text-center text-text-secondary shadow-card">
            {t('common.comingSoon')}
          </section>
        )}
      </div>

      <NewEventDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} onSubmit={handleCreateEvent} />
      <VoidModal
        open={Boolean(voidTarget)}
        event={voidTarget}
        onClose={() => setVoidTarget(null)}
        onVoid={handleVoidConfirm}
      />
    </main>
  );
}
