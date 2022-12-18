using DrentL1.Data.Entities;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;

namespace DrentL1.Data.Repositories
{
    public class ItemsRepository : IItemsRepository
    {
        private readonly SystemDbContext _systemDbContext;

        public ItemsRepository(SystemDbContext systemDbContext)
        {
            _systemDbContext = systemDbContext;
        }

        public async Task<Item?> GetAsync(int warehouseId, int itemId)
        {
            return await _systemDbContext.Items.FirstOrDefaultAsync(o => o.WarehouseId == warehouseId && o.Id == itemId);
        }

        public async Task<List<Item>> GetAsync(int warehouseId)
        {
            return await _systemDbContext.Items.Where(o => o.WarehouseId == warehouseId).ToListAsync();
        }

        public async Task InsertAsync(Item item)
        {
            _systemDbContext.Items.Add(item);
            await _systemDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Item item)
        {
            _systemDbContext.Items.Update(item);
            await _systemDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Item item)
        {
            _systemDbContext.Items.Remove(item);
            await _systemDbContext.SaveChangesAsync();
        }
    }
}
