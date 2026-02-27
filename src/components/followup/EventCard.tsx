import { useMemo, useState } from 'react';
import { textOf, textOfValue, useI18n } from '../../i18n';
import { FOLLOW_UP_TYPE_META } from '../../constants/followupMeta';
import { getPersonLabel } from '../../mock/personnel';
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
  const { locale, t } = useI18n();
  const [expanded, setExpanded] = useState(false);

  const summaryText = textOfValue(event.summary, locale);
  const summary = useMemo(() => getSummary(summaryText, expanded), [summaryText, expanded]);
  const typeMeta = FOLLOW_UP_TYPE_META[event.follow_up_type];
  const isVoided = event.status === 'voided';

  return (
    <article
      className={`card-enterprise border-l-4 ${
        isVoided
          ? 'border-l-slate-400 bg-voided-bg opacity-50'
          : 'border-l-primary'
      } p-3`}
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-text-primary">
          <span className={`h-2.5 w-2.5 rounded-full ${typeMeta.dotClassName}`} />
          {textOf(typeMeta.label, locale)}
        </span>
        <span className="text-[13px] text-text-secondary">{formatToLocal(event.follow_up_time)}</span>
        <span className="text-[13px] text-text-secondary">{getPersonLabel(event.created_by, locale)}</span>
      </header>

      <div className="mt-3 text-[13px] leading-5 text-text-primary">
        <span>{summary.text}</span>
        {summary.showToggle ? (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="ml-2 text-primary hover:underline"
          >
            {expanded ? t('common.collapse') : t('common.expand')}
          </button>
        ) : null}
      </div>

      <footer
        className={`mt-4 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3 ${
          isVoided ? 'justify-start' : 'justify-between'
        }`}
      >
        <div className="flex flex-wrap items-center gap-2 text-[13px] text-text-secondary">
          {event.intention_level ? <Badge variant="intention" value={event.intention_level} /> : null}
          {event.next_follow_up_time ? (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {t('event.nextFollowup')} {formatToLocal(event.next_follow_up_time)}
            </span>
          ) : null}
          {isVoided ? (
            <span className="inline-flex items-center rounded-full bg-slate-700 px-2.5 py-0.5 text-xs font-medium text-white">
              {t('event.voided')}
            </span>
          ) : null}
        </div>

        {!isVoided ? (
          <button
            type="button"
            onClick={() => onVoid(event)}
            className="inline-flex h-9 items-center justify-center rounded-control bg-red-50 px-4 text-sm font-medium text-danger hover:bg-red-100"
          >
            {t('event.void')}
          </button>
        ) : null}
      </footer>

      {isVoided ? (
        <div className="mt-3 rounded-control bg-slate-100 p-3 text-xs leading-5 text-slate-600">
          <p>{t('event.voidReason')} {textOfValue(event.void_reason, locale) || t('common.notFilled')}</p>
          <p>
            {t('event.voidBy')} {event.voided_by ? getPersonLabel(event.voided_by, locale) : t('common.notRecorded')}
          </p>
          <p>{t('event.voidAt')} {event.voided_at ? formatToLocal(event.voided_at) : t('common.notRecorded')}</p>
        </div>
      ) : null}
    </article>
  );
}
