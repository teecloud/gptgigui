using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gptgigapi.Data;
using gptgigapi.Models;
using System.Security.Claims;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VendorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VendorsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IEnumerable<VendorProfile>> Get([FromQuery] string? q)
        {
            var query = _context.VendorProfiles.AsQueryable();
            if (!string.IsNullOrWhiteSpace(q))
            {
                query = query.Where(v => v.Name.Contains(q));
            }
            return await query.ToListAsync();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<VendorProfile>> Post([FromBody] VendorCreateDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var vendor = new VendorProfile { Name = dto.Name, UserId = userId };
            _context.VendorProfiles.Add(vendor);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = vendor.Id }, vendor);
        }
    }

    public record VendorCreateDto(string Name);
}
