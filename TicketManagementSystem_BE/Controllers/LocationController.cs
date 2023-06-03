﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Security.Claims;
using TicketManagementSystem_BE.Data;
using TicketManagementSystem_BE.DTO;
using TicketManagementSystem_BE.Helpers;
using TicketManagementSystem_BE.Models;

namespace TicketManagementSystem_BE.Controllers
{
    [EnableCors("myOrigins")]
    [Route("api/location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
       /* private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public LocationController(TicketManagementSystemContext context, INewID newID,
            IPrincipal principal, IConfiguration configuration)
        {
            _context = context;
            _newID = newID;
            _principal = principal;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetAll()
        {
            if (_context.Locations == null)
            {
                return NotFound(new {message = "Resources Not Found!!!" });
            }
            return await _context.Locations.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> Get(string id)
        {
            var locations = await _context.Locations.FindAsync(id);
            if (locations == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            return locations;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(LocationDTO locationDTO)
        {
            if (locationDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(locationDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            if (user.RoleId.Trim() != "RO01")
            {
                return BadRequest(new { message = "You Aren't Allowed to Do This Action" });
            }
            List<string> listID = await _context.Locations.Select(s => s.LocationId).ToListAsync();
            Location location = new Location
            {
                LocationId = _newID.CreateLocationID(listID),
                LocationName = locationDTO.LocationName,
                LocationSummary = locationDTO.LocationSummary,
                LocationContent = locationDTO.LocationContent,
                LocationImagePath = locationDTO.LocationImagePath,
                LocationTypeId = locationDTO.LocationTypeId
            };
            await _context.Locations.AddAsync(location);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPost("create-range")]
        public async Task<IActionResult> CreateRange(List<Location> locations)
        {
            await _context.Locations.AddRangeAsync(locations);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Edit(LocationDTO locationDTO)
        {
            if (locationDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(locationDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            if (user.RoleId.Trim() != "RO01")
            {
                return BadRequest(new { message = "You Aren't Allowed to Do This Action" });
            }
            var location = await _context.Locations.FindAsync(locationDTO.LocationId);
            if (location  == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            location.LocationName = locationDTO.LocationName;
            location.LocationSummary = locationDTO.LocationSummary;
            location.LocationContent = locationDTO.LocationContent;
            location.LocationImagePath = locationDTO.LocationImagePath;
            location.LocationTypeId = locationDTO.LocationTypeId;
            _context.Locations.Update(location);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }*/
    }
}
