using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using gptgigapi.Data;
using gptgigapi.Models;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MessagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}/{otherUserId}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessages(string userId, string otherUserId)
        {
            var messages = await _context.Messages
                .Where(m => (m.SenderId == userId && m.RecipientId == otherUserId)
                         || (m.SenderId == otherUserId && m.RecipientId == userId))
                .OrderBy(m => m.Timestamp)
                .ToListAsync();
            return messages;
        }

        [HttpPost]
        public async Task<ActionResult<Message>> SendMessage(Message message)
        {
            message.Timestamp = System.DateTime.UtcNow;
            _context.Messages.Add(message);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetMessages), new { userId = message.SenderId, otherUserId = message.RecipientId }, message);
        }

        [HttpPost("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }
            message.IsRead = true;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
