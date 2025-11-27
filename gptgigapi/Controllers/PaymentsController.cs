using Microsoft.AspNetCore.Mvc;
using gptgigapi.Services;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentsController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("create-intent")]
        public async Task<IActionResult> CreateIntent([FromBody] CreatePaymentIntentDto dto)
        {
            var intent = await _paymentService.CreatePaymentIntent(dto.Amount, dto.Currency);
            return Ok(new { clientSecret = intent.ClientSecret, paymentIntentId = intent.Id });
        }
    }

    public record CreatePaymentIntentDto(long Amount, string Currency);
}
