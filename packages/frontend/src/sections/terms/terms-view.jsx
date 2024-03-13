import { useTranslate } from 'react-polyglot';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';





// ----------------------------------------------------------------------

export default function TermsView() {
  const t = useTranslate();
  return (
    <Card
      sx={{
        p: 5,
        width: 1,
        maxWidth: 640,
      }}
    >
      <Typography variant="h4">{t("terms.title")}</Typography>

      <Typography variant="body1" gutterBottom>
        These Terms and Conditions (&quot;Terms&quot;) govern your use of the Jasmine Telegram Bot (&quot;Bot&quot;) provided by [Company Name], its subsidiaries, affiliates, and partners (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By using the Bot, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use the Bot.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Description of Service:</strong> The Jasmine Telegram Bot logs your food intake and provides counseling and cognitive therapy to help you battle your food cravings and achieve your health and wellness goals.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>7-Day Free Trial:</strong> We offer a 7-day free trial period for new users. During this trial period, you will have access to all features of the Bot without charge. At the end of the trial period, you will be automatically enrolled in a paid subscription unless you cancel your subscription before the end of the trial period.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>User Eligibility:</strong> You must be at least 18 years old to use the Bot. By using the Bot, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Account Registration:</strong> You may be required to create an account to access certain features of the Bot. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Fees:</strong> After the 7-day free trial period, the use of the Bot may be subject to fees. Any applicable fees will be disclosed to you before you incur them. By using the Bot, you agree to pay all fees and charges associated with your use of the Bot.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Privacy Policy:</strong> Your privacy is important to us. Our Privacy Policy governs the collection, use, and disclosure of your personal information. By using the Bot, you consent to the collection, use, and disclosure of your personal information as described in our Privacy Policy.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Accuracy of Data Provided:</strong> While the Jasmine Telegram Bot strives to provide accurate information regarding calories and macronutrients, it is important to note that there may be variations in the actual nutritional values. The data provided by the Bot are approximations and are highly dependent on the type and grammage detail of information shared with the Bot. Therefore, users should use the information provided by the Bot as a general guideline and should exercise discretion when making dietary decisions based on this information. For precise nutritional information, users are encouraged to consult professional nutritionists or refer to verified sources.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>User Conduct:</strong> You agree not to use the Bot for any unlawful purpose or in any way that violates these Terms. You further agree not to use the Bot to harass, abuse, stalk, threaten, or otherwise infringe upon the rights of others.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Intellectual Property:</strong> All content and materials available through the Bot, including but not limited to text, graphics, logos, images, and software, are the property of [Company Name] or its licensors and are protected by copyright, trademark, and other intellectual property laws.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Termination:</strong> We reserve the right to suspend or terminate your access to the Bot at any time, without notice, for any reason or no reason, including if we believe that you have violated these Terms.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Modification of Terms:</strong> We reserve the right to modify these Terms at any time. Any changes to these Terms will be effective immediately upon posting. Your continued use of the Bot after any such changes constitutes your acceptance of the revised Terms.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Governing Law:</strong> These Terms shall be governed by and construed in accordance with the laws of [insert jurisdiction], without regard to its conflict of law principles.
      </Typography>

      <Typography variant="body1" gutterBottom>
        Contact Us: If you have any questions about these Terms, please contact us at [contact email or address].
      </Typography>

      <Typography variant="body1">
        By using the Jasmine Telegram Bot, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy.
      </Typography>
    </Card>
  );
}
