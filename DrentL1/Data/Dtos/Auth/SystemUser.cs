using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data.Dtos.Auth
{
    public class SystemUser : IdentityUser
    {
        [PersonalData]
        public string Name { get; set; }
        public string Surname { get; set; }

    }
}
