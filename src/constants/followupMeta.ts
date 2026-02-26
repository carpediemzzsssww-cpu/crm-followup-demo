import type { Customer, FollowUpEvent } from '../types';

export type FollowUpType = FollowUpEvent['follow_up_type'];
export type IntentionLevel = NonNullable<FollowUpEvent['intention_level']>;
export type CustomerSegment = Customer['customer_segment'];

export const FOLLOW_UP_TYPE_META: Record<
  FollowUpType,
  { label: string; shortLabel: string; dotClassName: string }
> = {
  call: {
    label: '电话',
    shortLabel: '电话',
    dotClassName: 'bg-primary'
  },
  meeting: {
    label: '会议',
    shortLabel: '会议',
    dotClassName: 'bg-violet-500'
  },
  visit: {
    label: '拜访',
    shortLabel: '拜访',
    dotClassName: 'bg-success'
  },
  email: {
    label: '邮件',
    shortLabel: '邮件',
    dotClassName: 'bg-warning'
  },
  other: {
    label: '其他',
    shortLabel: '其他',
    dotClassName: 'bg-slate-400'
  }
};

export const FOLLOW_UP_FILTER_OPTIONS: Array<{
  value: FollowUpType | 'all';
  label: string;
}> = [
  { value: 'all', label: '全部类型' },
  { value: 'call', label: '电话沟通' },
  { value: 'meeting', label: '会议' },
  { value: 'visit', label: '拜访' },
  { value: 'email', label: '邮件' },
  { value: 'other', label: '其他' }
];

export const FOLLOW_UP_METHOD_OPTIONS: Array<{
  value: FollowUpType;
  label: string;
}> = [
  { value: 'call', label: '电话' },
  { value: 'meeting', label: '会议' },
  { value: 'visit', label: '拜访' },
  { value: 'email', label: '邮件' },
  { value: 'other', label: '其他' }
];

export const INTENTION_OPTIONS: Array<{
  value: IntentionLevel;
  label: string;
}> = [
  { value: 'high', label: '高意向' },
  { value: 'medium', label: '中意向' },
  { value: 'low', label: '低意向' },
  { value: 'none', label: '暂无' }
];

export const INTENTION_META: Record<IntentionLevel, { label: string; className: string }> = {
  high: { label: '高意向', className: 'border border-green-200 bg-green-100 text-success' },
  medium: { label: '中意向', className: 'border border-amber-200 bg-amber-100 text-warning' },
  low: { label: '低意向', className: 'border border-red-200 bg-red-100 text-danger' },
  none: { label: '暂无', className: 'border border-slate-300 bg-white text-text-secondary' }
};

export const SEGMENT_META: Record<CustomerSegment, { label: string; className: string }> = {
  strategic: { label: '战略客户', className: 'border border-indigo-200 bg-indigo-100 text-indigo-700' },
  key: { label: '重点客户', className: 'border border-blue-200 bg-blue-100 text-blue-700' },
  normal: { label: '普通客户', className: 'border border-slate-200 bg-slate-100 text-slate-700' },
  potential: { label: '潜力客户', className: 'border border-teal-200 bg-teal-100 text-teal-700' }
};
