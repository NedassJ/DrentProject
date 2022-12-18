using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Dtos.Auth
{
    public record RefreshTokenDto(string JwtToken, string RefreshToken);
}
