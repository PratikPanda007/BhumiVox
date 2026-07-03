using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BhumiVox.Helper;
using BhumiVox.Models;
using BhumiVox.Models.Auth;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DBUtils _db;
        private readonly JwtHelper _jwt;

        public AuthController(DBUtils db, JwtHelper jwt)
        {
            _db = db;
            _jwt = jwt;
        }

        // ================================================================================================= [ User Registration Starts Here ]
        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            try
            {
                request.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);

                var result = await _db.RegisterUserAsync(request, "Self");

                return Ok(new
                {
                    success = true,
                    message = "User registered successfully.",
                    result.UserId,
                    result.UserGuid,
                    result.RoleId
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
        // ================================================================================================= [ User Registration Ends Here ]

        // ================================================================================================= [ User Login Starts Here ]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            try
            {
                var user = await _db.LoginUserAsync(request.Email);

                if (user == null)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid email or password."
                    });
                }

                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(
                    request.Password,
                    user.PasswordHash);

                if (!isPasswordValid)
                {
                    return Unauthorized(new
                    {
                        success = false,
                        message = "Invalid email or password."
                    });
                }

                string token = _jwt.GenerateToken(user);

                return Ok(new
                {
                    success = true,
                    token,
                    user = new
                    {
                        user.UserId,
                        user.UserGuid,
                        user.FullName,
                        user.Email,
                        user.Phone,
                        user.RoleId,
                        user.Avatar
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
        // ================================================================================================= [ User Login Endss Here ]
    }
}
