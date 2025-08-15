namespace gptgigapi.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;
        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
