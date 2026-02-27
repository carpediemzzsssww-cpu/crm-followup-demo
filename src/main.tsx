import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { I18nProvider } from './i18n';
import { FollowUpStoreProvider } from './store/followUpStore';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <I18nProvider>
      <FollowUpStoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FollowUpStoreProvider>
    </I18nProvider>
  </React.StrictMode>
);
