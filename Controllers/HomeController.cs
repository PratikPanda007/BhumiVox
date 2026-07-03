using Microsoft.AspNetCore.Mvc;
using BhumiVox.Models;
using Microsoft.AspNetCore.Authorization;
using BhumiVox.Helper;

namespace BhumiVox.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class HomeController : Controller
    {
        private readonly JwtHelper _jwt;

        public HomeController(JwtHelper jwt)
        {
            _jwt = jwt;
        }

        //[AllowAnonymous]
        //[HttpGet("token")]
        //public IActionResult GetToken()
        //{
        //    var token = _jwt.GenerateToken("test@test.com");
        //    return Ok(token);
        //}

        // GET: api/home
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new
            {
                message = "Hello from HomeController (GET)",
                serverTime = DateTime.UtcNow
            });
        }

        // POST: api/home
        [HttpPost]
        public IActionResult Post([FromBody] HomeRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            return Ok(new
            {
                message = "Data received successfully (POST)",
                receivedData = request
            });
        }

        [AllowAnonymous]
        [HttpGet("test-token")]
        public IActionResult GetTestToken()
        {
            return Ok("Use your login API here to generate JWT");
        }
    }
}
