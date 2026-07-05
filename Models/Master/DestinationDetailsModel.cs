namespace BhumiVox.Models.Master
{
    public class DestinationDetailsModel
    {
        public DestinationModel? Destination { get; set; }
        public List<DestinationGalleryModel> Gallery { get; set; } = new();
        public List<DestinationHighlightModel> Highlights { get; set; } = new();
        public List<RelatedJourneyModel> RelatedJourneys { get; set; } = new();
    }
}
