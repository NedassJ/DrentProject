using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DrentL1.Data.Dtos.Auth;
using DrentL1.Data.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DrentL1.Data
{
    public class SystemDbContext : IdentityDbContext<SystemUser>
    {
        public DbSet<Warehouse> Warehouses { get; set; }
        public DbSet<Item> Items { get; set; }

        public DbSet<Comment> Comments { get; set; }
        public DbSet<RefreshToken> RefreshToken {get; set;}

        protected readonly IConfiguration Configuration;

        public SystemDbContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=DRent1");
            //optionsBuilder.UseSqlServer("Server=tcp:autoaukcionasdbserver.database.windows.net,1433;Initial Catalog=AutoAukcionas_db;Persist Security Info=False;User ID=justas;Password=SuperDuperSeceretPassword123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //optionsBuilder.UseSqlServer(Configuration.GetConnectionString("MyDbConnection"));

            var connectionString = Configuration.GetConnectionString("WebApiDatabase");
            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}
