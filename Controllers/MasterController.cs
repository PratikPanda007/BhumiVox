using BhumiVox.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MasterController : ControllerBase
    {
        private readonly DBUtils _db;

        public MasterController(DBUtils db)
        {
            _db = db;
        }

        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            return Ok(_db.GetRoles());
        }

        [AllowAnonymous]
        [HttpGet("journey-types")]
        public IActionResult GetJourneyTypes()
        {
            return Ok(_db.GetJourneyTypes());
        }

        [AllowAnonymous]
        [HttpGet("travel-styles")]
        public IActionResult GetTravelStyles()
        {
            return Ok(_db.GetTravelStyles());
        }

        [AllowAnonymous]
        [HttpGet("booking-status")]
        public IActionResult GetBookingStatus()
        {
            return Ok(_db.GetBookingStatus());
        }

        [AllowAnonymous]
        [HttpGet("payment-status")]
        public IActionResult GetPaymentStatus()
        {
            return Ok(_db.GetPaymentStatus());
        }
    }
}
