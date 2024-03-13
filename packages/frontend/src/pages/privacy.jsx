import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { PrivacyView } from 'src/sections/privacy';

// ----------------------------------------------------------------------

export default function TermsPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("privacy.page_title") } | { t("app.name") } </title>
      </Helmet>

      <PrivacyView/>
    </>
  );
}
