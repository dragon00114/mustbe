using imhappy.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace imhappy.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StickerController : ControllerBase
    {
        private readonly IStickerRepository _stickerRepository;
        public StickerController(IStickerRepository stickerRepository)
        {
            _stickerRepository = stickerRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_stickerRepository.GetAll());
        }
    }
}