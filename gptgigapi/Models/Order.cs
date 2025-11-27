using System;
using System.ComponentModel.DataAnnotations;

namespace gptgigapi.Models
{
    public class Order : ITenantEntity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ServiceItemId { get; set; } = string.Empty;

        [Required]
        public string ServiceTitle { get; set; } = string.Empty;

        public string? ServiceImageUrl { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(10)]
        public string Currency { get; set; } = "usd";

        [Required]
        public string PaymentIntentId { get; set; } = string.Empty;

        public string? PaymentMethodType { get; set; }

        public string PaymentStatus { get; set; } = "pending";

        public string? CustomerName { get; set; }

        public string? CustomerEmail { get; set; }

        public string? ScheduledSlot { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string TenantId { get; set; } = string.Empty;
    }
}
