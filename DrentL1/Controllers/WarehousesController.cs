using DrentL1.Data;
using System.Text.Json;
using DrentL1.Data.Dtos.Warehouses;
using DrentL1.Auth.Model;
using DrentL1.Data.Entities;
using DrentL1.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;

namespace DrentL1.Controllers
{

    /* 
    /api/v1/warehouses GET List 200
    /api/v1/warehouses/{id} GET One 200
    /api/v1/warehouses POST Create 201
    /api/v1/warehouses/{id} PUT/PATCH Modify 200
    /api/v1/warehouses/{id} DELETE Remove 200/204
    */


    [ApiController]
    [Route("api/warehouses")]

    public class WarehousesController : ControllerBase
    {
        private readonly IWarehousesRepository _warehousesRepository;
        private readonly IAuthorizationService _authorizationService;
        public WarehousesController(IWarehousesRepository warehousesRepository, IAuthorizationService authorizationService)
        {
            _warehousesRepository = warehousesRepository;
            _authorizationService = authorizationService;
        }
        [HttpGet]
        public async Task<IEnumerable<WarehouseDto>> GetMany()
        {
            var warehouses = await _warehousesRepository.GetManyAsync();
            return warehouses.Select(o => new WarehouseDto(o.Id, o.Name, o.Description, o.CreationDate));
        }

        [HttpGet]
        [Route("{warehouseId}", Name = "GetWarehouse")]
        public async Task<ActionResult<WarehouseDto>> Get(int warehouseId)
        {
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);

            if (warehouse == null)
                return NotFound();

            return new WarehouseDto(warehouse.Id, warehouse.Name, warehouse.Description, warehouse.CreationDate);
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<WarehouseDto>> Create(CreateWarehouseDto createWarehouseDto)
        {
            var warehouse = new Warehouse 
            { 
                Name = createWarehouseDto.Name, 
                Description = createWarehouseDto.Description, 
                CreationDate = DateTime.UtcNow,
                UserId = User.Claims.Where(c => c.Type == "userId").Single().Value
            // UserId = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
        };

            await _warehousesRepository.CreateAsync(warehouse);

            return Created("", new WarehouseDto(warehouse.Id, warehouse.Name, warehouse.Description, warehouse.CreationDate));
            //return CreatedAtAction("GetOrder", new { orderId = order.Id }, new OrderDto(order.Name, order.Description, order.CreationDate));
        }
        [HttpPut]
        [Route("{warehouseId}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<WarehouseDto>> Update(int warehouseId, UpdateWarehouseDto updateWarehouseDto)
        {
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);

            // 404
            if (warehouse == null)
                return NotFound();

            //var authorizationResult = await _authorizationService.AuthorizeAsync(User, warehouse, PolicyNames.ResourceOwner);
            //if (!authorizationResult.Succeeded)
            //{
            //    // 404
            //    return Forbid();
            //}

            warehouse.Description = updateWarehouseDto.Description;
            //warehouse.PricePerDay = updateWarehouseDto.PricePerDay;
            await _warehousesRepository.UpdateAsync(warehouse);

            return Ok(new WarehouseDto(warehouse.Id, warehouse.Name, warehouse.Description, warehouse.CreationDate));
        }
        [HttpDelete]
        [Route("{warehouseId}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult> Remove(int warehouseId)
        {
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);

            // 404
            if (warehouse == null)
                return NotFound();

            await _warehousesRepository.DeleteAsync(warehouse);


            // 204
            return NoContent();
        }
    }
}
