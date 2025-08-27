using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using gptgigapi.Services;
using Microsoft.AspNetCore.Authorization;
using gptgigapi.Data;
using gptgigapi.Models;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly INotificationService _notificationService;
        private readonly ApplicationDbContext _context;

        public AuthController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IConfiguration configuration, INotificationService notificationService, ApplicationDbContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _notificationService = notificationService;
            _context = context;
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            var user = new IdentityUser { UserName = dto.Email, Email = dto.Email, PhoneNumber = dto.PhoneNumber };
            var result = await _userManager.CreateAsync(user, dto.Password);
            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }
            await _notificationService.SendEmailAsync(dto.Email, "Welcome", "Thank you for registering!");
            if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
            {
                await _notificationService.SendSmsAsync(dto.PhoneNumber, "Thank you for registering!");
            }
            if (!string.IsNullOrWhiteSpace(dto.VendorName))
            {
                var vendor = new VendorProfile { Name = dto.VendorName, UserId = user.Id };
                _context.VendorProfiles.Add(vendor);
                await _context.SaveChangesAsync();
            }
            return Ok();
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _userManager.FindByEmailAsync(dto.Email);
            if (user == null)
            {
                return Unauthorized();
            }
            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded)
            {
                return Unauthorized();
            }

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                new Claim(JwtRegisteredClaimNames.Email, user.Email!)
            };
            var token = GenerateToken(claims);
            return Ok(new { token });
        }

        private string GenerateToken(IEnumerable<Claim> claims)
        {
            var jwt = _configuration.GetSection("Jwt");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: jwt["Issuer"],
                audience: jwt["Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    public record RegisterDto(string Email, string Password, string? PhoneNumber, string? VendorName);
    public record LoginDto(string Email, string Password);
}
