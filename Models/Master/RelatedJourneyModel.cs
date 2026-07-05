namespace BhumiVox.Models.Master
{
    public class RelatedJourneyModel
    {
        public int JourneyId { get; set; }
        public Guid JourneyGuid { get; set; }
        public string JourneyName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string ShortDescription { get; set; } = string.Empty;
        public string HeroImage { get; set; } = string.Empty;
        public string Duration { get; set; } = string.Empty;
        public decimal PriceFrom { get; set; }
    }
}
