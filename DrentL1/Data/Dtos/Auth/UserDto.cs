using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Dtos.Auth
{
    public record UserDto(string Id, string Username, string Email, string Name, string Surname);
}
