using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace BhumiVox.Services
{
    public class AzureBlobService
    {
        private readonly BlobContainerClient _container;

        public AzureBlobService(IConfiguration config)
        {
            var connectionString = config["AzureBlob:ConnectionString"];
            var containerName = config["AzureBlob:ContainerName"];

            _container = new BlobContainerClient(connectionString, containerName);
        }

        public async Task<string> UploadProfileImageAsync(IFormFile file, Guid userId)
        {
            // Ensure container exists
            await _container.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var fileExt = Path.GetExtension(file.FileName);
            var blobName = $"user_profiles/{userId}{fileExt}";
            var blobClient = _container.GetBlobClient(blobName);

            // Overwrite existing image
            await blobClient.DeleteIfExistsAsync();

            using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(
                stream,
                new BlobUploadOptions
                {
                    HttpHeaders = new BlobHttpHeaders
                    {
                        ContentType = file.ContentType
                    }
                }
            );

            return blobClient.Uri.ToString();
        }

        public async Task<string> UploadAnnouncementImageAsync(IFormFile file)
        {
            await _container.CreateIfNotExistsAsync(PublicAccessType.Blob);

            var fileExt = Path.GetExtension(file.FileName);
            var blobName = $"announcements/{Guid.NewGuid()}{fileExt}";
            var blobClient = _container.GetBlobClient(blobName);

            using var stream = file.OpenReadStream();

            await blobClient.UploadAsync(
                stream,
                new BlobUploadOptions
                {
                    HttpHeaders = new BlobHttpHeaders
                    {
                        ContentType = file.ContentType
                    }
                }
            );

            return blobClient.Uri.ToString();
        }

    }
}
