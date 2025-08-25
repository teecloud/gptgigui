using Stripe;
using Microsoft.Extensions.Configuration;

namespace gptgigapi.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly PaymentIntentService _paymentIntentService;

        public PaymentService(IConfiguration configuration)
        {
            StripeConfiguration.ApiKey = configuration["Stripe:SecretKey"];
            _paymentIntentService = new PaymentIntentService();
        }

        public async Task<PaymentIntent> CreatePaymentIntent(long amount, string currency)
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = currency,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                }
            };
            return await _paymentIntentService.CreateAsync(options);
        }
    }
}
