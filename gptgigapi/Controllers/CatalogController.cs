using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gptgigapi.Models;
using gptgigapi.Data;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatalogController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CatalogController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<ServiceCategory>>> GetCategories()
        {
            await SeedCatalogIfEmptyAsync();
            var categories = await _context.ServiceCategories.AsNoTracking().ToListAsync();
            return Ok(categories);
        }

        [HttpGet("services")]
        public async Task<ActionResult<IEnumerable<ServiceItem>>> GetServices()
        {
            await SeedCatalogIfEmptyAsync();
            var services = await _context.ServiceItems.AsNoTracking().ToListAsync();
            return Ok(services);
        }

        [HttpGet("providers")]
        public async Task<ActionResult<IEnumerable<Provider>>> GetProviders()
        {
            await SeedCatalogIfEmptyAsync();
            var providers = await _context.Providers.AsNoTracking().ToListAsync();
            return Ok(providers);
        }

        [HttpPost("categories")]
        public async Task<IActionResult> UpsertCategory(ServiceCategory cat)
        {
            var existing = await _context.ServiceCategories.FindAsync(cat.Id);

            if (existing is null)
            {
                _context.ServiceCategories.Add(cat);
            }
            else
            {
                existing.Name = cat.Name;
                existing.Icon = cat.Icon;
                existing.ProviderId = cat.ProviderId;
            }

            await _context.SaveChangesAsync();
            return Ok(cat);
        }

        [HttpPost("services")]
        public async Task<IActionResult> UpsertService(ServiceItem svc)
        {
            var existing = await _context.ServiceItems.FindAsync(svc.Id);

            if (existing is null)
            {
                _context.ServiceItems.Add(svc);
            }
            else
            {
                existing.Title = svc.Title;
                existing.ImageUrl = svc.ImageUrl;
                existing.Price = svc.Price;
                existing.DurationMin = svc.DurationMin;
                existing.CategoryId = svc.CategoryId;
                existing.ProviderId = svc.ProviderId;
                existing.Tags = svc.Tags;
                existing.Rating = svc.Rating;
                existing.Description = svc.Description;
                existing.AvailableSlots = svc.AvailableSlots;
            }

            await _context.SaveChangesAsync();
            return Ok(svc);
        }

        [HttpPost("providers")]
        public async Task<IActionResult> UpsertProvider(Provider p)
        {
            var existing = await _context.Providers.FindAsync(p.Id);

            if (existing is null)
            {
                _context.Providers.Add(p);
            }
            else
            {
                existing.Name = p.Name;
                existing.AvatarUrl = p.AvatarUrl;
                existing.Rating = p.Rating;
                existing.Tags = p.Tags;
                existing.ServicesOffered = p.ServicesOffered;
            }

            await _context.SaveChangesAsync();
            return Ok(p);
        }

        private async Task SeedCatalogIfEmptyAsync()
        {
            var hasChanges = false;

            if (!await _context.ServiceCategories.AnyAsync())
            {
                _context.ServiceCategories.AddRange(CatalogData.Categories);
                hasChanges = true;
            }

            if (!await _context.ServiceItems.AnyAsync())
            {
                _context.ServiceItems.AddRange(CatalogData.Services);
                hasChanges = true;
            }

            if (!await _context.Providers.AnyAsync())
            {
                _context.Providers.AddRange(CatalogData.Providers);
                hasChanges = true;
            }

            if (hasChanges)
            {
                await _context.SaveChangesAsync();
            }
        }
    }
}

