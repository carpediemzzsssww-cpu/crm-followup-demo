import { NavLink } from 'react-router-dom';

export default function TopBar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border-color bg-white/95 px-4 backdrop-blur lg:hidden">
      <p className="text-sm font-semibold text-text-primary">CargoWare CRM</p>
      <NavLink
        to="/customers"
        className={({ isActive }) =>
          `inline-flex h-9 items-center rounded-control px-3 text-sm font-medium ${
            isActive ? 'bg-primary-light text-primary' : 'text-text-secondary hover:bg-slate-100'
          }`
        }
      >
        客户列表
      </NavLink>
    </header>
  );
}
