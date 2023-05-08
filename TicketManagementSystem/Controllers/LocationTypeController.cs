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
    public class LocationTypeController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public LocationTypeController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationType>>> GetAll()
        {
            if (_context.LocationTypes == null)
            {
                return NotFound();
            }
            return await _context.LocationTypes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocationType>> Get(string id)
        {
            LocationType locationType = await _context.LocationTypes.FindAsync(id);
            if (locationType == null)
            {
                return NotFound();
            }
            return locationType;
        }

        [HttpPost]
        public async Task<ActionResult> Create(LocationType locationType)
        {
            await _context.LocationTypes.AddAsync(locationType);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = locationType.LocationTypeId }, locationType);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(LocationType locationType)
        {
            _context.Entry(locationType).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = locationType.LocationTypeId }, locationType);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            LocationType locationType = await _context.LocationTypes.FindAsync(id);
            if (locationType == null)
            {
                return NotFound();
            }
            _context.LocationTypes.Remove(locationType);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}

