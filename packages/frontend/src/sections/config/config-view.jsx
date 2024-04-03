import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import { useTranslate } from 'react-polyglot';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';

import FormHelperText from '@mui/material/FormHelperText';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';

import { authAtom } from 'src/state/authState';
import { userAtom } from 'src/state/userState';
import { getCurrentUser, updateCurrentUser } from 'src/services/authService';


const timezones = Intl.supportedValuesOf('timeZone');

const schema = yup.object().shape({
  timezone: yup.string().oneOf(timezones),
});

// ----------------------------------------------------------------------

export default function ConfigView() {
  const t = useTranslate();
  // const theme = useTheme();
  const [user, setUser] = useRecoilState(userAtom);
  const setAuthState = useSetRecoilState(authAtom);

  const { handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_ = await getCurrentUser();
        setUser(user_.data);
        reset({ timezone: user_?.data?.timezone });
      } catch (error) {
        setUser(null);
        setAuthState(null);
        console.error(error);
      }
    };
    if (user === null) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (user && user.timezone == null) {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setUser({ ...user, timezone });
      reset({ timezone });
    }
  }, [user, setUser, reset]);
  const [error, setError] = useState(null);


  const save = async (data) => {
    setError(null);
    try {
      await updateCurrentUser({ timezone: data.timezone });
    } catch (e) {
      setError("Something went wrong. Please try again.")
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3} direction="row">
        <Controller
          name="timezone"
          control={control}
          defaultValue={user?.timezone ?? ""}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.timezone}>
              <InputLabel id="timezone-label">Timezone</InputLabel>
              <Select fullWidth labelId="timezone-label" {...field}>
                {timezones.map((locale) => (
                  <MenuItem key={locale} value={locale}>
                    {locale}
                  </MenuItem>
                ))}
              </Select>
              {!!errors.timezone && <FormHelperText>{errors.timezone.message}</FormHelperText>}
            </FormControl>
          )}
        />

      </Stack>
      {error && (
        <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
          {error}
        </Typography>
      )}

      <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }} />

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleSubmit(save)}
      >
        {t("general.save")}
      </LoadingButton>
    </>
  );

  return (

    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t("config.page_greeting")}
      </Typography>

      <Grid container spacing={3} alignItems="center" justifyContent="center">

        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}>
          {renderForm}
        </Card>
      </Grid>
    </Container>
  );
}
