import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { textOfValue, useI18n } from '../../i18n';
import { getServiceLineLabel } from '../../constants/followupMeta';
import { getPersonLabel } from '../../mock/personnel';
import Badge from '../../components/ui/Badge';
import { customers } from '../../mock/customers';
import { useFollowUpStore } from '../../store/followUpStore';
import { daysAgo } from '../../utils/datetime';

export default function CustomerList() {
  const navigate = useNavigate();
  const { locale, t } = useI18n();
  const { state } = useFollowUpStore();

  const customerStats = useMemo(() => {
    const map = new Map<
      string,
      {
        total: number;
        latestTime?: string;
      }
    >();

    state.events.forEach((event) => {
      if (event.status !== 'normal') {
        return;
      }

      const current = map.get(event.customer_id) ?? { total: 0, latestTime: undefined };
      const eventTime = new Date(event.follow_up_time).getTime();
      const latestTimeValue = current.latestTime ? new Date(current.latestTime).getTime() : -Infinity;

      map.set(event.customer_id, {
        total: current.total + 1,
        latestTime: eventTime > latestTimeValue ? event.follow_up_time : current.latestTime
      });
    });

    return map;
  }, [state.events]);

  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-4">
          <h1 className="text-xl font-semibold text-text-primary">{t('customerList.title')}</h1>
        </header>

        <section className="overflow-hidden rounded-card border border-border-color bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.name')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.serviceLine')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.segment')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.owner')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.totalFollowups')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wide text-text-secondary">
                    {t('customerList.latestFollowup')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {customers.map((customer) => {
                  const stats = customerStats.get(customer.customer_id);
                  const latestText = stats?.latestTime
                    ? t('time.daysAgo', { days: daysAgo(stats.latestTime) })
                    : t('common.noRecords');

                  return (
                    <tr
                      key={customer.customer_id}
                      onClick={() => navigate(`/customers/${customer.customer_id}`)}
                      className="cursor-pointer hover:bg-primary-light"
                    >
                      <td className="px-4 py-3 text-sm text-text-primary">
                        <Link
                          to={`/customers/${customer.customer_id}`}
                          onClick={(event) => event.stopPropagation()}
                          className="font-medium text-primary hover:underline"
                        >
                          {textOfValue(customer.name, locale)}
                        </Link>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1.5">
                          {customer.service_line_tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs text-slate-700"
                            >
                              {getServiceLineLabel(tag, locale)}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">
                        <Badge variant="segment" value={customer.customer_segment} />
                      </td>
                      <td className="px-4 py-3 text-sm text-text-primary">{getPersonLabel(customer.assigned_to, locale)}</td>
                      <td className="px-4 py-3 text-sm text-text-primary">{stats?.total ?? 0}</td>
                      <td className="px-4 py-3 text-sm text-text-primary">{latestText}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
