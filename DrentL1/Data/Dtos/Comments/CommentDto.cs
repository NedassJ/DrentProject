namespace DrentL1.Data.Dtos.Comments
{
    public record CommentDto(int Id, string Name, string Description, DateTime CreationDate);
    public record CreateCommentDto(string Name, string Description, DateTime CreationDate);
    public record UpdateCommentDto(string Description);
}
