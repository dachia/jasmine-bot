import posthog from 'posthog-js'
import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { I18n } from 'react-polyglot';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import config from './config';
import en from './locales/en.json';

const locale = 'en';
const messages = {
  en
}

posthog.init(config.POSTHOG_KEY, { api_host: 'https://app.posthog.com' })
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <RecoilRoot>
    <I18n locale={locale} messages={messages[locale]}>
      <HelmetProvider>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </HelmetProvider>
    </I18n>
  </RecoilRoot>
);
