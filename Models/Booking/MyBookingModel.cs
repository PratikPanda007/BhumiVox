namespace BhumiVox.Models.Booking
{
    public class MyBookingModel
    {
        public int BookingGroupId { get; set; }
        public Guid BookingGroupGuid { get; set; }
        public int BookingId { get; set; }
        public Guid BookingGuid { get; set; }
        public string JourneyName { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Adults { get; set; }
        public int Children { get; set; }
        public DateTime PreferredDepartureDate { get; set; }
        public string? SpecialRequirements { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; } = "INR";
        public string BookingStatus { get; set; } = string.Empty;
        public string PaymentStatus { get; set; } = string.Empty;
        public string? RazorpayPaymentLinkId { get; set; }
        public string? RazorpayShortUrl { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
