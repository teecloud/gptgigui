using Microsoft.AspNetCore.Mvc;
using gptgigapi.Models;
using gptgigapi.Data;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        [HttpGet("categories")]
        public IEnumerable<ServiceCategory> GetCategories() => CatalogData.Categories;

        [HttpGet("services")]
        public IEnumerable<ServiceItem> GetServices() => CatalogData.Services;

        [HttpGet("providers")]
        public IEnumerable<Provider> GetProviders() => CatalogData.Providers;

        [HttpPost("categories")]
        public IActionResult UpsertCategory(ServiceCategory cat)
        {
            var idx = CatalogData.Categories.FindIndex(c => c.Id == cat.Id);
            if (idx >= 0) CatalogData.Categories[idx] = cat; else CatalogData.Categories.Add(cat);
            return Ok(cat);
        }

        [HttpPost("services")]
        public IActionResult UpsertService(ServiceItem svc)
        {
            var idx = CatalogData.Services.FindIndex(s => s.Id == svc.Id);
            if (idx >= 0) CatalogData.Services[idx] = svc; else CatalogData.Services.Add(svc);
            return Ok(svc);
        }

        [HttpPost("providers")]
        public IActionResult UpsertProvider(Provider p)
        {
            var idx = CatalogData.Providers.FindIndex(x => x.Id == p.Id);
            if (idx >= 0) CatalogData.Providers[idx] = p; else CatalogData.Providers.Add(p);
            return Ok(p);
        }
    }
}

