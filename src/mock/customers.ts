import type { Customer } from "../types";

export const customers: Customer[] = [
  {
    customer_id: "CUST001",
    name: "上海远洋智联国际物流有限公司",
    service_line_tags: ["海运整箱", "空运"],
    customer_segment: "strategic",
    assigned_to: "王丽",
  },
  {
    customer_id: "CUST002",
    name: "深圳链海供应链管理有限公司",
    service_line_tags: ["海运拼箱", "跨境小包"],
    customer_segment: "key",
    assigned_to: "陈涛",
  },
  {
    customer_id: "CUST003",
    name: "宁波港航通达货运代理有限公司",
    service_line_tags: ["海运整箱", "铁路"],
    customer_segment: "key",
    assigned_to: "赵倩",
  },
  {
    customer_id: "CUST004",
    name: "青岛海际通国际货运有限公司",
    service_line_tags: ["海运拼箱", "空运"],
    customer_segment: "normal",
    assigned_to: "刘洋",
  },
  {
    customer_id: "CUST005",
    name: "厦门新航道跨境物流有限公司",
    service_line_tags: ["跨境小包", "空运"],
    customer_segment: "potential",
    assigned_to: "孙敏",
  },
  {
    customer_id: "CUST006",
    name: "广州华信联运国际物流有限公司",
    service_line_tags: ["铁路", "海运整箱"],
    customer_segment: "normal",
    assigned_to: "周凯",
  },
  {
    customer_id: "CUST007",
    name: "天津北辰环球货运代理有限公司",
    service_line_tags: ["铁路", "海运拼箱"],
    customer_segment: "potential",
    assigned_to: "李娜",
  },
  {
    customer_id: "CUST008",
    name: "成都陆空通供应链有限公司",
    service_line_tags: ["空运", "铁路", "跨境小包"],
    customer_segment: "strategic",
    assigned_to: "张帆",
  },
];
