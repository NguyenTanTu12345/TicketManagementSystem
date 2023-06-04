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
    [Route("api/news")]
    [ApiController]
    public class NewsController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;
        private readonly INewID _newID;
        private readonly IPrincipal _principal;
        private readonly IConfiguration _configuration;

        public NewsController(TicketManagementSystemContext context, INewID newID,
            IPrincipal principal, IConfiguration configuration)
        {
            _context = context;
            _newID = newID;
            _principal = principal;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetAll()
        {
            if (_context.News == null)
            {
                return NotFound(new { message = "Resources Not Found!!!" });
            }
            return await _context.News.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<News>> Get(string id)
        {
            var news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            return news;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<ActionResult> Create(NewsDTO newsDTO)
        {
            if (newsDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(newsDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            List<string> listID = await _context.News.Select(s => s.NewsId).ToListAsync();
            News news = new News
            {
                NewsId = _newID.CreateNewsID(listID),
                NewsContent = newsDTO.NewsContent,
                NewsDate = newsDTO.NewsDate,
                NewsImagePath = newsDTO.NewsImagePath,
                NewsTitle = newsDTO.NewsTitle
            };
            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPost("create-range")]
        public async Task<IActionResult> CreateRange(List<News> news)
        {
            await _context.News.AddRangeAsync(news);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Create Successful~" });
        }

        [Authorize]
        [HttpPut("update")]
        public async Task<ActionResult> Edit(NewsDTO newsDTO)
        {
            if (newsDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(newsDTO.AccessToken, _configuration["JWT:SecretKey"]);
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
            var news = await _context.News.FindAsync(newsDTO.NewsId);
            if (news == null)
            {
                return NotFound(new { message = "Resource Not Found!!!" });
            }
            news.NewsContent = newsDTO.NewsContent;
            news.NewsDate = newsDTO.NewsDate;
            news.NewsImagePath = newsDTO.NewsImagePath;
            news.NewsTitle = newsDTO.NewsTitle;
            _context.News.Update(news);
            await _context.SaveChangesAsync();
            return Ok(new { message = "Update Successful~" });
        }

        [Authorize]
        [HttpPost("user-like")]
        public async Task<ActionResult> UserLike(NewsDTO newsDTO)
        {
            if (newsDTO == null)
            {
                return BadRequest(new { meassage = "Invalid Request!!!" });
            }
            var principal = _principal.GetPrincipal(newsDTO.AccessToken, _configuration["JWT:SecretKey"]);
            var userMail = principal.FindFirst(ClaimTypes.Email)?.Value;
            var user = await _context.Users.FirstOrDefaultAsync(s => s.Mail.Trim() == userMail);
            if (user == null)
            {
                return NotFound(new { meassage = "User Not Found!!!" });
            }
            var userLikeNews = await _context.UserLikeNews.FirstOrDefaultAsync(s => s.UserId == user.UserId 
                && s.NewsId ==  newsDTO.NewsId);
            if (userLikeNews != null)
            {
                _context.UserLikeNews.Remove(userLikeNews);
                await _context.SaveChangesAsync();
                return Ok(new { message = "DisLike Successful~" });
            }
            else
            {
                UserLikeNews userLikeNews1 = new UserLikeNews
                {
                    NewsId = newsDTO.NewsId,
                    UserId = user.UserId
                };
                await _context.UserLikeNews.AddAsync(userLikeNews1);
                await _context.SaveChangesAsync();
                return Ok(new { message = "Like Successful~" });
            }    
        }
    }
}
