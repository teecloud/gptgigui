using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace gptgigapi.Services
{
    public class NotificationService : INotificationService
    {
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(ILogger<NotificationService> logger)
        {
            _logger = logger;
        }

        public Task SendEmailAsync(string to, string subject, string body)
        {
            _logger.LogInformation("Sending email to {To} with subject {Subject}", to, subject);
            return Task.CompletedTask;
        }

        public Task SendSmsAsync(string phoneNumber, string message)
        {
            _logger.LogInformation("Sending SMS to {PhoneNumber}: {Message}", phoneNumber, message);
            return Task.CompletedTask;
        }
    }
}

