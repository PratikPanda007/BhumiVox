namespace BhumiVox.Models.Admin
{
    public class UploadDocumentRequest
    {
        public int DocumentTypeId { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}
