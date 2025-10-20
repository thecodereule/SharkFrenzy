using System;
using Application.Profiles.DTOs;
using Microsoft.AspNetCore.Http;


namespace Application.Interfaces;

public interface IphotoService
{
    Task<PhotoUploadResult?> UploadPhoto(IFormFile file);
    Task<string> DeletePhoto(string publicId);
}
