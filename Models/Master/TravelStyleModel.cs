namespace BhumiVox.Models.Master
{
    public class TravelStyleModel
    {
        public int TravelStyleId { get; set; }
        public Guid TravelStyleGuid { get; set; }
        public string TravelStyleName { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }
    }
}
