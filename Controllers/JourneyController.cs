using BhumiVox.Helper;
using BhumiVox.Models.Payments;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JourneyController : ControllerBase
    {
        private readonly DBUtils _db;

        public JourneyController(DBUtils db)
        {
            _db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetAllJourneys()
        {
            try
            {
                var result = await _db.GetAllJourneysAsync();

                return Ok(new
                {
                    success = true,
                    data = result
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        [HttpGet("{slug}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetJourneyDetails(string slug)
        {
            try
            {
                var result = await _db.GetJourneyDetailsAsync(slug);

                if (result == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Journey not found."
                    });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }

        [HttpPost("Book")]
        [AllowAnonymous]
        public async Task<IActionResult> BookJourney(CreateBookingModel model)
        {
            try
            {
                int bookingId = await _db.CreateBookingAsync(model);

                return Ok(new
                {
                    success = true,
                    bookingId
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    success = false,
                    message = ex.Message
                });
            }
        }
    }
}
