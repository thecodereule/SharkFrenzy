using System;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync(new object[] { request.Activity.Id }, cancellationToken)
                ?? throw new Exception("Cannot find activity");

            // Log the state of the activity before mapping
            Console.WriteLine($"Before Mapping: Title = {activity.Title}, Description = {activity.Description}");

            // Map the changes from the request to the existing activity
            mapper.Map(request.Activity, activity);

            // Log the state of the activity after mapping
            Console.WriteLine($"After Mapping: Title = {activity.Title}, Description = {activity.Description}");

            // Save changes to the database
            context.Attach(activity).State = EntityState.Modified;
            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
