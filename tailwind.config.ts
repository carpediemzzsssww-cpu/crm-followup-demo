import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B4FD8',
        'primary-light': '#EEF3FF',
        success: '#16A34A',
        warning: '#D97706',
        danger: '#DC2626',
        'neutral-bg': '#F8FAFC',
        'border-color': '#E2E8F0',
        'text-primary': '#0F172A',
        'text-secondary': '#64748B',
        'voided-bg': '#F1F5F9',
        'sidebar-bg': '#1E293B'
      },
      borderRadius: {
        card: '8px',
        control: '6px'
      },
      fontFamily: {
        sans: ['system-ui', 'PingFang SC', 'Microsoft YaHei', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
} satisfies Config;
