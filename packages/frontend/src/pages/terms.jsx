import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { TermsView } from 'src/sections/terms';

// ----------------------------------------------------------------------

export default function TermsPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("terms.page_title") } | { t("app.name") } </title>
      </Helmet>

      <TermsView/>
    </>
  );
}
