namespace BhumiVox.Models.Journey
{
    public class JourneyFAQModel
    {
        public int JourneyFAQId { get; set; }
        public Guid JourneyFAQGuid { get; set; }
        public string Question { get; set; } = string.Empty;
        public string Answer { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}
