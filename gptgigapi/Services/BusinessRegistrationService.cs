using System.Threading.Tasks;
using gptgigapi.Models;

namespace gptgigapi.Services
{
    public class BusinessRegistrationService : IBusinessRegistrationService
    {
        public Task ProcessAsync(BusinessRegistration registration)
        {
            // Placeholder for integrating with external services
            return Task.CompletedTask;
        }
    }
}
