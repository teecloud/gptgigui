using Microsoft.AspNetCore.Identity;

namespace gptgigapi.Models
{
    public class CustomerProfile
    {
        public int Id { get; set; }
        public string DisplayName { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;
        public IdentityUser? User { get; set; }

        public int VendorProfileId { get; set; }
        public VendorProfile? VendorProfile { get; set; }
    }
}
