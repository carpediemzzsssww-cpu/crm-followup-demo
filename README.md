# CRM 跟进事件管理（结构说明）

本目录包含两部分内容：

- `crm-followup-demo/`：可运行的前端 Demo（React + Vite + Tailwind），所有 UI 与交互修改都在这里。
- `src/`：PRD 对应的领域模型与样例数据快照（非运行入口），用于文档和数据结构参考。

## 运行前端

```bash
cd crm-followup-demo
npm install
npm run dev
```

## 前端目录（`crm-followup-demo/src`）

- `components/layout`：布局层（侧栏、移动端顶栏）
- `components/followup`：跟进业务组件（概览、筛选、列表、卡片、抽屉、作废弹窗）
- `components/ui`：通用 UI 组件（Badge、Toast、ConfirmDialog）
- `constants`：业务展示元数据（跟进类型、意向、分层、筛选选项）
- `pages`：页面级路由（客户列表、客户详情）
- `store`：状态管理与筛选逻辑
- `mock`：模拟数据
- `utils`：时间与 ID 工具函数
