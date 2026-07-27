using Microsoft.AspNetCore.Mvc;
using BhumiVox.Models;
using Microsoft.AspNetCore.Authorization;
using BhumiVox.Helper;
using System.Reflection;

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

        [AllowAnonymous]
        [HttpGet("deployment-info")]
        public IActionResult GetDeploymentInfo()
        {
            var assembly = Assembly.GetExecutingAssembly();

            var deployedUtc = System.IO.File.GetLastWriteTimeUtc(assembly.Location);

            var istTimeZone = TimeZoneInfo.FindSystemTimeZoneById(
                OperatingSystem.IsWindows()
                    ? "India Standard Time"
                    : "Asia/Kolkata");

            var deployedIst = TimeZoneInfo.ConvertTimeFromUtc(deployedUtc, istTimeZone);

            return Ok(new
            {
                deployedAt = deployedIst.ToString("dd-MMM-yyyy hh:mm:ss tt"),
                timeZone = "IST",
                version = assembly.GetName().Version?.ToString()
            });
        }

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
