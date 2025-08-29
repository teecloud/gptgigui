namespace gptgigapi.Models
{
    public class Photo : ITenantEntity
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
        public string TenantId { get; set; } = string.Empty;
    }
}
