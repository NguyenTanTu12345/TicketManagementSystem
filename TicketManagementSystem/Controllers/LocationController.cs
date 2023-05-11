﻿using Microsoft.AspNetCore.Authorization;
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
    public class LocationController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public LocationController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetAll()
        {
            if (_context.Locations == null)
            {
                return NotFound();
            }
            return await _context.Locations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> Get(string id)
        {
            Location location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }
            return location;
        }

        [HttpPost]
        public async Task<ActionResult> Create(Location location)
        {
            await _context.Locations.AddAsync(location);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = location.LocationId }, location);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(Location location)
        {
            _context.Entry(location).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = location.LocationId }, location);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            Location location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }
            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
