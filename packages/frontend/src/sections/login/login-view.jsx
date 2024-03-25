import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { useTranslate } from 'react-polyglot';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
// import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { ValidatedInput } from 'src/utils/components/validated-input';

import { authAtom } from 'src/state/authState';
import { loginUser } from 'src/services/authService';

import Iconify from 'src/components/iconify';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
// ----------------------------------------------------------------------

export default function LoginView() {
  const t = useTranslate();
  // const theme = useTheme();
  const setAuthState = useSetRecoilState(authAtom);


  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async (data) => {
    const token = await loginUser(data);
    setAuthState(token);
    router.push('/');
  };

  const handleSignUpClick = () => {
    router.push('/sign-up');
  }

  const renderForm = (
    <>
      <Stack spacing={3}>

        <ValidatedInput
          errors={errors}
          component={TextField}
          name="email" label={t("general.email_address")}
          control={control}
        />
        <ValidatedInput
          control={control}
          name="password"
          label={t("general.password")}
          type={showPassword ? 'text' : 'password'}
          component={TextField}
          errors={errors}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} eggdge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
        <Link variant="subtitle2" underline="hover">
          {t("login.forgot_password")}
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(handleClick)}
      >
        {t("login.button_login")}
      </LoadingButton>
    </>
  );

  return (
    <Card
      sx={{
        p: 5,
        width: 1,
        maxWidth: 420,
      }}
    >
      <Typography variant="h4">{t("login.title", { name: t("app.name") })}</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
        {t("login.dont_have_account")}
        <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleSignUpClick}>
          {t("login.get_started")}
        </Link>
      </Typography>

      {/* <Stack direction="row" spacing={2}>
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
        >
          <Iconify icon="eva:google-fill" color="#DF3E30" />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
        >
          <Iconify icon="eva:facebook-fill" color="#1877F2" />
        </Button>

        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
        >
          <Iconify icon="eva:twitter-fill" color="#1C9CEA" />
        </Button>
      </Stack>

      <Divider sx={{ my: 3 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          OR
        </Typography>
      </Divider> */}

      {renderForm}
    </Card>
  );
}
