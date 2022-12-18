using DrentL1.Data.Entities;
using Microsoft.Extensions.Hosting;

namespace DrentL1.Data.Repositories
{
    public interface IItemsRepository
    {
        Task<Item> GetAsync(int warehouseId, int itemId);
        Task<List<Item>> GetAsync(int warehouseId);
        Task InsertAsync(Item item);
        Task UpdateAsync(Item item);
        Task DeleteAsync(Item item);
    }
}
