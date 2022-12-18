using DrentL1.Auth.Model;
using System.ComponentModel.DataAnnotations;
using DrentL1.Data.Dtos.Auth;

namespace DrentL1.Data.Entities
{
    public class Item : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int WarehouseId { get; set; }
        public Warehouse? Warehouse { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsApproved { get; set; }
        public int Term { get; set; }

        [Required]
        //public string? UserId { get; set; }

        public SystemUser User { get; set; }




    }
}
