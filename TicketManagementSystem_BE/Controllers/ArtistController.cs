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
    //[EnableCors("myOrigins")]
    [Route("api/artist")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public ArtistController(TicketManagementSystemContext context, INewID newID,
            IPrincipal principal, IConfiguration configuration)
        {
            _context = context;
            _newID = newID;
            _principal = principal;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artist>>> GetAll()
        {
            if (_context.Artists == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            return await _context.Artists.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> Get(string id)
        {
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            return artist;
        }

        [HttpGet("get-by-program/{id}")]
        public async Task<ActionResult<IEnumerable<Artist>>> GetByProgram(string id)
        {
            var programs = await _context.Programs.FindAsync(id);
            if (programs == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            List<Artist> artists = new List<Artist>();
            var show = await _context.Shows.Where(s => s.ProgramId == programs.ProgramId).ToListAsync();
            if (show != null)
            {
                foreach (var item in show)
                {
                    var artist = await _context.Artists.FirstOrDefaultAsync(s => s.ArtistId == item.ArtistId);
                    if (artist != null)
                    {
                        artists.Add(artist);
                    }
                }
            }
            return artists;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(ArtistDTO artistDTO)
        {
            if (artistDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(artistDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            List<string> listID = await _context.Artists.Select(s => s.ArtistId).ToListAsync();
            string artistId = _newID.CreateArtistID(listID);
            Artist artist = new Artist
            {
                ArtistId = artistId,
                ArtistName = artistDTO.ArtistName,
                ArtistImagePath = artistDTO.ArtistImagePath
            };
            await _context.Artists.AddAsync(artist);
            List<string> programIds = artistDTO.ProgramID;
            foreach (var item in programIds)
            {
                if (item != "" || item != null)
                {
                    Show show = new Show
                    {
                        ArtistId = artistId,
                        ProgramId = item
                    };
                    await _context.Shows.AddAsync(show);
                }
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Edit(ArtistDTO artistDTO)
        {
            if (artistDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(artistDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            var artist = await _context.Artists.FindAsync(artistDTO.ArtistId);
            if (artist == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            artist.ArtistName = artistDTO.ArtistName;
            artist.ArtistImagePath = artistDTO.ArtistImagePath;
            _context.Artists.Update(artist);
            var shows = await _context.Shows.Where(s => s.ArtistId == artistDTO.ArtistId).ToListAsync();
            _context.Shows.RemoveRange(shows);
            List<string> programIds = artistDTO.ProgramID;
            foreach (var item in programIds)
            {
                if (item != "" || item != null)
                {
                    Show show = new Show
                    {
                        ArtistId = artist.ArtistId,
                        ProgramId = item
                    };
                    await _context.AddAsync(show);
                }
            }
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }
    }
}
