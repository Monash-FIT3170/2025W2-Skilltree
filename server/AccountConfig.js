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
<div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5; color: #333;">
  <h2>Hello!</h2>
  <p>A request to reset your Skilltree password has been made.</p>
  <p>If you didn't request this email, you can safely ignore it.</p>
  <p>If you did make this request, click the button below to reset your password:</p>
  <p>
    <a href="${url}" style="
      display: inline-block;
      padding: 10px 15px;
      background-color: #007BFF;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;">
      Reset Password
    </a>
  </p>
  <p>Thanks, and keep learning!</p>
  <p><strong>– Skilltree Support Team</strong></p>
</div>
    `;
  }
};
