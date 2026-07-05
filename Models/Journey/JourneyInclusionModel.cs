namespace BhumiVox.Models.Journey
{
    public class JourneyInclusionModel
    {
        public int JourneyInclusionId { get; set; }
        public Guid JourneyInclusionGuid { get; set; }
        public string Inclusion { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}
