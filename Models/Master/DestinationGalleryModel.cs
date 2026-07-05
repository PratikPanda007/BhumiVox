namespace BhumiVox.Models.Master
{
    public class DestinationGalleryModel
    {
        public int DestinationGalleryId { get; set; }
        public Guid DestinationGalleryGuid { get; set; }

        public string ImageUrl { get; set; } = string.Empty;
        public string? Caption { get; set; }
        public int DisplayOrder { get; set; }
    }
}
