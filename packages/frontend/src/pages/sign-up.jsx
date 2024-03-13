import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { SignUpView } from 'src/sections/signup';

// ----------------------------------------------------------------------

export default function SignUpPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("sign_up.page_title") } | { t("app.name") } </title>
      </Helmet>

      <SignUpView />
    </>
  );
}
