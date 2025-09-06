using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using gptgigapi.Data;
using gptgigapi.Models;
using gptgigapi.Services;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BusinessRegistrationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBusinessRegistrationService _service;

        public BusinessRegistrationsController(ApplicationDbContext context, IBusinessRegistrationService service)
        {
            _context = context;
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<BusinessRegistration>> Get()
        {
            return await _context.BusinessRegistrations.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<BusinessRegistration>> Post([FromBody] BusinessRegistration registration)
        {
            _context.BusinessRegistrations.Add(registration);
            await _context.SaveChangesAsync();
            await _service.ProcessAsync(registration);
            return CreatedAtAction(nameof(Get), new { id = registration.Id }, registration);
        }
    }
}
