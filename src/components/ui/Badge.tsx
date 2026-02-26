import type { Customer, FollowUpEvent } from '../../types';
import {
  FOLLOW_UP_TYPE_META,
  INTENTION_META,
  SEGMENT_META
} from '../../constants/followupMeta';

type IntentionLevel = NonNullable<FollowUpEvent['intention_level']>;
type FollowUpType = FollowUpEvent['follow_up_type'];
type Segment = Customer['customer_segment'];

interface IntentionBadgeProps {
  variant: 'intention';
  value: IntentionLevel;
  className?: string;
}

interface FollowUpTypeBadgeProps {
  variant: 'followUpType';
  value: FollowUpType;
  className?: string;
}

interface SegmentBadgeProps {
  variant: 'segment';
  value: Segment;
  className?: string;
}

type BadgeProps = IntentionBadgeProps | FollowUpTypeBadgeProps | SegmentBadgeProps;

function joinClassName(...parts: Array<string | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export default function Badge(props: BadgeProps) {
  if (props.variant === 'intention') {
    const meta = INTENTION_META[props.value];
    return (
      <span
        className={joinClassName(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          meta.className,
          props.className
        )}
      >
        {meta.label}
      </span>
    );
  }

  if (props.variant === 'segment') {
    const meta = SEGMENT_META[props.value];
    return (
      <span
        className={joinClassName(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          meta.className,
          props.className
        )}
      >
        {meta.label}
      </span>
    );
  }

  const meta = FOLLOW_UP_TYPE_META[props.value];
  return (
    <span
      className={joinClassName(
        'inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-xs font-medium text-slate-700',
        props.className
      )}
    >
      <span className={joinClassName('h-1.5 w-1.5 rounded-full', meta.dotClassName)} />
      {meta.label}
    </span>
  );
}
