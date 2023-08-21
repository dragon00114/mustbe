using imhappy.Models;
using imhappy.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace imhappy.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MomentController : ControllerBase
    {
        private readonly IMomentRepository _momentRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public MomentController(IMomentRepository momentRepository, IUserProfileRepository userProfileRepository)
        {
            _momentRepository = momentRepository;
            _userProfileRepository = userProfileRepository;
        }

        private UserProfile CurrentUserProfile
        {
            get
            {
                var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
                return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            }
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_momentRepository.GetAll(CurrentUserProfile.Id));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var moment = _momentRepository.GetById(id, CurrentUserProfile.Id);
            if (moment == null)
            {
                return NotFound();
            }
            return Ok(moment);
        }

        [HttpPost]
        public IActionResult Post(Moment moment)
        {
            moment.UserProfileId = CurrentUserProfile.Id;
            _momentRepository.Add(moment);
            return CreatedAtAction(nameof(Get), new { id = moment.Id }, moment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Moment moment)
        {
            if (id != moment.Id)
            {
                return BadRequest();
            }
            _momentRepository.Update(moment);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _momentRepository.Delete(id);
            return NoContent();
        }
    }
}