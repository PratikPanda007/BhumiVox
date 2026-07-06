namespace BhumiVox.Models.Booking
{
    public class BookingCreateModel
    {
        public int JourneyId { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string MobileNumber { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public int Adults { get; set; }
        public int Children { get; set; }
        public DateTime PreferredDepartureDate { get; set; }
        public string? SpecialRequirements { get; set; }
    }
}
