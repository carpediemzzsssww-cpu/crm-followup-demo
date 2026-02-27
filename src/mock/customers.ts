import type { Customer } from '../types';

export const customers: Customer[] = [
  {
    customer_id: 'CUST001',
    name: {
      zh: '上海远洋智联国际物流有限公司',
      en: 'Shanghai OceanLink International Logistics Co., Ltd.'
    },
    service_line_tags: ['海运整箱', '空运'],
    customer_segment: 'strategic',
    assigned_to: 'wang_li'
  },
  {
    customer_id: 'CUST002',
    name: {
      zh: '深圳链海供应链管理有限公司',
      en: 'Shenzhen ChainSea Supply Chain Management Co., Ltd.'
    },
    service_line_tags: ['海运拼箱', '跨境小包'],
    customer_segment: 'key',
    assigned_to: 'chen_tao'
  },
  {
    customer_id: 'CUST003',
    name: {
      zh: '宁波港航通达货运代理有限公司',
      en: 'Ningbo Port & Shipping Tongda Freight Forwarding Co., Ltd.'
    },
    service_line_tags: ['海运整箱', '铁路'],
    customer_segment: 'key',
    assigned_to: 'zhao_qian'
  },
  {
    customer_id: 'CUST004',
    name: {
      zh: '青岛海际通国际货运有限公司',
      en: 'Qingdao Haijitong International Freight Co., Ltd.'
    },
    service_line_tags: ['海运拼箱', '空运'],
    customer_segment: 'normal',
    assigned_to: 'liu_yang'
  },
  {
    customer_id: 'CUST005',
    name: {
      zh: '厦门新航道跨境物流有限公司',
      en: 'Xiamen New Route Cross-border Logistics Co., Ltd.'
    },
    service_line_tags: ['跨境小包', '空运'],
    customer_segment: 'potential',
    assigned_to: 'sun_min'
  },
  {
    customer_id: 'CUST006',
    name: {
      zh: '广州华信联运国际物流有限公司',
      en: 'Guangzhou Huaxin Intermodal International Logistics Co., Ltd.'
    },
    service_line_tags: ['铁路', '海运整箱'],
    customer_segment: 'normal',
    assigned_to: 'zhou_kai'
  },
  {
    customer_id: 'CUST007',
    name: {
      zh: '天津北辰环球货运代理有限公司',
      en: 'Tianjin Beichen Global Freight Forwarding Co., Ltd.'
    },
    service_line_tags: ['铁路', '海运拼箱'],
    customer_segment: 'potential',
    assigned_to: 'li_na'
  },
  {
    customer_id: 'CUST008',
    name: {
      zh: '成都陆空通供应链有限公司',
      en: 'Chengdu LandAirLink Supply Chain Co., Ltd.'
    },
    service_line_tags: ['空运', '铁路', '跨境小包'],
    customer_segment: 'strategic',
    assigned_to: 'zhang_fan'
  }
];
