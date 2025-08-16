using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;

namespace gptgigapi.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ILogger<NotificationService> _logger;
        private readonly IConfiguration _configuration;

        public NotificationService(ILogger<NotificationService> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var host = _configuration["EmailSettings:SmtpHost"];
            var port = int.TryParse(_configuration["EmailSettings:SmtpPort"], out var p) ? p : 587;
            var username = _configuration["EmailSettings:Username"];
            var password = _configuration["EmailSettings:Password"];
            var from = _configuration["EmailSettings:From"];

            using var client = new SmtpClient(host, port)
            {
                Credentials = new NetworkCredential(username, password),
                EnableSsl = true
            };

            using var message = new MailMessage(from!, to, subject, body);
            await client.SendMailAsync(message);
            _logger.LogInformation("Email sent to {To} with subject {Subject}", to, subject);
        }

        public async Task SendSmsAsync(string phoneNumber, string message)
        {
            var accountSid = _configuration["Twilio:AccountSid"];
            var authToken = _configuration["Twilio:AuthToken"];
            var fromNumber = _configuration["Twilio:FromNumber"];

            TwilioClient.Init(accountSid, authToken);
            await MessageResource.CreateAsync(
                to: new PhoneNumber(phoneNumber),
                from: new PhoneNumber(fromNumber),
                body: message);
            _logger.LogInformation("SMS sent to {PhoneNumber}", phoneNumber);
        }
    }
}

