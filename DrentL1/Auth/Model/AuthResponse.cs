﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Auth.Model
{
    public class AuthResponse
    {
        public string JWTToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
