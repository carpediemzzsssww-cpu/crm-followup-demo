# CRM 客户跟进事件管理模块
**CRM Follow-up Event Management Module**

🔗 **Live Demo**: [https://crm-followup-demo.vercel.app/customers](https://crm-followup-demo.vercel.app/customers)

---

## 产品说明 / Product Overview

### 背景 Background

本项目是针对 **WallTech CargoWare** 平台 CRM 模块的功能扩展设计与实现。

现有 CargoWare CRM 缺乏结构化的销售跟进记录能力——销售人员依赖微信和个人笔记记录客户沟通，导致跟进历史无法沉淀、管理层无法量化考核销售行为。

This project is a feature extension design and implementation for the **WallTech CargoWare** CRM module.

The existing CargoWare CRM lacks structured sales follow-up tracking. Sales reps rely on WeChat and personal notes, making it impossible to retain follow-up history or objectively evaluate sales performance.

---

### 解决了什么 What This Solves

| 问题 Problem | 解决方案 Solution |
|---|---|
| 跟进记录分散，无法追溯 | 结构化录入，永久保留，只可作废不可删除 |
| 管理层考核缺乏数据 | 跟进次数、覆盖客户数、意向分布可视化 |
| 销售离职导致客户历史断层 | 记录与客户绑定，换人后历史完整保留 |

---

### 功能范围 Feature Scope

**本次 Demo 实现 / Implemented in this demo**

- ✅ 客户列表页（含业务线标签、客户分层）
- ✅ 客户详情页跟进记录 Tab
- ✅ 跟进概览数据（累计次数 / 最近跟进 / 近30天 / 类型分布）
- ✅ 新增跟进记录（含表单校验、重复提交防护）
- ✅ 历史记录列表（时间倒序、类型筛选、人员筛选）
- ✅ 记录作废（含作废原因、操作人、时间审计）
- ✅ 未保存内容关闭确认
- ✅ UTC+8 时区展示

**规划中，超出 Demo 范围 / Planned, out of demo scope**

- ⬜ 团队跟进看板（管理视角 KPI 统计）
- ⬜ 下次跟进时间到期提醒
- ⬜ 附件上传
- ⬜ 权限控制（接入 CargoWare 现有权限体系）
- ⬜ 真实后端 API 与数据持久化

---

### 工具链 Toolchain

本项目采用 AI 辅助的 PM → 工程 完整工作流：

This project demonstrates a full PM-to-engineering workflow with AI assistance:

| 阶段 Stage | 工具 Tool | 用途 Usage |
|---|---|---|
| 需求分析 & PRD 撰写 | **Claude** | 竞品分析、PRD 框架设计、数据模型评审 |
| 代码实现 | **Claude Code / Codex** | 组件开发、状态管理、交互逻辑 |
| 方案探索 & 头脑风暴 | **ChatGPT** | 功能边界讨论、设计方案对比 |
| 审查 & 迭代 | **Claude** | Bug 分析、视觉问题定位、修复指令生成 |

> PRD 文档见仓库根目录：`CRM跟进事件管理_PRD_V1.0.docx`

---

### 技术栈 Tech Stack

- **React 18** + **TypeScript**
- **Vite** — 构建工具
- **Tailwind CSS** — 样式
- **React Router v6** — 路由
- **React Context + useReducer** — 状态管理（无外部库依赖）

---

## 本地运行 / Run Locally
```bash
# 进入前端目录
cd crm-followup-demo

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:5173/customers](http://localhost:5173/customers)

---

## 目录结构 / Project Structure
```
src/
├── components/
│   ├── layout/        # 侧边栏、顶部栏
│   ├── followup/      # 跟进业务组件（概览、列表、抽屉、作废弹窗）
│   └── ui/            # 通用原子组件（Badge、Toast、Dialog）
├── pages/             # 客户列表页、客户详情页
├── store/             # 状态管理（Context + useReducer）
├── mock/              # 模拟数据
├── types/             # TypeScript 类型定义
└── utils/             # 时间格式化、UUID 生成
```

---

*本项目为 WallTech AI产品实习笔试作品，完整 PRD 见附件文档。*

*This project is a take-home assignment demo for a Product Manager position at WallTech.*
