import type { FollowUpEvent } from "../types";

const DAY_MS = 24 * 60 * 60 * 1000;

const followUpTypes: FollowUpEvent["follow_up_type"][] = [
  "call",
  "meeting",
  "visit",
  "email",
  "other",
];

const intentionLevels: NonNullable<FollowUpEvent["intention_level"]>[] = [
  "high",
  "medium",
  "low",
  "none",
];

const summaryTemplates = [
  "确认Q2出运计划与舱位需求",
  "沟通当前运价波动及报价有效期",
  "核对清关资料与发票信息完整性",
  "回访时效异常订单并制定补救方案",
  "讨论新增航线与多式联运可行性",
  "同步跨境小包旺季仓位保障方案",
  "确认季度KPI与服务质量改进项",
  "推进框架协议条款与结算周期",
];

const actionTemplates = [
  "本周内更新报价单并回传客户确认",
  "安排操作同事复核提单与箱单信息",
  "收集下月预测货量并锁定舱位",
  "整理异常订单清单并提交复盘报告",
  "补充铁路段时效测算与成本对比",
  "推进合同审批并跟进法务反馈",
];

const voidReasons = [
  "重复录入，保留后续修正记录",
  "客户临时取消会议，改期后重建记录",
  "跟进对象填写错误，已迁移到正确客户",
  "内容与实际沟通不一致，按规范作废",
];

type CustomerEventConfig = {
  customer_id: string;
  created_by: string;
  base_time: string;
  voided_indices: number[];
};

const customerEventConfigs: CustomerEventConfig[] = [
  {
    customer_id: "CUST001",
    created_by: "王丽",
    base_time: "2025-09-03T02:30:00Z",
    voided_indices: [3],
  },
  {
    customer_id: "CUST002",
    created_by: "陈涛",
    base_time: "2025-09-06T01:00:00Z",
    voided_indices: [1, 4],
  },
  {
    customer_id: "CUST003",
    created_by: "赵倩",
    base_time: "2025-09-10T03:30:00Z",
    voided_indices: [2],
  },
  {
    customer_id: "CUST004",
    created_by: "刘洋",
    base_time: "2025-09-12T05:00:00Z",
    voided_indices: [0],
  },
  {
    customer_id: "CUST005",
    created_by: "孙敏",
    base_time: "2025-09-15T02:00:00Z",
    voided_indices: [4],
  },
  {
    customer_id: "CUST006",
    created_by: "周凯",
    base_time: "2025-09-18T04:30:00Z",
    voided_indices: [1],
  },
  {
    customer_id: "CUST007",
    created_by: "李娜",
    base_time: "2025-09-22T00:30:00Z",
    voided_indices: [2, 4],
  },
  {
    customer_id: "CUST008",
    created_by: "张帆",
    base_time: "2025-09-25T03:00:00Z",
    voided_indices: [3],
  },
];

function buildCustomerEvents(
  config: CustomerEventConfig,
  customerIndex: number
): FollowUpEvent[] {
  const baseTimeMs = Date.parse(config.base_time);

  return Array.from({ length: 5 }, (_, index) => {
    const eventTimeMs = baseTimeMs + index * 9 * DAY_MS + customerIndex * DAY_MS;
    const followUpTime = new Date(eventTimeMs).toISOString();
    const createdAt = new Date(eventTimeMs - 6 * 60 * 60 * 1000).toISOString();
    const isVoided = config.voided_indices.includes(index);

    const baseEvent: FollowUpEvent = {
      event_id: `${config.customer_id}-EVT-${String(index + 1).padStart(2, "0")}`,
      customer_id: config.customer_id,
      created_by: config.created_by,
      follow_up_type: followUpTypes[(customerIndex + index) % followUpTypes.length],
      follow_up_time: followUpTime,
      summary: `${summaryTemplates[(customerIndex + index) % summaryTemplates.length]}（第${
        index + 1
      }次跟进）`,
      intention_level:
        intentionLevels[(customerIndex + index) % intentionLevels.length],
      next_follow_up_time:
        index < 4 ? new Date(eventTimeMs + 7 * DAY_MS).toISOString() : undefined,
      action_items: actionTemplates[(customerIndex + index) % actionTemplates.length],
      status: "normal",
      created_at: createdAt,
    };

    if (!isVoided) {
      return baseEvent;
    }

    return {
      ...baseEvent,
      status: "voided",
      next_follow_up_time: undefined,
      void_reason: voidReasons[(customerIndex + index) % voidReasons.length],
      voided_by: "系统管理员",
      voided_at: new Date(eventTimeMs + 2 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export const followUpEvents: FollowUpEvent[] = customerEventConfigs.flatMap(
  (config, customerIndex) => buildCustomerEvents(config, customerIndex)
);
