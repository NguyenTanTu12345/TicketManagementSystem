using Microsoft.AspNetCore.Authorization;
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
    [Route("api/location-type")]
    [ApiController]
    public class LocationTypeController : ControllerBase
    {
        /*private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public LocationTypeController(TicketManagementSystemContext context, INewID newID, 
            IPrincipal principal, IConfiguration configuration)
        {
            _context = context;
            _newID = newID;
            _principal = principal;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocationType>>> GetAll()
        {
            if (_context.LocationTypes == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            return await _context.LocationTypes.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocationType>> Get(string id)
        {
            var locationType = await _context.LocationTypes.FindAsync(id);
            if (locationType == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            return locationType;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(LocationTypeDTO locationTypeDTO)
        {
            if (locationTypeDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(locationTypeDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            List<string> listID = await _context.LocationTypes.Select(s => s.LocationTypeId).ToListAsync();
            LocationType locationType = new LocationType
            {
                LocationTypeId = _newID.CreateLocationTypeID(listID),
                LocationTypeName = locationTypeDTO.LocationTypeName,
                LocationTypePath = locationTypeDTO.LocationTypePath
            };
            await _context.LocationTypes.AddAsync(locationType);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPost("create-range")]
        public async Task<IActionResult> CreateRange(List<LocationType> locationTypes)
        {
            await _context.LocationTypes.AddRangeAsync(locationTypes);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Edit(LocationTypeDTO locationTypeDTO)
        {
            if (locationTypeDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(locationTypeDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            var locationType = await _context.LocationTypes.FindAsync(locationTypeDTO.LocationTypeId);
            if (locationType == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            locationType.LocationTypeName = locationTypeDTO.LocationTypeName;
            locationType.LocationTypePath = locationTypeDTO.LocationTypePath;
            _context.LocationTypes.Update(locationType);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }*/
    }
}
