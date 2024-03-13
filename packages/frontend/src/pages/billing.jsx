import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { BillingView } from 'src/sections/billing/view';

// ----------------------------------------------------------------------

export default function BillingPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("billing.page_title") } | { t("app.name") } </title>
      </Helmet>

      <BillingView />
    </>
  );
}
