import React from 'react';
import { useRecoilState } from 'recoil';
import { useTranslate } from 'react-polyglot';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import LocalDiningIcon from '@mui/icons-material/LocalDining';
import FlutterDashIcon from '@mui/icons-material/FlutterDash';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import config from 'src/config';
import { authAtom } from 'src/state/authState';

export default () => {
  const t = useTranslate();

  const [token,] = useRecoilState(authAtom) 

  return (
    <Card sx={{ minWidth: 325 }}>
      <form action={`${config.API_ENDPOINT}/stripe/create-checkout-session`} method="POST">
        <CardContent>
          <Typography variant='h6' gutterBottom align='center'>
            <Box component="span" display="flex" alignItems="center" justifyContent="center">
              <FlutterDashIcon color="primary" /> &nbsp;
              {t('billing.plan_nutrition.title')}
            </Box>
          </Typography>
          <Typography color="primary" variant="h4" align='center' gutterBottom  sx={{ "marginBottom": "2em"}}>
            $5 {t('billing.usd')}<Typography component="span" color="text.secondary">{t('billing.per_month')}</Typography>
          </Typography>
          <Typography>
            {t('billing.plan_nutrition.description_title')}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="ul"  sx={{ "marginBottom": "2em"}}>
            <li>{t('billing.plan_nutrition.first')}</li>  
            <li>{t('billing.plan_nutrition.second')}</li>  
            <li>{t('billing.plan_nutrition.third')}</li>  
            <li>{t('billing.plan_nutrition.fourth')}</li>  
          </Typography>
          {/* Add a hidden field with the lookup_key of your Price */}
          <input type="hidden" name="token" value={token} />
          <input type="hidden" name="lookup_key" value="price_1OyY1RP8e7yXnsQACqGggFzh" />
        </CardContent>
        <CardActions>
          <Button color='primary' variant='contained' fullWidth type='submit' endIcon={<NavigateNextIcon/>}>{t("billing.subscribe")}</Button>
        </CardActions>
      </form>
    </Card>
  )
};
