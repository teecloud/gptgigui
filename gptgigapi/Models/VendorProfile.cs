using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace gptgigapi.Models
{
    public class VendorProfile : ITenantEntity
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;
        public IdentityUser? User { get; set; }

        public string TenantId { get; set; } = string.Empty;
    }
}
