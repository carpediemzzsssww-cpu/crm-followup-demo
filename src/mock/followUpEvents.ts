import type { LocalizedText } from '../i18n';
import type { FollowUpEvent } from '../types';

const DAY_MS = 24 * 60 * 60 * 1000;

const followUpTypes: FollowUpEvent['follow_up_type'][] = [
  'call',
  'meeting',
  'visit',
  'email',
  'other'
];

const intentionLevels: NonNullable<FollowUpEvent['intention_level']>[] = [
  'high',
  'medium',
  'low',
  'none'
];

const summaryTemplates: LocalizedText[] = [
  {
    zh: '确认Q2出运计划与舱位需求',
    en: 'Confirm Q2 shipment plan and slot requirements'
  },
  {
    zh: '沟通当前运价波动及报价有效期',
    en: 'Discuss current freight rate fluctuations and quote validity'
  },
  {
    zh: '核对清关资料与发票信息完整性',
    en: 'Verify customs documents and invoice completeness'
  },
  {
    zh: '回访时效异常订单并制定补救方案',
    en: 'Follow up delayed orders and define a remediation plan'
  },
  {
    zh: '讨论新增航线与多式联运可行性',
    en: 'Assess feasibility of new routes and multimodal options'
  },
  {
    zh: '同步跨境小包旺季仓位保障方案',
    en: 'Align peak-season capacity plan for cross-border parcels'
  },
  {
    zh: '确认季度KPI与服务质量改进项',
    en: 'Confirm quarterly KPIs and service quality improvements'
  },
  {
    zh: '推进框架协议条款与结算周期',
    en: 'Advance framework agreement terms and settlement cycle'
  }
];

const actionTemplates: LocalizedText[] = [
  {
    zh: '本周内更新报价单并回传客户确认',
    en: 'Update quotation this week and send it for customer confirmation'
  },
  {
    zh: '安排操作同事复核提单与箱单信息',
    en: 'Arrange operations review of B/L and packing list details'
  },
  {
    zh: '收集下月预测货量并锁定舱位',
    en: 'Collect next-month forecast volume and secure capacity'
  },
  {
    zh: '整理异常订单清单并提交复盘报告',
    en: 'Compile exception order list and submit a review report'
  },
  {
    zh: '补充铁路段时效测算与成本对比',
    en: 'Add rail transit-time estimates and cost comparison'
  },
  {
    zh: '推进合同审批并跟进法务反馈',
    en: 'Push contract approval and follow up legal feedback'
  }
];

const voidReasons: LocalizedText[] = [
  {
    zh: '重复录入，保留后续修正记录',
    en: 'Duplicate entry; retained the corrected record'
  },
  {
    zh: '客户临时取消会议，改期后重建记录',
    en: 'Customer canceled the meeting; recreated after rescheduling'
  },
  {
    zh: '跟进对象填写错误，已迁移到正确客户',
    en: 'Incorrect customer selected; record moved to the correct account'
  },
  {
    zh: '内容与实际沟通不一致，按规范作废',
    en: 'Content mismatched actual communication; voided per policy'
  }
];

type CustomerEventConfig = {
  customer_id: string;
  created_by: string;
  base_time: string;
  voided_indices: number[];
};

const customerEventConfigs: CustomerEventConfig[] = [
  {
    customer_id: 'CUST001',
    created_by: 'wang_li',
    base_time: '2025-09-03T02:30:00Z',
    voided_indices: [3]
  },
  {
    customer_id: 'CUST002',
    created_by: 'chen_tao',
    base_time: '2025-09-06T01:00:00Z',
    voided_indices: [1, 4]
  },
  {
    customer_id: 'CUST003',
    created_by: 'zhao_qian',
    base_time: '2025-09-10T03:30:00Z',
    voided_indices: [2]
  },
  {
    customer_id: 'CUST004',
    created_by: 'liu_yang',
    base_time: '2025-09-12T05:00:00Z',
    voided_indices: [0]
  },
  {
    customer_id: 'CUST005',
    created_by: 'sun_min',
    base_time: '2025-09-15T02:00:00Z',
    voided_indices: [4]
  },
  {
    customer_id: 'CUST006',
    created_by: 'zhou_kai',
    base_time: '2025-09-18T04:30:00Z',
    voided_indices: [1]
  },
  {
    customer_id: 'CUST007',
    created_by: 'li_na',
    base_time: '2025-09-22T00:30:00Z',
    voided_indices: [2, 4]
  },
  {
    customer_id: 'CUST008',
    created_by: 'zhang_fan',
    base_time: '2025-09-25T03:00:00Z',
    voided_indices: [3]
  }
];

function buildSummary(template: LocalizedText, followUpIndex: number): LocalizedText {
  return {
    zh: `${template.zh}（第${followUpIndex}次跟进）`,
    en: `${template.en} (Follow-up ${followUpIndex})`
  };
}

function buildCustomerEvents(
  config: CustomerEventConfig,
  customerIndex: number
): FollowUpEvent[] {
  const baseTimeMs = Date.parse(config.base_time);

  return Array.from({ length: 5 }, (_, index) => {
    const followUpIndex = index + 1;
    const eventTimeMs = baseTimeMs + index * 9 * DAY_MS + customerIndex * DAY_MS;
    const followUpTime = new Date(eventTimeMs).toISOString();
    const createdAt = new Date(eventTimeMs - 6 * 60 * 60 * 1000).toISOString();
    const isVoided = config.voided_indices.includes(index);

    const baseEvent: FollowUpEvent = {
      event_id: `${config.customer_id}-EVT-${String(followUpIndex).padStart(2, '0')}`,
      customer_id: config.customer_id,
      created_by: config.created_by,
      follow_up_type: followUpTypes[(customerIndex + index) % followUpTypes.length],
      follow_up_time: followUpTime,
      summary: buildSummary(summaryTemplates[(customerIndex + index) % summaryTemplates.length], followUpIndex),
      intention_level:
        intentionLevels[(customerIndex + index) % intentionLevels.length],
      next_follow_up_time:
        index < 4 ? new Date(eventTimeMs + 7 * DAY_MS).toISOString() : undefined,
      action_items: actionTemplates[(customerIndex + index) % actionTemplates.length],
      status: 'normal',
      created_at: createdAt
    };

    if (!isVoided) {
      return baseEvent;
    }

    return {
      ...baseEvent,
      status: 'voided',
      next_follow_up_time: undefined,
      void_reason: voidReasons[(customerIndex + index) % voidReasons.length],
      voided_by: 'system_admin',
      voided_at: new Date(eventTimeMs + 2 * 60 * 60 * 1000).toISOString()
    };
  });
}

export const followUpEvents: FollowUpEvent[] = customerEventConfigs.flatMap(
  (config, customerIndex) => buildCustomerEvents(config, customerIndex)
);
