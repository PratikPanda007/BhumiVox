namespace BhumiVox.Models.Journey
{
    public class JourneyItineraryModel
    {
        public int JourneyItineraryId { get; set; }
        public Guid JourneyItineraryGuid { get; set; }
        public int DayNumber { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}
