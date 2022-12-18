using DrentL1.Auth.Model;
using DrentL1.Data.Dtos.Auth;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DrentL1.Data
{
    public class DatabaseSeeder
    {
        private readonly UserManager<SystemUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        public DatabaseSeeder(UserManager<SystemUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            foreach (var role in UserRoles.All)
            {
                var roleExist = await _roleManager.RoleExistsAsync(role);
                if(!roleExist)
                {
                    await _roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            var newAdmin = new SystemUser 
            { 
                UserName = "nedjan1",
                Email = "nedjan1@nedjan1.lt",
                Name = "Nedas",
                Surname = "Janonis"
            };

            var existingAdmin = await _userManager.FindByEmailAsync(newAdmin.Email);
            if(existingAdmin == null)
            {
                var createAdmin = await _userManager.CreateAsync(newAdmin, "Password123!");
                if(createAdmin.Succeeded)
                {
                    await _userManager.AddToRolesAsync(newAdmin, UserRoles.All);
                }
            }    
        }
    }
}
