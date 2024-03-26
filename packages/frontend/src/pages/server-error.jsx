import { Helmet } from 'react-helmet-async';

import { ServerErrorView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function ServerErrorPage() {
  return (
    <>
      <Helmet>
        <title> 500 something went wrong </title>
      </Helmet>

      <ServerErrorView />
    </>
  );
}
