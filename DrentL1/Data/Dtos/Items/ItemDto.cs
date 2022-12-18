namespace DrentL1.Data.Dtos.Items
{
    public record ItemDto(int Id, string Name, string Description, double Price, DateTime CreationDate, int Term);
    public record CreateItemDto(string Name, string Description, double Price, DateTime CreationDate, int Term);
    public record UpdateItemDto(string Description);
}
