using DrentL1.Data.Entities;

namespace DrentL1.Data.Repositories
{
    public interface IWarehousesRepository
    {
        Task CreateAsync(Warehouse warehouse);
        Task DeleteAsync(Warehouse warehouse);
        Task<Warehouse?> GetAsync(int warehouseId);
        Task<IReadOnlyList<Warehouse>> GetManyAsync();
        Task UpdateAsync(Warehouse warehouse);
    }
}