using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace BhumiVox.Security
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class ApiKeyNeededAttribute : Attribute, IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(
            ActionExecutingContext context,
            ActionExecutionDelegate next)
        {
            var config = context.HttpContext.RequestServices
                .GetRequiredService<IConfiguration>();

            if (!context.HttpContext.Request.Headers
                .TryGetValue("X-API-KEY", out var providedKey))
            {
                context.Result = new UnauthorizedObjectResult("API Key missing");
                return;
            }

            var validKey = config["ApiKey"];

            if (providedKey != validKey)
            {
                context.Result = new UnauthorizedObjectResult("Invalid API Key");
                return;
            }

            await next();
        }
    }
}
