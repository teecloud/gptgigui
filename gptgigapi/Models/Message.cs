using System;
using System.ComponentModel.DataAnnotations;

namespace gptgigapi.Models
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string SenderId { get; set; } = string.Empty;
        [Required]
        public string RecipientId { get; set; } = string.Empty;
        [Required]
        public string Content { get; set; } = string.Empty;
        public DateTime Timestamp { get; set; }
        public bool IsRead { get; set; }
    }
}
