namespace BhumiVox.Models.Journey
{
    public class JourneyModel
    {
        public int JourneyId { get; set; }
        public Guid JourneyGuid { get; set; }
        public string JourneyName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public int DestinationId { get; set; }
        public string DestinationName { get; set; } = string.Empty;
        public int JourneyTypeId { get; set; }
        public string JourneyTypeName { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string? LongDescription { get; set; }
        public string? HeroImage { get; set; }
        public decimal PriceFrom { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
    }
}
