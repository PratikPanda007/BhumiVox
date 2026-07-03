using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

public class EmailService
{
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
        _config = config;
    }

    public async Task SendOtpEmailAsync(string toEmail, string otp)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "Anusanga",
            _config["Smtp:From"]
        ));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = "Password Reset OTP";

        message.Body = new TextPart("html")
        {
            Text = $@"
            <h2>Password Reset</h2>
            <p>Your OTP is:</p>
            <h1>{otp}</h1>
            <p>This OTP expires in 10 minutes.</p>"
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(
            _config["Smtp:Host"],
            int.Parse(_config["Smtp:Port"]),
            SecureSocketOptions.StartTls
        );

        await client.AuthenticateAsync(
            _config["Smtp:Username"],
            _config["Smtp:Password"]
        );

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

    public async Task SendTemporaryPasswordEmailAsync(
    string toEmail,
    string tempPassword)
    {
        var message = new MimeMessage();
        message.From.Add(new MailboxAddress(
            "Anusanga",
            _config["Smtp:From"]
        ));
        message.To.Add(MailboxAddress.Parse(toEmail));
        message.Subject = "Your Temporary Password";

        message.Body = new TextPart(TextFormat.Html)
        {
            Text = $@"
            <h2>Password Reset Successful</h2>
            <p>Your temporary password is:</p>
            <h3>{tempPassword}</h3>
            <p>Please log in using this password and change it immediately.</p>
        "
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(
            _config["Smtp:Host"],
            int.Parse(_config["Smtp:Port"]),
            SecureSocketOptions.StartTls
        );

        await client.AuthenticateAsync(
            _config["Smtp:Username"],
            _config["Smtp:Password"]
        );

        await client.SendAsync(message);
        await client.DisconnectAsync(true);
    }

}
