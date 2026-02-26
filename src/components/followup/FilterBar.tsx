import { useMemo } from 'react';
import { FOLLOW_UP_FILTER_OPTIONS } from '../../constants/followupMeta';
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
  const persons = useMemo(() => {
    const names = new Set<string>();
    events.forEach((event) => {
      names.add(event.created_by);
    });
    return Array.from(names).sort((left, right) => left.localeCompare(right, 'zh-CN'));
  }, [events]);

  return (
    <section className="card-enterprise flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <span>类型</span>
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
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <span>人员</span>
          <select
            className="input-enterprise min-w-[140px]"
            value={value.person}
            onChange={(event) => {
              const nextPerson = event.target.value as FilterValue['person'];
              onFilterChange({ ...value, person: nextPerson });
            }}
          >
            <option value="all">全部人员</option>
            {persons.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" onClick={onNewClick} className="btn-primary">
        + 新增跟进
      </button>
    </section>
  );
}
