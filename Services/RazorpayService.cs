using BhumiVox.Models.Payments;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;

namespace BhumiVox.Services
{
    public class RazorpayService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        private readonly string _keyId;
        private readonly string _keySecret;

        public RazorpayService(
            IConfiguration config,
            HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;

            _httpClient.BaseAddress =
                new Uri(_config["Razorpay:BaseUrl"]!);

            _keyId = _config["Razorpay:KeyId"]!;
            _keySecret = _config["Razorpay:KeySecret"]!;
        }

        public async Task<RazorpayPaymentLinkResponse> CreatePaymentLinkAsync(
            RazorpayPaymentLinkRequest request)
        {
            var json =
                JsonSerializer.Serialize(request);

            var content =
                new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json"
                );

            Console.WriteLine("Headers:");
            Console.WriteLine(_httpClient.DefaultRequestHeaders.Authorization);

            var requestMessage = new HttpRequestMessage(
                HttpMethod.Post,
                "payment_links"
            );

            requestMessage.Content = content;

            var auth =
                Convert.ToBase64String(
                    Encoding.ASCII.GetBytes($"{_keyId}:{_keySecret}")
                );

            requestMessage.Headers.Authorization =
                new AuthenticationHeaderValue("Basic", auth);

            var response =
                await _httpClient.SendAsync(requestMessage);

            var body =
                await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception(body);
            }

            return JsonSerializer.Deserialize<RazorpayPaymentLinkResponse>(
                body,
                new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                }
            )!;
        }
    }
}