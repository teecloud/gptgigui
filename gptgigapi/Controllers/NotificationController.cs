using gptgigapi.Services;
using Microsoft.AspNetCore.Mvc;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;

        public NotificationController(INotificationService notificationService)
        {
            _notificationService = notificationService;
        }

        [HttpPost("email")]
        public async Task<IActionResult> SendEmail([FromBody] EmailDto dto)
        {
            await _notificationService.SendEmailAsync(dto.To, dto.Subject, dto.Body);
            return Ok();
        }

        [HttpPost("sms")]
        public async Task<IActionResult> SendSms([FromBody] SmsDto dto)
        {
            await _notificationService.SendSmsAsync(dto.PhoneNumber, dto.Message);
            return Ok();
        }
    }

    public record EmailDto(string To, string Subject, string Body);
    public record SmsDto(string PhoneNumber, string Message);
}
