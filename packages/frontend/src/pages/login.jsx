import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("login.page_title") } | { t("app.name") } </title>
      </Helmet>

      <LoginView />
    </>
  );
}
