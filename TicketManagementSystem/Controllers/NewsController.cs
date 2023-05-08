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
    public class NewsController : ControllerBase
    {
        private readonly TicketManagementSystemContext _context;

        public NewsController(TicketManagementSystemContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> GetAll()
        {
            if (_context.News == null)
            {
                return NotFound();
            }
            return await _context.News.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<News>> Get(string id)
        {
            News news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            return news;
        }

        [HttpPost]
        public async Task<ActionResult> Create(News news)
        {
            await _context.News.AddAsync(news);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = news.NewsId }, news);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(News news)
        {
            _context.Entry(news).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = news.NewsId }, news);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            News news = await _context.News.FindAsync(id);
            if (news == null)
            {
                return NotFound();
            }
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
