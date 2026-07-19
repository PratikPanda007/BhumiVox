using BhumiVox.Helper;
using BhumiVox.Models.Booking;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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

        [HttpGet("MyBookings")]
        public async Task<IActionResult> MyBookings()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);

                if (string.IsNullOrWhiteSpace(email))
                {
                    return Unauthorized();
                }

                var result = await _db.GetBookingsByEmailAsync(email);

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
    }
}
