namespace BhumiVox.Models.Payments
{
    public class RazorpayPaymentLinkResponse
    {
        public string id { get; set; } = string.Empty;
        public string entity { get; set; } = string.Empty;
        public int amount { get; set; }
        public string currency { get; set; } = string.Empty;
        public string status { get; set; } = string.Empty;
        public string short_url { get; set; } = string.Empty;
        public long expire_by { get; set; }
        public int amount_paid { get; set; }
        public int amount_due { get; set; }
        public string reference_id { get; set; } = string.Empty;
        public CustomerResponse customer { get; set; } = new();
    }

    public class CustomerResponse
    {
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string contact { get; set; } = string.Empty;
    }
}
