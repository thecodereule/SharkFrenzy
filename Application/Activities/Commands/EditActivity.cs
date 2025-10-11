using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(new object[] { request.ActivityDto.Id }, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not foun", 404);

            // Log the state of the activity before mapping
            Console.WriteLine($"Before Mapping: Title = {activity.Title}, Description = {activity.Description}");

            // Map the changes from the request to the existing activity
            mapper.Map(request.ActivityDto, activity);

            // Log the state of the activity after mapping
            Console.WriteLine($"After Mapping: Title = {activity.Title}, Description = {activity.Description}");

            // Save changes to the database
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to update the activity", 400);

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
