import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from 'react';

export type Locale = 'zh' | 'en';
export type LocalizedText = Record<Locale, string>;

const LOCALE_STORAGE_KEY = 'crm-followup-locale';

const messages = {
  zh: {
    'common.close': '关闭',
    'common.cancel': '取消',
    'common.confirm': '确认',
    'common.required': '此项为必填',
    'common.noRecords': '暂无记录',
    'common.notFilled': '未填写',
    'common.notRecorded': '未记录',
    'common.comingSoon': '功能开发中',
    'common.expand': '展开',
    'common.collapse': '收起',
    'time.daysAgo': '{days}天前',

    'topbar.notify': '通知',
    'topbar.user': '张销售',
    'topbar.company': '上海远洋',
    'topbar.langSwitch': '切换到英文',

    'sidebar.home': '首页',
    'sidebar.crmCustomers': 'CRM客户',
    'sidebar.orderManagement': '订单管理',
    'sidebar.finance': '财务',
    'sidebar.reports': '报表',
    'sidebar.userShortName': '张',
    'sidebar.userName': '张销售',

    'customerList.title': 'CRM 客户列表',
    'customerList.name': '客户名称',
    'customerList.serviceLine': '业务线标签',
    'customerList.segment': '客户分层',
    'customerList.owner': '负责销售',
    'customerList.totalFollowups': '累计跟进',
    'customerList.latestFollowup': '最近跟进',

    'customerDetail.tab.basic': '基本信息',
    'customerDetail.tab.followup': '跟进记录',
    'customerDetail.tab.opportunity': '商机',
    'customerDetail.tab.documents': '文档',
    'customerDetail.notFound': '客户不存在或已被删除。',
    'customerDetail.backToList': '返回客户列表',
    'customerDetail.listCrumb': 'CRM客户列表',
    'customerDetail.currentUser': '当前用户',

    'overview.totalFollowups': '累计跟进次数',
    'overview.latestFollowup': '最近跟进',
    'overview.monthlyFollowups': '本月跟进',
    'overview.typeDistribution': '类型分布',

    'filter.type': '类型',
    'filter.person': '人员',
    'filter.allPersons': '全部人员',
    'filter.addFollowup': '+ 新增跟进',

    'event.nextFollowup': '下次跟进：',
    'event.voided': '已作废',
    'event.void': '作废',
    'event.voidReason': '作废原因：',
    'event.voidBy': '作废人：',
    'event.voidAt': '作废时间：',

    'eventList.emptyTitle': '暂无跟进记录',
    'eventList.emptyDescription': '点击「新增跟进」开始记录第一条',

    'voidModal.title': '确认作废',
    'voidModal.description': '请填写作废原因，提交后该记录将标记为已作废。',
    'voidModal.reason': '作废原因',
    'voidModal.placeholder': '请输入作废原因',
    'voidModal.confirm': '确认作废',
    'voidModal.closeAria': '关闭作废弹窗',
    'voidModal.notFoundEvent': '未找到可作废的记录',
    'voidModal.noHandler': '未配置作废处理方法',

    'newEvent.closeDrawerAria': '关闭新增跟进抽屉',
    'newEvent.title': '新增跟进记录',
    'newEvent.closeAria': '关闭',
    'newEvent.method': '跟进方式',
    'newEvent.time': '跟进时间',
    'newEvent.summary': '沟通摘要',
    'newEvent.summaryPlaceholder': '请输入本次沟通摘要',
    'newEvent.intention': '客户意向',
    'newEvent.nextFollowupDate': '下次跟进时间',
    'newEvent.actionItems': '后续行动项',
    'newEvent.actionItemsPlaceholder': '请输入后续行动项',
    'newEvent.submitting': '提交中...',
    'newEvent.save': '保存记录',
    'newEvent.currentSales': '当前销售',
    'newEvent.saveFailedNoHandler': '保存失败：未配置提交方法',
    'newEvent.saveSuccess': '新增跟进记录成功',
    'newEvent.submitFailed': '提交失败，请稍后重试',
    'newEvent.closeConfirmTitle': '内容未保存，确认关闭？',
    'newEvent.closeConfirmMessage': '当前填写内容将不会保留。',
    'newEvent.closeConfirmCancel': '继续编辑',
    'newEvent.closeConfirmConfirm': '确认关闭',

    'confirmDialog.closeAria': '关闭弹窗'
  },
  en: {
    'common.close': 'Close',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.required': 'This field is required',
    'common.noRecords': 'No records',
    'common.notFilled': 'Not provided',
    'common.notRecorded': 'Not recorded',
    'common.comingSoon': 'Feature in development',
    'common.expand': 'Expand',
    'common.collapse': 'Collapse',
    'time.daysAgo': '{days} days ago',

    'topbar.notify': 'Notifications',
    'topbar.user': 'Sales Rep',
    'topbar.company': 'Shanghai OceanLink',
    'topbar.langSwitch': 'Switch to Chinese',

    'sidebar.home': 'Home',
    'sidebar.crmCustomers': 'CRM Customers',
    'sidebar.orderManagement': 'Order Management',
    'sidebar.finance': 'Finance',
    'sidebar.reports': 'Reports',
    'sidebar.userShortName': 'SR',
    'sidebar.userName': 'Sales Rep',

    'customerList.title': 'CRM Customer List',
    'customerList.name': 'Customer Name',
    'customerList.serviceLine': 'Service Lines',
    'customerList.segment': 'Customer Segment',
    'customerList.owner': 'Account Owner',
    'customerList.totalFollowups': 'Total Follow-ups',
    'customerList.latestFollowup': 'Latest Follow-up',

    'customerDetail.tab.basic': 'Basic Info',
    'customerDetail.tab.followup': 'Follow-up Records',
    'customerDetail.tab.opportunity': 'Opportunities',
    'customerDetail.tab.documents': 'Documents',
    'customerDetail.notFound': 'Customer not found or has been removed.',
    'customerDetail.backToList': 'Back to Customer List',
    'customerDetail.listCrumb': 'CRM Customer List',
    'customerDetail.currentUser': 'Current User',

    'overview.totalFollowups': 'Total Follow-ups',
    'overview.latestFollowup': 'Latest Follow-up',
    'overview.monthlyFollowups': 'Follow-ups This Month',
    'overview.typeDistribution': 'Type Distribution',

    'filter.type': 'Type',
    'filter.person': 'Owner',
    'filter.allPersons': 'All Owners',
    'filter.addFollowup': '+ New Follow-up',

    'event.nextFollowup': 'Next follow-up:',
    'event.voided': 'Voided',
    'event.void': 'Void',
    'event.voidReason': 'Void reason:',
    'event.voidBy': 'Voided by:',
    'event.voidAt': 'Voided at:',

    'eventList.emptyTitle': 'No follow-up records',
    'eventList.emptyDescription': 'Click "New Follow-up" to create the first one.',

    'voidModal.title': 'Confirm Void',
    'voidModal.description': 'Please provide a reason. After submission, this record will be marked as voided.',
    'voidModal.reason': 'Void reason',
    'voidModal.placeholder': 'Enter the void reason',
    'voidModal.confirm': 'Confirm Void',
    'voidModal.closeAria': 'Close void dialog',
    'voidModal.notFoundEvent': 'No record found to void',
    'voidModal.noHandler': 'No void handler is configured',

    'newEvent.closeDrawerAria': 'Close new follow-up drawer',
    'newEvent.title': 'New Follow-up Record',
    'newEvent.closeAria': 'Close',
    'newEvent.method': 'Follow-up Method',
    'newEvent.time': 'Follow-up Time',
    'newEvent.summary': 'Summary',
    'newEvent.summaryPlaceholder': 'Enter the summary of this communication',
    'newEvent.intention': 'Customer Intent',
    'newEvent.nextFollowupDate': 'Next Follow-up Date',
    'newEvent.actionItems': 'Action Items',
    'newEvent.actionItemsPlaceholder': 'Enter action items',
    'newEvent.submitting': 'Submitting...',
    'newEvent.save': 'Save Record',
    'newEvent.currentSales': 'Current Sales Rep',
    'newEvent.saveFailedNoHandler': 'Save failed: no submit handler configured',
    'newEvent.saveSuccess': 'Follow-up record saved successfully',
    'newEvent.submitFailed': 'Submit failed, please try again later',
    'newEvent.closeConfirmTitle': 'Unsaved changes, close anyway?',
    'newEvent.closeConfirmMessage': 'Your current input will be discarded.',
    'newEvent.closeConfirmCancel': 'Continue Editing',
    'newEvent.closeConfirmConfirm': 'Close Anyway',

    'confirmDialog.closeAria': 'Close dialog'
  }
} as const;

type MessageKey = keyof (typeof messages)['zh'];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'zh';
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored === 'zh' || stored === 'en') {
    return stored;
  }

  return window.navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en';
}

function formatMessage(template: string, vars?: Record<string, string | number>): string {
  if (!vars) {
    return template;
  }

  return template.replace(/\{(\w+)\}/g, (_, name: string) => {
    const value = vars[name];
    return value === undefined ? '' : String(value);
  });
}

export function textOf(text: LocalizedText, locale: Locale): string {
  return text[locale] ?? text.zh;
}

export function textOfValue(text: string | LocalizedText | undefined, locale: Locale): string {
  if (!text) {
    return '';
  }
  return typeof text === 'string' ? text : textOf(text, locale);
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale,
      toggleLocale: () => setLocale((previous) => (previous === 'zh' ? 'en' : 'zh')),
      t: (key, vars) => formatMessage(messages[locale][key] ?? messages.zh[key], vars)
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
