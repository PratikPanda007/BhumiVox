using BhumiVox.Helper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace BhumiVox.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly DBUtils _db;

        public PaymentController(DBUtils db)
        {
            _db = db;
        }

        [HttpPost("Webhook")]
        public async Task<IActionResult> Webhook()
        {
            using StreamReader reader = new(Request.Body);

            string body = await reader.ReadToEndAsync();

            Console.WriteLine(body);

            if (string.IsNullOrWhiteSpace(body))
                return Ok();

            try
            {
                using JsonDocument doc = JsonDocument.Parse(body);

                string eventName =
                    doc.RootElement
                        .GetProperty("event")
                        .GetString()!;

                if (eventName == "payment_link.paid")
                {
                    JsonElement payment =
                        doc.RootElement
                            .GetProperty("payload")
                            .GetProperty("payment")
                            .GetProperty("entity");

                    JsonElement paymentLink =
                        doc.RootElement
                            .GetProperty("payload")
                            .GetProperty("payment_link")
                            .GetProperty("entity");

                    string razorpayPaymentId =
                        payment.GetProperty("id").GetString()!;

                    string razorpayOrderId =
                        payment.GetProperty("order_id").GetString()!;

                    decimal amountPaid =
                        payment.GetProperty("amount").GetDecimal() / 100m;

                    string paymentStatus =
                        payment.GetProperty("status").GetString()!;

                    string paymentMethod =
                        payment.GetProperty("method").GetString()!;

                    string paymentLinkId =
                        paymentLink.GetProperty("id").GetString()!;

                    string referenceId =
                        paymentLink.GetProperty("reference_id").GetString()!;

                    string responseJson = body;

                    Console.WriteLine("Before DB Call");

                    await _db.SaveSuccessfulPaymentAsync(
                        paymentLinkId,
                        razorpayPaymentId,
                        razorpayOrderId,
                        amountPaid,
                        paymentStatus,
                        paymentMethod,
                        responseJson
                    );

                    Console.WriteLine("After DB Call");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);

                return BadRequest(ex.Message);
            }
        }
    }
}
