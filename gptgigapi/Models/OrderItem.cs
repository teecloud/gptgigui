using System.ComponentModel.DataAnnotations;

namespace gptgigapi.Models
{
    public class OrderItem : ITenantEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ServiceItemId { get; set; } = string.Empty;

        [Required]
        public string ServiceTitle { get; set; } = string.Empty;

        public string? ServiceImageUrl { get; set; }

        [Range(1, int.MaxValue)]
        public int Quantity { get; set; } = 1;

        [Required]
        public int OrderId { get; set; }

        public Order Order { get; set; } = null!;

        public string TenantId { get; set; } = string.Empty;
    }
}
