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
    [Authorize]
    public class ProfilesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfilesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerProfile>> Get()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var profile = await _context.CustomerProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                return NotFound();
            }
            return profile;
        }

        [HttpPost]
        public async Task<ActionResult<CustomerProfile>> Post([FromBody] ProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var profile = new CustomerProfile { DisplayName = dto.DisplayName, UserId = userId };
            _context.CustomerProfiles.Add(profile);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), profile);
        }

        [HttpPut]
        public async Task<ActionResult<CustomerProfile>> Put([FromBody] ProfileDto dto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var profile = await _context.CustomerProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                return NotFound();
            }
            profile.DisplayName = dto.DisplayName;
            await _context.SaveChangesAsync();
            return profile;
        }

        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
            {
                return Unauthorized();
            }
            var profile = await _context.CustomerProfiles.FirstOrDefaultAsync(p => p.UserId == userId);
            if (profile == null)
            {
                return NotFound();
            }
            _context.CustomerProfiles.Remove(profile);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }

    public record ProfileDto(string DisplayName);
}
