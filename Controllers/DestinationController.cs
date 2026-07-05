using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhumiVox.Helper;
using BhumiVox.Models;
using Microsoft.AspNetCore.Authorization;
using BhumiVox.Models.Master;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly DBUtils _db;

        public DestinationController(DBUtils db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetDestinations()
        {
            try
            {
                var result = await _db.GetDestinationsAsync();

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

        //[HttpGet("{slug}")]
        //public async Task<IActionResult> GetDestinationBySlug(string slug)
        //{
        //    try
        //    {
        //        var result = await _db.GetDestinationBySlugAsync(slug);

        //        if (result == null)
        //            return NotFound(new
        //            {
        //                success = false,
        //                message = "Destination not found."
        //            });

        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new
        //        {
        //            success = false,
        //            message = ex.Message
        //        });
        //    }
        //}

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateDestination(CreateDestinationRequest request)
        {
            try
            {
                var result = await _db.CreateDestinationAsync(request, "System");

                return Ok(new
                {
                    success = true,
                    message = "Destination created successfully.",
                    result.DestinationId,
                    result.DestinationGuid
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

        [HttpPut("{destinationId}")]
        [Authorize]
        public async Task<IActionResult> UpdateDestination(int destinationId, CreateDestinationRequest request)
        {
            try
            {
                await _db.UpdateDestinationAsync(destinationId, request, "System");

                return Ok(new
                {
                    success = true,
                    message = "Destination updated successfully."
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

        [HttpDelete("{destinationId}")]
        [Authorize]
        public async Task<IActionResult> DeleteDestination(int destinationId)
        {
            try
            {
                await _db.DeleteDestinationAsync(destinationId, "System");

                return Ok(new
                {
                    success = true,
                    message = "Destination deleted successfully."
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
        public async Task<IActionResult> GetDestinationDetails(string slug)
        {
            try
            {
                var result = await _db.GetDestinationDetailsAsync(slug);

                if (result == null)
                {
                    return NotFound(new
                    {
                        success = false,
                        message = "Destination not found."
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
    }
}
