import { Helmet } from 'react-helmet-async';
import { useTranslate } from 'react-polyglot';

import { BotRedirectView } from 'src/sections/bot-redirect';

// ----------------------------------------------------------------------

export default function BotRedirectPage() {
  const t = useTranslate();
  return (
    <>
      <Helmet>
        <title> { t("bot_redirect.page_title") } | { t("app.name") } </title>
      </Helmet>

      <BotRedirectView />
    </>
  );
}
