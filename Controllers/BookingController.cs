using BhumiVox.Helper;
using BhumiVox.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BookingController : ControllerBase
    {
        private readonly DBUtils _db;

        public BookingController(DBUtils db)
        {
            _db = db;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateBooking([FromBody] BookingCreateModel model)
        {
            try
            {
                int bookingId = await _db.CreateBookingAsync(model);

                return Ok(new
                {
                    success = true,
                    bookingId,
                    message = "Booking created successfully."
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
