import { Meteor } from 'meteor/meteor'; // Accounts is globally available in Meteor
import { Accounts } from 'meteor/accounts-base';

//Customise the reset password URL sent in the email
Accounts.urls.resetPassword = function (token) {
  return Meteor.absoluteUrl(`login/reset-password/${token}`);
};

//Email sender and site details
Accounts.emailTemplates.from =
  'Skilltree Support <support@skilltreeplatform.com>';
Accounts.emailTemplates.siteName = 'Skilltree';

//Reset Password Email Template
//Note: user and url are provided internally in meteor
Accounts.emailTemplates.resetPassword = {
  subject(user) {
    return 'Skilltree Reset Password Link';
  },

  text(user, url) {
    return `
Hello!

A request to reset your Skilltree password has been made.

If you didn't request this email, please ignore it.

If you did make this request, click the link below to reset your password:

${url}

Thanks, and keep learning!

– Skilltree Support Team`;
  },

html(user, url) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Your Skilltree Password</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #334155;">
  
  <!-- Main Container -->
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header Section -->
    <div style="background: #04BF8A; padding: 40px 30px; text-align: center;">  
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
        Skilltree Password Reset Request
      </h1>
      <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">
        Let's get you back into your account
      </p>
    </div>

    <!-- Content Section -->
    <div style="padding: 40px 30px;">
      <!-- Greeting -->
      <div style="text-align: center; margin-bottom: 32px;">
        <h2 style="color: #1e293b; margin: 0 0 12px 0; font-size: 24px; font-weight: 600;">
          Hello, ${(user.profile?.givenName && user.profile?.familyName)
            ? user.profile.givenName + ' ' + user.profile.familyName
            : 'fellow Skilltree Learner'
          }!
        </h2>
        <p style="color: #64748b; margin: 0; font-size: 16px; line-height: 1.6;">
          We received a request to reset your Skilltree password.
        </p>
      </div>

      <div style="background-color: #f1f5f9; border-left: 4px solid #04BF8A; padding: 20px; margin-bottom: 32px; border-radius: 0 8px 8px 0;">
        <p style="margin: 0; color: #475569; font-size: 14px; line-height: 1.5;">
          If you didn't request this password reset, you can safely ignore this email. Your account remains secure.
        </p>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${url}" style="
          display: inline-block;
          padding: 16px 32px;
          background: #04BF8A;
          color: #ffffff;
          text-decoration: none;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          box-shadow: 0 4px 12px rgba(4, 191, 138, 0.3);
          transition: all 0.3s ease;
        ">
          I want to reset my password!
        </a>
      </div>

      <div style="text-align: center; margin-bottom: 32px;">
        <p style="color: #64748b; font-size: 14px; margin-bottom: 8px;">
          Button not working? Copy and paste this link into your browser:
        </p>
        <p style="background-color: #f8fafc; padding: 12px; border-radius: 6px; border: 1px solid #e2e8f0; font-family: monospace; font-size: 12px; color: #475569; word-break: break-all; margin: 0;">
          ${url}
        </p>
      </div>

      <!-- Expired Message -->
      <div style="text-align: center; background-color: #fef3c7; border: 1px solid #fbbf24; padding: 16px; border-radius: 8px; margin-bottom: 32px;">
        <p style="margin: 0; color: #92400e; font-size: 14px;">
          <strong>Note that this link expires in 3 days</strong> for your security
        </p>
      </div>

      <!-- Support Section -->
      <div style="text-align: center; padding-top: 24px; border-top: 1px solid #e2e8f0;">
        <p style="color: #64748b; margin: 0 0 16px 0; font-size: 16px;">
          Need help? We're here for you! 💬
        </p>
        <p style="margin: 0; font-size: 14px; color: #475569;">
          Contact our support team at 
          <a href="mailto:support@skilltreeplatform.com" style="color: #04BF8A; text-decoration: none; font-weight: 500;">
            support@skilltreeplatform.com
          </a>
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #1e293b; padding: 32px 30px; text-align: center;">
      
      <!-- Logo and Tagline -->
      <div style="margin-bottom: 24px;">
        <p style="color: #94a3b8; margin: 0; font-size: 14px; font-style: italic;">
          "Grow your skills, unlock your potential"
        </p>
      </div>

      <!-- Info -->
      <div style="border-top: 1px solid #374151; padding-top: 20px;">
        <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
          © 2025 Skilltree Platform. All rights reserved.
        </p>
        <p style="color: #6b7280; margin: 0 0 8px 0; font-size: 12px;">
          Melbourne, Victoria, Australia
        </p>
        <p style="color: #6b7280; margin: 0; font-size: 11px; line-height: 1.4;">
          You received this email because you requested a password reset for your Skilltree account.
          <br>
          <a href="#" style="color: #04BF8A; text-decoration: none;">Unsubscribe</a> | 
          <a href="#" style="color: #04BF8A; text-decoration: none;">Privacy Policy</a> | 
          <a href="#" style="color: #04BF8A; text-decoration: none;">Terms of Service</a>
        </p>
      </div>
    </div>

  </div>
  
  <!-- Mobile View Only-->
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; }
      .header { padding: 30px 20px !important; }
      .content { padding: 30px 20px !important; }
      .footer { padding: 24px 20px !important; }
      .button { padding: 14px 24px !important; font-size: 15px !important; }
      .links a { display: block !important; margin: 8px 0 !important; }
    }
  </style>

</body>
</html>
  `;
}
};

Meteor.startup(() => {
  // Configure SMTP settings
  const smtp = Meteor.settings.private?.smtp;
  
  if (smtp) {
    process.env.MAIL_URL = `smtps://${encodeURIComponent(smtp.username)}:${encodeURIComponent(smtp.password)}@${smtp.server}:${smtp.port}`;
    console.log('MAIL_URL configured successfully');
  } else {
    console.warn('SMTP settings not found in Meteor.settings.private.smtp');
  }
})