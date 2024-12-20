import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("dashboard.page_title") } | { t("app.name") } </title>
      </Helmet>

      <AppView />
    </>
  );
}
