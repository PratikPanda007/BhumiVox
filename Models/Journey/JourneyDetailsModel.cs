namespace BhumiVox.Models.Journey
{
    public class JourneyDetailsModel
    {
        public JourneyModel? Journey { get; set; }
        public List<JourneyItineraryModel> Itinerary { get; set; } = new();
        public List<JourneyInclusionModel> Inclusions { get; set; } = new();
        public List<JourneyExclusionModel> Exclusions { get; set; } = new();
        public List<JourneyFAQModel> FAQs { get; set; } = new();
        public List<JourneyDestinationModel> Destinations { get; set; } = new();
    }
}
