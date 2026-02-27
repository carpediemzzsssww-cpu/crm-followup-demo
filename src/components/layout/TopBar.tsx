import { useI18n } from '../../i18n';

export default function TopBar() {
  const { locale, toggleLocale, t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-40 h-12 border-b border-border-color bg-white">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-control bg-primary-light">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-primary" fill="none" aria-hidden="true">
              <path d="M4 8L12 4L20 8L12 12L4 8Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M4 8V16L12 20L20 16V8" stroke="currentColor" strokeWidth="1.8" />
            </svg>
          </span>
          <span className="text-sm font-semibold tracking-wide text-text-primary">CargoWare</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <button
            type="button"
            onClick={toggleLocale}
            className="inline-flex h-8 items-center justify-center rounded-control border border-border-color px-2.5 text-xs font-medium text-text-primary transition hover:bg-slate-100"
            aria-label={t('topbar.langSwitch')}
          >
            {locale === 'zh' ? 'EN' : '中文'}
          </button>

          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center rounded-control transition hover:bg-slate-100"
            aria-label={t('topbar.notify')}
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
              <path d="M12 4C9.24 4 7 6.24 7 9V12.2L5.5 14.5H18.5L17 12.2V9C17 6.24 14.76 4 12 4Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10 18C10.3 19 11.1 19.7 12 19.7C12.9 19.7 13.7 19 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <span className="font-medium text-text-primary">{t('topbar.user')}</span>
          <span className="hidden sm:inline text-text-secondary">{t('topbar.company')}</span>
        </div>
      </div>
    </header>
  );
}
