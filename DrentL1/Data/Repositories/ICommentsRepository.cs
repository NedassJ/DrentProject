using DrentL1.Data.Entities;

namespace DrentL1.Data.Repositories
{
    public interface ICommentsRepository
    {
        Task<Comment> GetAsync(int warehouseId, int itemId, int commentId);
        Task<List<Comment>> GetAsync(int warehouseId, int itemId);
        Task InsertAsync(Comment comment);
        Task UpdateAsync(Comment comment);
        Task DeleteAsync(Comment comment);
    }
}
