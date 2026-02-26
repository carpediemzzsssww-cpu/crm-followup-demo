export interface Customer {
  customer_id: string;
  name: string;
  service_line_tags: string[]; // 海运整箱/海运拼箱/空运/铁路/跨境小包
  customer_segment: "strategic" | "key" | "normal" | "potential";
  assigned_to: string;
}

export interface FollowUpEvent {
  event_id: string;
  customer_id: string;
  created_by: string;
  follow_up_type: "call" | "meeting" | "visit" | "email" | "other";
  follow_up_time: string; // ISO UTC string
  summary: string;
  intention_level?: "high" | "medium" | "low" | "none";
  next_follow_up_time?: string;
  action_items?: string;
  status: "normal" | "voided";
  void_reason?: string;
  voided_by?: string;
  voided_at?: string;
  created_at: string;
}
