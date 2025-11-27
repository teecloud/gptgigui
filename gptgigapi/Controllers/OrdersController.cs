using System;
using System.Collections.Generic;
using gptgigapi.Data;
using gptgigapi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrdersController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            var orders = await _context.Orders
                .AsNoTracking()
                .OrderByDescending(o => o.CreatedAt)
                .ToListAsync();

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.AsNoTracking().FirstOrDefaultAsync(o => o.Id == id);
            if (order is null)
            {
                return NotFound();
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderRequest request)
        {
            var order = new Order
            {
                ServiceItemId = request.ServiceItemId,
                ServiceTitle = request.ServiceTitle,
                ServiceImageUrl = request.ServiceImageUrl,
                Amount = request.Amount,
                Currency = request.Currency,
                PaymentIntentId = request.PaymentIntentId,
                PaymentMethodType = request.PaymentMethodType,
                PaymentStatus = request.PaymentStatus ?? "succeeded",
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                ScheduledSlot = request.ScheduledSlot,
                CreatedAt = DateTime.UtcNow,
            };

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, order);
        }
    }

    public record CreateOrderRequest(
        string ServiceItemId,
        string ServiceTitle,
        string? ServiceImageUrl,
        decimal Amount,
        string Currency,
        string PaymentIntentId,
        string? PaymentMethodType,
        string? PaymentStatus,
        string? CustomerName,
        string? CustomerEmail,
        string? ScheduledSlot
    );
}
