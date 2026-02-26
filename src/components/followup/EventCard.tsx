import { useMemo, useState } from 'react';
import { FOLLOW_UP_TYPE_META } from '../../constants/followupMeta';
import type { FollowUpEvent } from '../../types';
import { formatToLocal } from '../../utils/datetime';
import Badge from '../ui/Badge';

interface EventCardProps {
  event: FollowUpEvent;
  onVoid: (event: FollowUpEvent) => void;
}

const SUMMARY_MAX_LENGTH = 100;

function getSummary(summary: string, expanded: boolean): { text: string; showToggle: boolean } {
  if (summary.length <= SUMMARY_MAX_LENGTH) {
    return { text: summary, showToggle: false };
  }

  return {
    text: expanded ? summary : `${summary.slice(0, SUMMARY_MAX_LENGTH)}...`,
    showToggle: true
  };
}

export default function EventCard({ event, onVoid }: EventCardProps) {
  const [expanded, setExpanded] = useState(false);

  const summary = useMemo(() => getSummary(event.summary, expanded), [event.summary, expanded]);
  const typeMeta = FOLLOW_UP_TYPE_META[event.follow_up_type];
  const isVoided = event.status === 'voided';

  return (
    <article
      className={`card-enterprise border-l-4 ${
        isVoided
          ? 'border-l-slate-400 bg-voided-bg opacity-50'
          : 'border-l-primary'
      }`}
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-text-primary">
          <span className={`h-2.5 w-2.5 rounded-full ${typeMeta.dotClassName}`} />
          {typeMeta.label}
        </span>
        <span className="text-sm text-text-secondary">{formatToLocal(event.follow_up_time)}</span>
        <span className="text-sm text-text-secondary">{event.created_by}</span>
      </header>

      <div className="mt-3 text-sm leading-6 text-text-primary">
        <span>{summary.text}</span>
        {summary.showToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="ml-2 text-primary hover:underline"
          >
            {expanded ? '收起' : '展开'}
          </button>
        ) : null}
      </div>

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
          {event.intention_level ? <Badge variant="intention" value={event.intention_level} /> : null}
          {event.next_follow_up_time ? (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              下次跟进：{formatToLocal(event.next_follow_up_time)}
            </span>
          ) : null}
          {isVoided ? (
            <span className="inline-flex items-center rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-white">
              已作废
            </span>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => onVoid(event)}
          disabled={isVoided}
          className={`inline-flex h-9 items-center justify-center rounded-control px-4 text-sm font-medium ${
            isVoided
              ? 'cursor-not-allowed bg-slate-100 text-slate-400'
              : 'bg-red-50 text-danger hover:bg-red-100'
          }`}
        >
          作废
        </button>
      </footer>

      {isVoided ? (
        <div className="mt-3 rounded-control bg-slate-100 p-3 text-xs leading-5 text-slate-600">
          <p>作废原因：{event.void_reason || '未填写'}</p>
          <p>作废人：{event.voided_by || '未记录'}</p>
          <p>作废时间：{event.voided_at ? formatToLocal(event.voided_at) : '未记录'}</p>
        </div>
      ) : null}
    </article>
  );
}
