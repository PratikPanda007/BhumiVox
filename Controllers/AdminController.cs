using BhumiVox.Helper;
using BhumiVox.Models.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "1,2")]
    public class AdminController : ControllerBase
    {
        private readonly DBUtils _db;

        public AdminController(DBUtils db)
        {
            _db = db;
        }

        [HttpGet("Bookings")]
        public async Task<IActionResult> GetBookings()
        {
            try
            {
                var result = await _db.GetAllBookingsAsync();

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

        [HttpGet("Bookings/{bookingId}")]
        public async Task<IActionResult> GetBookingById(int bookingId)
        {
            try
            {
                var result = await _db.GetBookingByIdAsync(bookingId);

                if (result == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Booking not found."
                    });
                }

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

        [HttpPost("Bookings/{bookingId}/GeneratePaymentLink")]
        public async Task<IActionResult> GeneratePaymentLink(int bookingId, [FromBody] GeneratePaymentLinkRequest request)
        {
            try
            {
                var result = await _db.GeneratePaymentLinkAsync(bookingId, request.Amount);

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

        [HttpPost("Bookings/{bookingId}/MarkPaid")]
        public async Task<IActionResult> MarkPaid(int bookingId)
        {
            try
            {
                await _db.MarkBookingPaidAsync(bookingId);

                return Ok(new
                {
                    success = true,
                    message = "Booking marked as paid."
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

        [HttpGet("Bookings/{bookingId}/PaymentLink")]
        public async Task<IActionResult> GetPaymentLink(int bookingId)
        {
            try
            {
                var result = await _db.GetPaymentLinkAsync(bookingId);

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        paymentLink = result
                    }
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
