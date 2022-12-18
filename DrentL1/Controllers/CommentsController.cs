using AutoMapper;
using DrentL1.Data.Dtos.Items;
using DrentL1.Data.Dtos.Comments;
using DrentL1.Data.Entities;
using DrentL1.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.JsonWebTokens;
using DrentL1.Auth.Model;
using System.Security.Claims;

namespace DrentL1.Controllers
{
    /*
     *
    /api/v1/warehouses/{warehouseId}/items/{itemId}/comments GET List 200
    /api/v1/warehouses/{warehouseId}/items/{itemId}/comments/{commentId} GET One 200
    /api/v1/warehouses/{warehouseId}/items/{itemId}/comments POST Create 201
    /api/v1/warehouses/{warehouseId}/items/{itemId}/comments/{commentId} PUT/PATCH Modify 200
    /api/v1/warehouses/{warehouseId}/items/{itemId}/comments/{commentId} DELETE Remove 200/204

     */

    [ApiController]
    [Route("api/warehouses/{warehouseId}/items/{itemId}/comments")]
    public class CommentsController : ControllerBase
    {
        private readonly ICommentsRepository _commentsRepository;
        private readonly IWarehousesRepository _warehousesRepository;
        private readonly IMapper _mapper;
        private readonly IItemsRepository _itemsRepository;
        private readonly IAuthorizationService _authorizationService;

        public CommentsController(IItemsRepository itemsRepository, IMapper mapper, IWarehousesRepository warehousesRepository, ICommentsRepository commentsRepository, IAuthorizationService authorizationService)
        {
            _commentsRepository = commentsRepository;
            _itemsRepository = itemsRepository;
            _mapper = mapper;
            _warehousesRepository = warehousesRepository;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<IEnumerable<CommentDto>> GetAllAsync(int warehouseId, int itemId)
        {
            var items = await _commentsRepository.GetAsync(warehouseId, itemId);
            return items.Select(o => _mapper.Map<CommentDto>(o));
        }

        // /api/warehouses/1/items/2
        [HttpGet("{commentId}")]
        public async Task<ActionResult<CommentDto>> GetAsync(int warehouseId, int itemId, int commentId)
        {
            var item = await _commentsRepository.GetAsync(warehouseId, itemId, commentId);
            if (item == null) return NotFound();

            return Ok(_mapper.Map<CommentDto>(item));
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.SystemUser)]
        public async Task<ActionResult<CommentDto>> PostAsync(int warehouseId, int itemId, CreateCommentDto commentDto)
        {
            var item = await _itemsRepository.GetAsync(itemId);
            if (item == null) return NotFound($"Couldn't find a order with id of {itemId}");
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);
            if (warehouse == null) return NotFound($"Couldn't find a item with id of {warehouseId}");

            //var comment = _mapper.Map<Comment>(commentDto);
            var comment = new Comment { Name = commentDto.Name, Description = commentDto.Description, CreationDate = DateTime.UtcNow, UserId = User.Claims.Where(c => c.Type == "userId").Single().Value };
            comment.ItemId = itemId;
            //comment.Order.ItemId = itemId;
            comment.WarehouseId = warehouseId;
            await _commentsRepository.InsertAsync(comment);
            return Created($"/api/warehouses/{warehouseId}/items/{itemId}/comments/{comment.Id}", _mapper.Map<CommentDto>(comment));
        }

        [HttpPut("{commentId}")]
        [Authorize(Roles = UserRoles.SystemUser)]
        public async Task<ActionResult<CommentDto>> PostAsync(int warehouseId, int itemId, int commentId, UpdateCommentDto commentDto)
        {
            var item = await _itemsRepository.GetAsync(itemId);
            if (item == null) return NotFound($"Couldn't find a order with id of {itemId}");
            var warehouse = await _warehousesRepository.GetAsync(warehouseId);
            if (warehouse == null) return NotFound($"Couldn't find a item with id of {warehouseId}");

            var oldComment = await _commentsRepository.GetAsync(warehouseId, itemId, commentId);
            if (oldComment == null)
                return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, oldComment, "SameUser");
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }

            //oldPost.Body = postDto.Body;
            _mapper.Map(commentDto, oldComment);

            await _commentsRepository.UpdateAsync(oldComment);

            return Ok(_mapper.Map<CommentDto>(oldComment));
        }

        [HttpDelete("{commentId}")]
        [Authorize(Roles = UserRoles.SystemUser)]
        public async Task<ActionResult> DeleteAsync(int warehouseId, int itemId, int commentId)
        {
            var comment = await _commentsRepository.GetAsync(warehouseId, itemId, commentId);
            if (comment == null)
                return NotFound();

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, comment, "SameUser");
            if (!authorizationResult.Succeeded)
            {
                // 404
                return Forbid();
            }

            await _commentsRepository.DeleteAsync(comment);

            // 204
            return NoContent();
        }
    }
}
