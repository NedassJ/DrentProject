using DrentL1.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DrentL1.Data.Repositories
{
    public class WarehousesRepository : IWarehousesRepository
    {
        private readonly SystemDbContext _systemDbContext;
        public WarehousesRepository(SystemDbContext systemDbContext)
        {
            _systemDbContext = systemDbContext;
        }
        public async Task<Warehouse?> GetAsync(int warehouseId)
        {
            return await _systemDbContext.Warehouses.FirstOrDefaultAsync(o => o.Id == warehouseId);
        }
        public async Task<IReadOnlyList<Warehouse>> GetManyAsync()
        {
            return await _systemDbContext.Warehouses.ToListAsync();
        }
        public async Task CreateAsync(Warehouse warehouse)
        {
            _systemDbContext.Warehouses.Add(warehouse);
            await _systemDbContext.SaveChangesAsync();
        }
        public async Task UpdateAsync(Warehouse warehouse)
        {
            _systemDbContext.Warehouses.Update(warehouse);
            await _systemDbContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(Warehouse warehouse)
        {
            _systemDbContext.Warehouses.Remove(warehouse);
            await _systemDbContext.SaveChangesAsync();
        }
    }
}
