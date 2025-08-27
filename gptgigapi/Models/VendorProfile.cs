using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace gptgigapi.Models
{
    public class VendorProfile
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;
        public IdentityUser? User { get; set; }

        public ICollection<CustomerProfile>? Customers { get; set; }
    }
}
