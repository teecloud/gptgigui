using Microsoft.AspNetCore.Identity;

namespace gptgigapi.Models
{
    public class CustomerProfile : ITenantEntity
    {
        public int Id { get; set; }
        public string DisplayName { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;
        public IdentityUser? User { get; set; }

        public string TenantId { get; set; } = string.Empty;
    }
}
