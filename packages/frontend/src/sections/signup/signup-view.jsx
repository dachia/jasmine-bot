import * as yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslate } from 'react-polyglot';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { ValidatedInput } from 'src/utils/components/validated-input';

import Iconify from 'src/components/iconify';

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  'repeat-password': yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

// ----------------------------------------------------------------------

export default function SignUpView() {
  const t = useTranslate();
  const theme = useTheme();

  const router = useRouter();
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    router.push('/dashboard');
  };

  const handleLoginClick = () => {
    router.push('/login');
  }

  const renderForm = (
    <>
      <Stack spacing={3}>
        <ValidatedInput
          component={TextField}
          name="email"
          errors={errors}
          control={control}
          label={t("general.email_address")}
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
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <ValidatedInput
          control={control}
          name="repeat-password"
          label={t("general.repeat_password")}
          type={showPassword ? 'text' : 'password'}
          component={TextField}
          errors={errors}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(handleClick)}
      >
        {t("sign_up.button_signup")}
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
      <Typography variant="h4">{t("sign_up.title", { name: t("app.name") })}</Typography>

      <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
        {t("sign_up.already_have_an_account")}
        <Link variant="subtitle2" sx={{ ml: 0.5 }} onClick={handleLoginClick}>
          {t("sign_up.login_link")}
        </Link>
      </Typography>

      <Stack direction="row" spacing={2}>
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
      </Divider>

      {renderForm}
    </Card>
  );
}
