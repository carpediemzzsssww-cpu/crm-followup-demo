import { NavLink } from 'react-router-dom';

interface IconProps {
  className?: string;
}

function HomeIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 11.5L12 4L21 11.5V20H3V11.5Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function UsersIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M16 7C16 9.21 14.21 11 12 11C9.79 11 8 9.21 8 7C8 4.79 9.79 3 12 3C14.21 3 16 4.79 16 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function BoxIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 7L12 3L21 7L12 11L3 7Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 7V17L12 21L21 17V7" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function WalletIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M3 8C3 6.34 4.34 5 6 5H19V19H6C4.34 19 3 17.66 3 16V8Z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M19 10H21V14H19V10Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ChartIcon({ className = 'h-4 w-4' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 19H20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 16V11" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 16V8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M17 16V5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[220px] flex-col bg-sidebar-bg px-4 py-5 text-slate-300 lg:flex">
      <div className="px-2 text-xl font-semibold tracking-wide text-white">CargoWare</div>

      <nav className="mt-8 flex-1 space-y-1">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10"
        >
          <HomeIcon />
          首页
        </button>

        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-control px-3 py-2 text-sm font-medium transition ${
              isActive ? 'bg-primary text-white' : 'text-slate-300 hover:bg-white/10'
            }`
          }
        >
          <UsersIcon />
          CRM客户
        </NavLink>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10"
        >
          <BoxIcon />
          订单管理
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10"
        >
          <WalletIcon />
          财务
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-control px-3 py-2 text-left text-sm font-medium text-slate-300 transition hover:bg-white/10"
        >
          <ChartIcon />
          报表
        </button>
      </nav>

      <div className="flex items-center gap-3 rounded-card border border-slate-700/70 bg-slate-800/70 p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-600 text-sm font-semibold text-white">
          张
        </div>
        <p className="text-sm font-medium text-slate-100">张销售</p>
      </div>
    </aside>
  );
}
