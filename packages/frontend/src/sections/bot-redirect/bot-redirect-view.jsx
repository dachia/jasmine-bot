import { useRecoilValue } from 'recoil';
import { useState, useEffect } from 'react';
import { useTranslate } from 'react-polyglot';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import config from 'src/config';
import { authAtom } from 'src/state/authState';

export default function BotRedirectView() {
  const user = useRecoilValue(authAtom);
  const [countdown, setCountdown] = useState(5);
  const t = useTranslate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = `${config.TELEGRAM_BOT_ENDPOINT}?start=${user.id}`;
    }
  }, [countdown, user]);

  return (

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("bot_redirect.title")}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="center"
        sx={{ mb: 5 }}
      >
        <Stack direction="column" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Typography variant="h6">{t("bot_redirect.redirecting", { countdown })}</Typography>
          <Button variant="contained" color="primary" href={`${config.TELEGRAM_BOT_ENDPOINT}?start=${user.id}`} target="_blank">
            {t("bot_redirect.click_here")}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}