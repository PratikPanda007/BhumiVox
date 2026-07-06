namespace BhumiVox.Models.Booking
{
    public class BookingStatusModel
    {
        public int BookingStatusId { get; set; }
        public Guid BookingStatusGuid { get; set; }
        public string StatusName { get; set; }
        public int DisplayOrder { get; set; }
    }
}
