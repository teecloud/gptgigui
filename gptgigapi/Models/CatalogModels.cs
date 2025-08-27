namespace gptgigapi.Models
{
    public class ServiceCategory
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Icon { get; set; }
    }

    public class ServiceItem
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public decimal? Price { get; set; }
        public int? DurationMin { get; set; }
        public string? CategoryId { get; set; }
        public List<string>? Tags { get; set; }
        public double? Rating { get; set; }
        public string? Description { get; set; }
        public List<string>? AvailableSlots { get; set; }
    }

    public class Provider
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? AvatarUrl { get; set; }
        public double? Rating { get; set; }
        public List<string>? Tags { get; set; }
        public List<string>? ServicesOffered { get; set; }
    }
}

