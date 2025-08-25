using Stripe;

namespace gptgigapi.Services
{
    public interface IPaymentService
    {
        Task<PaymentIntent> CreatePaymentIntent(long amount, string currency);
    }
}
