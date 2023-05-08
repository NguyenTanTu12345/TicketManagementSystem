using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketManagementSystem.Data;
using TicketManagementSystem.Models;

namespace TicketManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public ProgramController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Program>>> GetAll()
        {
            if (_context.Programs == null)
            {
                return NotFound();
            }
            return await _context.Programs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Models.Program>> Get(string id)
        {
            Models.Program program = await _context.Programs.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }
            return program;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Models.Program program)
        {
            await _context.Programs.AddAsync(program);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = program.ProgramId }, program);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(Models.Program program)
        {
            _context.Entry(program).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = program.ProgramId }, program);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            Models.Program program = await _context.Programs.FindAsync(id);
            if (program == null)
            {
                return NotFound();
            }
            _context.Programs.Remove(program);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
