import { FOLLOW_UP_TYPE_META } from '../../constants/followupMeta';
import type { FollowUpEvent } from '../../types';
import { daysAgo } from '../../utils/datetime';

interface OverviewBarProps {
  events: FollowUpEvent[];
}

const TRACKED_TYPES: Array<FollowUpEvent['follow_up_type']> = ['call', 'meeting', 'visit'];

function countEventsThisMonth(events: FollowUpEvent[]): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return events.filter((event) => {
    const eventDate = new Date(event.follow_up_time);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  }).length;
}

export default function OverviewBar({ events }: OverviewBarProps) {
  const normalEvents = events.filter((event) => event.status === 'normal');

  const totalCount = normalEvents.length;
  const latestEvent = normalEvents
    .slice()
    .sort(
      (left, right) =>
        new Date(right.follow_up_time).getTime() - new Date(left.follow_up_time).getTime()
    )[0];

  const latestText = latestEvent ? `${daysAgo(latestEvent.follow_up_time)}天前` : '暂无记录';
  const monthCount = countEventsThisMonth(normalEvents);

  const typeCounts = TRACKED_TYPES.map((type) => ({
    type,
    count: normalEvents.filter((event) => event.follow_up_type === type).length
  }));

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <article className="card-enterprise">
        <p className="text-xs text-text-secondary">累计跟进次数</p>
        <p className="mt-2 text-2xl font-semibold text-text-primary">{totalCount}</p>
      </article>

      <article className="card-enterprise">
        <p className="text-xs text-text-secondary">最近跟进</p>
        <p className="mt-2 text-2xl font-semibold text-text-primary">{latestText}</p>
      </article>

      <article className="card-enterprise">
        <p className="text-xs text-text-secondary">本月跟进</p>
        <p className="mt-2 text-2xl font-semibold text-text-primary">{monthCount}</p>
      </article>

      <article className="card-enterprise">
        <p className="text-xs text-text-secondary">类型分布</p>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {typeCounts.map((item) => {
            const meta = FOLLOW_UP_TYPE_META[item.type];
            return (
              <span key={item.type} className="inline-flex items-center gap-1.5 text-sm text-text-primary">
                <span className={`h-2 w-2 rounded-full ${meta.dotClassName}`} />
                {meta.shortLabel}
                {item.count}
              </span>
            );
          })}
        </div>
      </article>
    </section>
  );
}
