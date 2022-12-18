namespace DrentL1.Data.Dtos.Warehouses
{
    public record WarehouseDto(int Id, string Name, string Description, DateTime CreationDate);
    public record CreateWarehouseDto(string Name, string Description);
    public record UpdateWarehouseDto(string Description);

}
