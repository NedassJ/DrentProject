using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Auth.Model
{
    public class UserRoles
    {
        public const string Admin = nameof(Admin);
        public const string SystemUser = nameof(SystemUser);

        public static readonly IReadOnlyCollection<string> All = new[] { Admin, SystemUser};
    }
}
