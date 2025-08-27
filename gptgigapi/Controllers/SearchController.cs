using Microsoft.AspNetCore.Mvc;
using gptgigapi.Data;
using gptgigapi.Models;
using System;
using System.Linq;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<ServiceItem> Get([FromQuery] SearchOptions options)
        {
            var query = CatalogData.Services.AsQueryable();

            if (!string.IsNullOrWhiteSpace(options.Query))
            {
                var q = options.Query.ToLower();
                query = query.Where(s =>
                    (!string.IsNullOrEmpty(s.Title) && s.Title.ToLower().Contains(q)) ||
                    (!string.IsNullOrEmpty(s.Description) && s.Description.ToLower().Contains(q)) ||
                    (s.Tags != null && s.Tags.Any(t => t.ToLower().Contains(q))));
            }

            if (!string.IsNullOrEmpty(options.CategoryId))
                query = query.Where(s => s.CategoryId == options.CategoryId);

            if (options.MinPrice.HasValue)
                query = query.Where(s => s.Price >= options.MinPrice);

            if (options.MaxPrice.HasValue)
                query = query.Where(s => s.Price <= options.MaxPrice);

            if (options.MinRating.HasValue)
                query = query.Where(s => s.Rating >= options.MinRating);

            if (options.Tags != null && options.Tags.Any())
                query = query.Where(s => s.Tags != null && s.Tags.Any(t => options.Tags.Contains(t, StringComparer.OrdinalIgnoreCase)));

            return query.ToList();
        }
    }
}
