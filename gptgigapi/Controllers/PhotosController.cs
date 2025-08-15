using gptgigapi.Data;
using gptgigapi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

namespace gptgigapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhotosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly BlobServiceClient _blobServiceClient;
        private readonly IConfiguration _configuration;

        public PhotosController(ApplicationDbContext context, BlobServiceClient blobServiceClient, IConfiguration configuration)
        {
            _context = context;
            _blobServiceClient = blobServiceClient;
            _configuration = configuration;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Photo>> Upload(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded");
            }

            var containerName = _configuration["AzureStorage:Container"] ?? "photos";
            var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
            await containerClient.CreateIfNotExistsAsync();

            var blobClient = containerClient.GetBlobClient(Guid.NewGuid() + Path.GetExtension(file.FileName));
            await using var stream = file.OpenReadStream();
            await blobClient.UploadAsync(stream, new BlobUploadOptions
            {
                HttpHeaders = new BlobHttpHeaders { ContentType = file.ContentType }
            });

            var photo = new Photo { Url = blobClient.Uri.ToString() };
            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return Ok(photo);
        }
    }
}
