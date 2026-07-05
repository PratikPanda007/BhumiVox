namespace BhumiVox.Models.Master
{
    public class JourneyTypeModel
    {
        public int JourneyTypeId { get; set; }
        public Guid JourneyTypeGuid { get; set; }
        public string JourneyTypeName { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }
    }
}
