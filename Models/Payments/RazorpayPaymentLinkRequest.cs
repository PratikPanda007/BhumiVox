namespace BhumiVox.Models.Payments
{
    public class RazorpayPaymentLinkRequest
    {
        public int amount { get; set; }
        public string currency { get; set; } = "INR";
        public bool accept_partial { get; set; } = false;
        public int expire_by { get; set; }
        public string reference_id { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public Customer customer { get; set; } = new();
        public Notify notify { get; set; } = new();
        public bool reminder_enable { get; set; } = true;
        public string callback_url { get; set; } = string.Empty;
        public string callback_method { get; set; } = "get";
    }

    public class Customer
    {
        public string name { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string contact { get; set; } = string.Empty;
    }

    public class Notify
    {
        public bool sms { get; set; } = true;
        public bool email { get; set; } = true;
    }
}
