import { useTranslate } from 'react-polyglot';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';




// ----------------------------------------------------------------------

export default function PrivacyView() {
  const t = useTranslate();
  return (
    <Card
      sx={{
        p: 5,
        width: 1,
        maxWidth: 640,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {t("privacy.title")}
      </Typography>

      <Typography variant="body1" gutterBottom>
        This Privacy Policy governs the manner in which [Company Name] collects, uses, maintains, and discloses information collected from users (&quot;User&quot; or &quot;you&quot;) of the Jasmine Telegram Bot (&quot;Bot&quot;).
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>1. Information Collection:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Personal Information:</strong> We may collect personal information from Users in various ways, including but not limited to when Users interact with the Bot, register an account, subscribe to the service, or fill out a form. Personal information may include name, email address, username, and other relevant details.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Non-personal Information:</strong> We may collect non-personal information about Users whenever they interact with the Bot. Non-personal information may include the type of device used, the operating system, browser type, and other technical information.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>2. How We Use Collected Information:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Personal Information:</strong> We may use personal information provided by Users for the following purposes:
      </Typography>

      <Typography variant="body1" gutterBottom>
        To personalize user experience: We may use information to understand how Users interact with the Bot and personalize their experience accordingly.
      </Typography>

      <Typography variant="body1" gutterBottom>
        To improve customer service: Information provided helps us respond to customer service requests and support needs more efficiently.
      </Typography>

      <Typography variant="body1" gutterBottom>
        To send periodic emails: We may use the email address provided to send information and updates pertaining to the Bot. Users may unsubscribe from receiving emails at any time.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>Non-personal Information:</strong> Non-personal information collected may be used for technical purposes, such as diagnosing problems with the Bot, analyzing usage trends, and improving the functionality of the Bot.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>3. How We Protect Your Information:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information and data stored on the Bot.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>4. Sharing Your Personal Information:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        We do not sell, trade, or rent Users&apos; personal information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>5. Changes to this Privacy Policy:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        [Company Name] has the discretion to update this Privacy Policy at any time. When we do, we will revise the updated date at the bottom of this page. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>6. Your Acceptance of these Terms:</strong>
      </Typography>

      <Typography variant="body1" gutterBottom>
        By using the Jasmine Telegram Bot, you signify your acceptance of this Privacy Policy. If you do not agree to this policy, please do not use the Bot. Your continued use of the Bot following the posting of changes to this policy will be deemed your acceptance of those changes.
      </Typography>

      <Typography variant="body1" gutterBottom>
        <strong>7. Contacting Us:</strong>
      </Typography>

      <Typography variant="body1">
        If you have any questions about this Privacy Policy, the practices of the Bot, or your dealings with the Bot, please contact us at [contact email or address].
      </Typography>

      <Typography variant="body1" gutterBottom>
        This Privacy Policy was last updated on 2024-03-13.
      </Typography>
    </Card>
  );
}
