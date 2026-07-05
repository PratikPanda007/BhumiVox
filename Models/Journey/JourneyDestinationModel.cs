namespace BhumiVox.Models.Journey
{
    public class JourneyDestinationModel
    {
        public int DestinationId { get; set; }
        public Guid DestinationGuid { get; set; }
        public string DestinationName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string HeroImage { get; set; } = string.Empty;
    }
}
