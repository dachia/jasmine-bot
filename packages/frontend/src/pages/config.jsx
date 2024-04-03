import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { ConfigView } from 'src/sections/config';

// ----------------------------------------------------------------------

export default function ConfigPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("config.page_title") } | { t("app.name") } </title>
      </Helmet>

      <ConfigView />
    </>
  );
}
