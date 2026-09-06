const resetPasswordTemplate = ({ name, resetPasswordUrl }) => {
    const text = `Hi ${name},\n\nWe received a request to reset your ServeWell password. Use the link below to choose a new one (expires in 15 minutes):\n\n${resetPasswordUrl}\n\nIf you didn't request this, you can safely ignore this email.`;

    const html = `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e4e4e7;">
          <tr>
            <td style="padding:32px 32px 0 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="width:32px;height:32px;background-color:#0d9488;border-radius:8px;" valign="middle" align="center">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
                      <td width="16" align="center" style="padding:0 1px;"><div style="width:12px;height:12px;background-color:#ffffff;opacity:0.9;border-radius:50%;margin:0 auto;"></div></td>
                    </tr></table>
                  </td>
                  <td style="padding-left:10px;font-size:18px;font-weight:700;color:#18181b;">ServeWell</td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 32px 8px 32px;font-size:20px;font-weight:700;color:#18181b;">
              Reset your password
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px 32px;font-size:14px;line-height:1.6;color:#52525b;">
              Hi ${name}, we received a request to reset your ServeWell password. This link expires in 15 minutes.
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px 32px;">
              <a href="${resetPasswordUrl}" style="display:inline-block;background-color:#0d9488;color:#ffffff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;">
                Reset password
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 32px 32px;font-size:12px;line-height:1.6;color:#a1a1aa;border-top:1px solid #f4f4f5;padding-top:20px;">
              If the button doesn't work, copy and paste this link into your browser:<br/>
              <a href="${resetPasswordUrl}" style="color:#0d9488;word-break:break-all;">${resetPasswordUrl}</a>
              <br/><br/>
              If you didn't request this, you can safely ignore this email.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    return { subject: 'Reset your ServeWell password', text, html };
};

module.exports = { resetPasswordTemplate };
