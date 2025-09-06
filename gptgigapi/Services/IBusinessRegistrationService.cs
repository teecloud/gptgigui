using System.Threading.Tasks;
using gptgigapi.Models;

namespace gptgigapi.Services
{
    public interface IBusinessRegistrationService
    {
        Task ProcessAsync(BusinessRegistration registration);
    }
}
