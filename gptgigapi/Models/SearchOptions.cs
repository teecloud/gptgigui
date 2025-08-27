namespace gptgigapi.Models
{
    public class SearchOptions
    {
        public string? Query { get; set; }
        public string? CategoryId { get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }
        public double? MinRating { get; set; }
        public List<string>? Tags { get; set; }
    }
}
