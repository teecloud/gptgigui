using Microsoft.AspNetCore.Mvc;
using gptgigapi.Models;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private static readonly List<ServiceCategory> Categories = new()
        {
            new ServiceCategory { Id = "clean", Name = "Cleaning", Icon = "sparkles" },
            new ServiceCategory { Id = "move", Name = "Moving", Icon = "cube" },
            new ServiceCategory { Id = "tech", Name = "Tech Help", Icon = "hardware-chip" },
        };

        private static readonly List<ServiceItem> Services = new()
        {
            new ServiceItem { Id = "svc1", Title = "Apartment Deep Clean", CategoryId = "clean", Price = 149, DurationMin = 180, ImageUrl = "assets/samples/clean1.jpg", Rating = 4.9, Description = "Professional deep cleaning for your entire apartment." },
            new ServiceItem { Id = "svc2", Title = "Two Movers & Truck", CategoryId = "move", Price = 95, DurationMin = 120, ImageUrl = "assets/samples/move1.jpg", Rating = 4.7, Description = "Reliable moving service with two helpers and a truck." },
            new ServiceItem { Id = "svc3", Title = "Home Wi-Fi Tune Up", CategoryId = "tech", Price = 79, DurationMin = 60, ImageUrl = "assets/samples/tech1.jpg", Rating = 4.8, Description = "Optimize and secure your home wireless network." },
        };

        private static readonly List<Provider> Providers = new()
        {
            new Provider { Id = "pro1", Name = "Avery J.", AvatarUrl = "assets/samples/p1.jpg", Rating = 4.9, Tags = new List<string>{"Cleaning","Move-Out"} },
            new Provider { Id = "pro2", Name = "Kai M.", AvatarUrl = "assets/samples/p2.jpg", Rating = 4.8, Tags = new List<string>{"Tech Help"} },
            new Provider { Id = "pro3", Name = "Riley P.", AvatarUrl = "assets/samples/p3.jpg", Rating = 4.7, Tags = new List<string>{"Moving"} },
        };

        [HttpGet("categories")]
        public IEnumerable<ServiceCategory> GetCategories() => Categories;

        [HttpGet("services")]
        public IEnumerable<ServiceItem> GetServices() => Services;

        [HttpGet("providers")]
        public IEnumerable<Provider> GetProviders() => Providers;

        [HttpPost("categories")]
        public IActionResult UpsertCategory(ServiceCategory cat)
        {
            var idx = Categories.FindIndex(c => c.Id == cat.Id);
            if (idx >= 0) Categories[idx] = cat; else Categories.Add(cat);
            return Ok(cat);
        }

        [HttpPost("services")]
        public IActionResult UpsertService(ServiceItem svc)
        {
            var idx = Services.FindIndex(s => s.Id == svc.Id);
            if (idx >= 0) Services[idx] = svc; else Services.Add(svc);
            return Ok(svc);
        }

        [HttpPost("providers")]
        public IActionResult UpsertProvider(Provider p)
        {
            var idx = Providers.FindIndex(x => x.Id == p.Id);
            if (idx >= 0) Providers[idx] = p; else Providers.Add(p);
            return Ok(p);
        }
    }
}

