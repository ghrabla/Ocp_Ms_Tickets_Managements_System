using System.ComponentModel.DataAnnotations;

namespace Projet_GestionDesTickets.Model
{
    public class Ticket
    {
        public int Id { get; set; }
        [Required]
        public string Titre { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Priorite { get; set; }
        [Required]
        public DateOnly DateLimite { get; set; }
        [Required]
        public string Statut { get; set; }
        public int? Ref { get; set; }
    }
}
