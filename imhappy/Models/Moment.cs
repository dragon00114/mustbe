using System;
using System.ComponentModel.DataAnnotations;

namespace imhappy.Models
{
    public class Moment
    {
        public int Id { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Entry { get; set; }

        public int StickerId { get; set; }

        public Sticker Sticker { get; set; }

        public bool IsDeleted { get; set; }

        public bool IsSignificant { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile UserProfile { get; set; }
    }
}
