using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Dtos.Auth
{
    public record LoggedInDto(string AccesToken, string RefreshToken, List<string> roles, string username, string userid);
}
