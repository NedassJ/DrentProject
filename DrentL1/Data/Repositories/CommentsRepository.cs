using DrentL1.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace DrentL1.Data.Repositories
{
    public class CommentsRepository : ICommentsRepository
    {
        private readonly SystemDbContext _systemDbContext;

        public CommentsRepository(SystemDbContext systemDbContext)
        {
            _systemDbContext = systemDbContext;
        }

        public async Task<Comment?> GetAsync(int warehouseId, int itemId, int commentId)
        {
            return await _systemDbContext.Comments.FirstOrDefaultAsync(o => o.ItemId == itemId && o.WarehouseId == warehouseId && o.Id == commentId);
        }

        public async Task<List<Comment>> GetAsync(int warehouseId, int itemId)
        {
            return await _systemDbContext.Comments.Where(o => o.ItemId == itemId && o.WarehouseId == warehouseId).ToListAsync();
        }

        public async Task InsertAsync(Comment comment)
        {
            _systemDbContext.Comments.Add(comment);
            await _systemDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Comment comment)
        {
            _systemDbContext.Comments.Update(comment);
            await _systemDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Comment comment)
        {
            _systemDbContext.Comments.Remove(comment);
            await _systemDbContext.SaveChangesAsync();
        }
    }
}
