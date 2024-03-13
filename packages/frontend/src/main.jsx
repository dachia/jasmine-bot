import { Suspense } from 'react';
import { I18n } from 'react-polyglot';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import en from './locales/en.json';

const locale = 'en';
const messages = {
  en
}

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <I18n locale={locale} messages={messages[locale]}>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense>
          <App />
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>

  </I18n>
);
