using DrentL1.Data.Dtos.Auth;
using DrentL1.Data.Dtos.Comments;
using DrentL1.Data.Dtos.Warehouses;
using DrentL1.Data.Dtos.Items;
using DrentL1.Data.Entities;
using AutoMapper;

namespace DrentL1.Data
{
    public class AuctionProfile : Profile
    {
        public AuctionProfile()
        {
            CreateMap<Warehouse, WarehouseDto>();
            CreateMap<CreateWarehouseDto, Warehouse>();
            CreateMap<UpdateWarehouseDto, Warehouse>();

            CreateMap<CreateItemDto, Item>();
            CreateMap<UpdateItemDto, Item>();
            CreateMap<Item, ItemDto>();

            CreateMap<CreateCommentDto, Comment>();
            CreateMap<UpdateCommentDto, Comment>();
            CreateMap<Comment, CommentDto>();
            CreateMap<SystemUser, UserDto>();
        }
    }
}
