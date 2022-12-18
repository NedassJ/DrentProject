using AutoMapper;
using DrentL1.Data.Dtos.Warehouses;
using DrentL1.Data.Dtos.Items;
using DrentL1.Data.Entities;
using DrentL1.Auth.Model;
using DrentL1.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using System.Data;

namespace DrentL1.Controllers
{
    /*
     *
    /api/v1/warehouses/{warehouseId}/items GET List 200
    /api/v1/warehouses/{warehouseId}/items/{itemId} GET One 200
    /api/v1/warehouses/{warehouseId}/items POST Create 201
    /api/v1/warehouses/{warehouseId}/items/{itemId} PUT/PATCH Modify 200
    /api/v1/warehouses/{warehouseId}/items/{itemId} DELETE Remove 200/204

     */

    [ApiController]
    [Route("api/warehouses/{warehouseId}/items")]
    public class ItemsController : ControllerBase
    {
        private readonly IWarehousesRepository _warehousesRepository;
        private readonly IMapper _mapper;
        private readonly IItemsRepository _itemsRepository;
        private readonly IAuthorizationService _authorizationService;

        public ItemsController(IItemsRepository itemsRepository, IMapper mapper, IWarehousesRepository warehousesRepository, IAuthorizationService authorizationService)
        {
            _itemsRepository = itemsRepository;
            _mapper = mapper;
            _warehousesRepository = warehousesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<ItemDto>> GetAllAsync(int warehouseId)
        {
            var warehouses = await _itemsRepository.GetAsync(warehouseId);
            return warehouses.Select(o => _mapper.Map<ItemDto>(o));
        }

        // /api/warehouses/1/items/2
        [HttpGet("{itemId}")]
        public async Task<ActionResult<ItemDto>> GetAsync(int warehouseId, int itemId)
        {
            var warehouse = await _itemsRepository.GetAsync(warehouseId, itemId);
            if (warehouse == null) return NotFound();

            return Ok(_mapper.Map<ItemDto>(warehouse));
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<ItemDto>> PostAsync(int warehouseId, CreateItemDto itemDto)
        {
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);
            if (warehouse == null) return NotFound($"Couldn't find a topic with id of {warehouseId}");

            //var item = _mapper.Map<Item>(itemDto);
            var item = new Item { Name = itemDto.Name, Description = itemDto.Description, Price = itemDto.Price, CreationDate = DateTime.UtcNow, Term = itemDto.Term, UserId = User.Claims.Where(c => c.Type == "userId").Single().Value };
            item.WarehouseId = warehouseId;
            await _itemsRepository.InsertAsync(item);
            return Created($"/api/warehouses/{warehouseId}/items/{item.Id}", _mapper.Map<ItemDto>(item));
        }

        [HttpPut("{itemId}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<ItemDto>> PostAsync(int warehouseId, int itemId, UpdateItemDto itemDto)
        {
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);
            if (warehouse == null) return NotFound($"Couldn't find a topic with id of {warehouseId}");

            var oldItem = await _itemsRepository.GetAsync(warehouseId, itemId);
            if (oldItem == null)
                return NotFound();


            //oldPost.Body = postDto.Body;
            _mapper.Map(itemDto, oldItem);

            await _itemsRepository.UpdateAsync(oldItem);

            return Ok(_mapper.Map<ItemDto>(oldItem));
        }

        [HttpDelete("{itemId}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult> DeleteAsync(int warehouseId, int itemId)
        {
            var item = await _itemsRepository.GetAsync(warehouseId, itemId);
            if (item == null)
                return NotFound();

            await _itemsRepository.DeleteAsync(item);

            // 204
            return NoContent();
        }
    }
}
