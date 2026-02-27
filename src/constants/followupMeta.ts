import type { Locale, LocalizedText } from '../i18n';
import type { Customer, FollowUpEvent } from '../types';

export type FollowUpType = FollowUpEvent['follow_up_type'];
export type IntentionLevel = NonNullable<FollowUpEvent['intention_level']>;
export type CustomerSegment = Customer['customer_segment'];

export const FOLLOW_UP_TYPE_META: Record<
  FollowUpType,
  { label: LocalizedText; shortLabel: LocalizedText; dotClassName: string }
> = {
  call: {
    label: { zh: '电话', en: 'Call' },
    shortLabel: { zh: '电话', en: 'Call' },
    dotClassName: 'bg-primary'
  },
  meeting: {
    label: { zh: '会议', en: 'Meeting' },
    shortLabel: { zh: '会议', en: 'Meeting' },
    dotClassName: 'bg-violet-500'
  },
  visit: {
    label: { zh: '拜访', en: 'Visit' },
    shortLabel: { zh: '拜访', en: 'Visit' },
    dotClassName: 'bg-success'
  },
  email: {
    label: { zh: '邮件', en: 'Email' },
    shortLabel: { zh: '邮件', en: 'Email' },
    dotClassName: 'bg-warning'
  },
  other: {
    label: { zh: '其他', en: 'Other' },
    shortLabel: { zh: '其他', en: 'Other' },
    dotClassName: 'bg-slate-400'
  }
};

export const FOLLOW_UP_FILTER_OPTIONS: Array<{
  value: FollowUpType | 'all';
  label: LocalizedText;
}> = [
  { value: 'all', label: { zh: '全部类型', en: 'All Types' } },
  { value: 'call', label: { zh: '电话沟通', en: 'Call' } },
  { value: 'meeting', label: { zh: '会议', en: 'Meeting' } },
  { value: 'visit', label: { zh: '拜访', en: 'Visit' } },
  { value: 'email', label: { zh: '邮件', en: 'Email' } },
  { value: 'other', label: { zh: '其他', en: 'Other' } }
];

export const FOLLOW_UP_METHOD_OPTIONS: Array<{
  value: FollowUpType;
  label: LocalizedText;
}> = [
  { value: 'call', label: { zh: '电话', en: 'Call' } },
  { value: 'meeting', label: { zh: '会议', en: 'Meeting' } },
  { value: 'visit', label: { zh: '拜访', en: 'Visit' } },
  { value: 'email', label: { zh: '邮件', en: 'Email' } },
  { value: 'other', label: { zh: '其他', en: 'Other' } }
];

export const INTENTION_OPTIONS: Array<{
  value: IntentionLevel;
  label: LocalizedText;
}> = [
  { value: 'high', label: { zh: '高意向', en: 'High Intent' } },
  { value: 'medium', label: { zh: '中意向', en: 'Medium Intent' } },
  { value: 'low', label: { zh: '低意向', en: 'Low Intent' } },
  { value: 'none', label: { zh: '暂无', en: 'None' } }
];

export const INTENTION_META: Record<IntentionLevel, { label: LocalizedText; className: string }> = {
  high: {
    label: { zh: '高意向', en: 'High Intent' },
    className: 'border border-green-200 bg-green-100 text-success'
  },
  medium: {
    label: { zh: '中意向', en: 'Medium Intent' },
    className: 'border border-amber-200 bg-amber-100 text-warning'
  },
  low: {
    label: { zh: '低意向', en: 'Low Intent' },
    className: 'border border-red-200 bg-red-100 text-danger'
  },
  none: {
    label: { zh: '暂无', en: 'None' },
    className: 'border border-slate-300 bg-white text-text-secondary'
  }
};

export const SEGMENT_META: Record<CustomerSegment, { label: LocalizedText; className: string }> = {
  strategic: {
    label: { zh: '战略客户', en: 'Strategic' },
    className: 'border border-indigo-200 bg-indigo-100 text-indigo-700'
  },
  key: {
    label: { zh: '重点客户', en: 'Key' },
    className: 'border border-blue-200 bg-blue-100 text-blue-700'
  },
  normal: {
    label: { zh: '普通客户', en: 'Standard' },
    className: 'border border-slate-200 bg-slate-100 text-slate-700'
  },
  potential: {
    label: { zh: '潜力客户', en: 'Potential' },
    className: 'border border-teal-200 bg-teal-100 text-teal-700'
  }
};

const SERVICE_LINE_LABELS: Record<string, LocalizedText> = {
  海运整箱: { zh: '海运整箱', en: 'Ocean FCL' },
  海运拼箱: { zh: '海运拼箱', en: 'Ocean LCL' },
  空运: { zh: '空运', en: 'Air Freight' },
  铁路: { zh: '铁路', en: 'Rail Freight' },
  跨境小包: { zh: '跨境小包', en: 'Cross-border Parcel' }
};

export function getServiceLineLabel(tag: string, locale: Locale): string {
  const text = SERVICE_LINE_LABELS[tag];
  return text ? text[locale] : tag;
}
