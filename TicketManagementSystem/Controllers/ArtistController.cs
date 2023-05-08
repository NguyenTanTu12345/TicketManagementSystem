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
    public class ArtistController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public ArtistController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artist>>> GetAll()
        {
            if (_context.Artists == null)
            {
                return NotFound();
            }
            return await _context.Artists.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> Get(string id)
        {
            Artist artist = await _context.Artists.FindAsync(id);
            if (artist == null)
            {
                return NotFound();
            }
            return artist;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Artist artist)
        {
            await _context.Artists.AddAsync(artist);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = artist.ArtistId }, artist);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(Artist artist)
        {
            _context.Entry(artist).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = artist.ArtistId }, artist);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            Artist artist = await _context.Artists.FindAsync(id);
            if (artist == null)
            {
                return NotFound();
            }
            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
