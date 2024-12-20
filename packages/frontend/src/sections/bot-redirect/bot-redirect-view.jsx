import { jwtDecode } from 'jwt-decode';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import { useTranslate } from 'react-polyglot';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import config from 'src/config';
import { authAtom } from 'src/state/authState';

export default function BotRedirectView() {
  const [token,] = useRecoilState(authAtom);
  const [countdown, setCountdown] = useState(5);
  const t = useTranslate();
  const user = jwtDecode(token);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        let res;
        if (prevCountdown <= 1) {
          clearInterval(timer);
          res = 0;
        } else {
          res = prevCountdown - 1;
        }
        return res
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [])

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = `${config.TELEGRAM_BOT_ENDPOINT}?start=${user?.userId}`;
    }
  }, [countdown, user]);

  return (

    <Container>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="center"
        sx={{ mb: 5 }}
      >
        <Stack direction="column" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <Typography variant="h6">{t("bot_redirect.redirecting", { countdown })}</Typography>
          <Button variant="contained" color="primary" href={`${config.TELEGRAM_BOT_ENDPOINT}?start=${user?.userId}`} target="_blank">
            {t("bot_redirect.click_here")}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}