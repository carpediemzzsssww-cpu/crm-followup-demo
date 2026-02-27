import { useMemo } from 'react';
import { textOf, useI18n } from '../../i18n';
import { FOLLOW_UP_FILTER_OPTIONS } from '../../constants/followupMeta';
import { getPersonLabel } from '../../mock/personnel';
import type { FollowUpEvent } from '../../types';

export interface FilterValue {
  type: FollowUpEvent['follow_up_type'] | 'all';
  person: string | 'all';
}

interface FilterBarProps {
  events: FollowUpEvent[];
  value: FilterValue;
  onFilterChange: (value: FilterValue) => void;
  onNewClick: () => void;
}

export default function FilterBar({ events, value, onFilterChange, onNewClick }: FilterBarProps) {
  const { locale, t } = useI18n();

  const persons = useMemo(() => {
    const ids = new Set<string>();
    events.forEach((event) => {
      ids.add(event.created_by);
    });

    const collator = new Intl.Collator(locale === 'zh' ? 'zh-CN' : 'en-US');
    return Array.from(ids).sort((left, right) =>
      collator.compare(getPersonLabel(left, locale), getPersonLabel(right, locale))
    );
  }, [events, locale]);

  return (
    <section className="card-enterprise flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{t('filter.type')}</span>
          <select
            className="input-enterprise min-w-[140px]"
            value={value.type}
            onChange={(event) => {
              const nextType = event.target.value as FilterValue['type'];
              onFilterChange({ ...value, type: nextType });
            }}
          >
            {FOLLOW_UP_FILTER_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {textOf(item.label, locale)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <span>{t('filter.person')}</span>
          <select
            className="input-enterprise min-w-[140px]"
            value={value.person}
            onChange={(event) => {
              const nextPerson = event.target.value as FilterValue['person'];
              onFilterChange({ ...value, person: nextPerson });
            }}
          >
            <option value="all">{t('filter.allPersons')}</option>
            {persons.map((personId) => (
              <option key={personId} value={personId}>
                {getPersonLabel(personId, locale)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" onClick={onNewClick} className="btn-primary">
        {t('filter.addFollowup')}
      </button>
    </section>
  );
}
