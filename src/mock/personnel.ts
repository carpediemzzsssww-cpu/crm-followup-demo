import { textOf, type Locale, type LocalizedText } from '../i18n';

export const PERSON_LABELS: Record<string, LocalizedText> = {
  wang_li: { zh: '王丽', en: 'Wang Li' },
  chen_tao: { zh: '陈涛', en: 'Chen Tao' },
  zhao_qian: { zh: '赵倩', en: 'Zhao Qian' },
  liu_yang: { zh: '刘洋', en: 'Liu Yang' },
  sun_min: { zh: '孙敏', en: 'Sun Min' },
  zhou_kai: { zh: '周凯', en: 'Zhou Kai' },
  li_na: { zh: '李娜', en: 'Li Na' },
  zhang_fan: { zh: '张帆', en: 'Zhang Fan' },
  current_sales: { zh: '当前销售', en: 'Current Sales Rep' },
  current_user: { zh: '当前用户', en: 'Current User' },
  system_admin: { zh: '系统管理员', en: 'System Admin' }
};

export function getPersonLabel(personId: string, locale: Locale): string {
  const label = PERSON_LABELS[personId];
  if (!label) {
    return personId;
  }
  return textOf(label, locale);
}
