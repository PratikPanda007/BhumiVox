namespace BhumiVox.Models.Journey
{
    public class JourneyExclusionModel
    {
        public int JourneyExclusionId { get; set; }
        public Guid JourneyExclusionGuid { get; set; }
        public string Exclusion { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}
