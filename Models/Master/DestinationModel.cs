namespace BhumiVox.Models.Master
{
    public class DestinationModel
    {
        public int DestinationId { get; set; }
        public Guid DestinationGuid { get; set; }
        public string DestinationName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? LongDescription { get; set; }
        public string? HeroImage { get; set; }
        public string? Region { get; set; }
        public string? Tagline { get; set; }
        public string? Circuit { get; set; }
        public string? Significance { get; set; }
        public string? Geography { get; set; }
        public string? BestTime { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsFeatured { get; set; }
        public bool IsActive { get; set; }
    }
}
