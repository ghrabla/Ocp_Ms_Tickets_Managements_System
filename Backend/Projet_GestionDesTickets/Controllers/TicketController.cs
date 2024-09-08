using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projet_GestionDesTickets.Model;

namespace Projet_GestionDesTickets.Controllers
{
    [Route("Tickets")]
    [ApiController]
    public class TicketController : ControllerBase
    {
        private readonly MyContext db;
        public TicketController(MyContext db)
        {
            this.db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets()
        {
            var Tickets = await db.Tickets.ToListAsync();
            return Ok(Tickets);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTickets(int id)
        {
            var t = await db.Tickets.SingleOrDefaultAsync(x => x.Id == id);
            if (t == null)
            {
                return NotFound($"{id} This ticket is not found ");
            }
            return Ok(t);
        }
        [HttpPost]
        public async Task<IActionResult> AddTickets(Ticket t)
        {
            Random random = new Random();
            int refAleatoire = random.Next(0, 100000);
            var ticket = new Ticket
            {
                Titre = t.Titre,
                Description = t.Description,
                Priorite = t.Priorite,
                DateLimite = t.DateLimite,
                Statut = t.Statut,
                Ref = refAleatoire,
            };
            await db.Tickets.AddAsync(ticket);
            db.SaveChanges();
            return Ok(ticket);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTickets(int id, Ticket t)
        {
            var a = await db.Tickets.FindAsync(id);
            if (a == null)
            {
                return NotFound($"This Ticket {id} does not exist");
            }
            if (id != t.Id)
            {
                return BadRequest();
            }
            a.Id = id;
            a.Titre = t.Titre;
            a.Description = t.Description;
            a.Priorite = t.Priorite;
            a.DateLimite = t.DateLimite;
            a.Statut = t.Statut;
            db.SaveChanges();
            return Ok(a);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItems(int id)
        {
            var t = await db.Tickets.SingleOrDefaultAsync(x => x.Id == id);
            if (t == null)
            {
                return NotFound($"This ticket {id} does not exist");
            }
            db.Tickets.Remove(t);
            db.SaveChanges();
            return Ok(t);
        }
    }
}
