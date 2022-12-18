using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Dtos.Auth
{
    public record LoginDto([Required]string username, [Required]string Password);
}
