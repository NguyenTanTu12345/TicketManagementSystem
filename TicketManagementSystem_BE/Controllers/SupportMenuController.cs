using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportMenuController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public SupportMenuController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupportMenu>>> GetAll()
        {
            if (_context.SupportMenus == null)
            {
                return NotFound();
            }
            return await _context.SupportMenus.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupportMenu>> Get(string id)
        {
            SupportMenu supportMenu = await _context.SupportMenus.FindAsync(id);
            if (supportMenu == null)
            {
                return NotFound();
            }
            return supportMenu;
        }

        [HttpPost]
        public async Task<ActionResult> Create(SupportMenu supportMenu)
        {
            await _context.SupportMenus.AddAsync(supportMenu);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = supportMenu.SupportMenuId }, supportMenu);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(SupportMenu supportMenu)
        {
            _context.Entry(supportMenu).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = supportMenu.SupportMenuId }, supportMenu);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            SupportMenu supportMenu = await _context.SupportMenus.FindAsync(id);
            if (supportMenu == null)
            {
                return NotFound();
            }
            _context.SupportMenus.Remove(supportMenu);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
