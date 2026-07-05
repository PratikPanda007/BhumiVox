namespace BhumiVox.Models.Master
{
    public class CreateDestinationRequest
    {
        public string DestinationName { get; set; } = string.Empty;
        public string Slug { get; set; } = string.Empty;
        public string? ShortDescription { get; set; }
        public string? LongDescription { get; set; }
        public string? HeroImage { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsFeatured { get; set; }
    }
}
