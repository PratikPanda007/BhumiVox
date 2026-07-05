namespace BhumiVox.Models.Master
{
    public class DestinationHighlightModel
    {
        public int DestinationHighlightId { get; set; }
        public Guid DestinationHighlightGuid { get; set; }
        public string Highlight { get; set; } = string.Empty;
        public int DisplayOrder { get; set; }
    }
}
