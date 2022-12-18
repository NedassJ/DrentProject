using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Entities
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Refreshtoken { get; set; }
    }
}
