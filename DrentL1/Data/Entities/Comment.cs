using DrentL1.Auth.Model;
using System.ComponentModel.DataAnnotations;
using DrentL1.Data.Dtos.Auth;

namespace DrentL1.Data.Entities
{
    public class Comment : IUserOwnedResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime CreationDate { get; set; }
        public int ItemId { get; set; }
        public int WarehouseId { get; set; }
        public Item? Item { get; set; }

        [Required]
        //public string? UserId { get; set; }

        public SystemUser User { get; set; }


    }
}
