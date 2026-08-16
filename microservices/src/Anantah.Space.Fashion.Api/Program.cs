using Anantah.Space.Fashion.Api.Middleware;
using Anantah.Space.Fashion.Infrastructure;
using Anantah.Space.Fashion.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddProblemDetails();
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddFashionInfrastructure(builder.Configuration);
builder.Services.AddHealthChecks();

builder.Services.AddCors(options =>
{
    options.AddPolicy("LocalUi", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4173",
                "http://localhost:4174",
                "http://localhost:4175",
                "http://localhost:4176",
                "http://localhost:4177",
                "http://localhost:4178")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

if (app.Configuration.GetValue<bool>("Database:ApplyMigrationsOnStartup"))
{
    await using var scope = app.Services.CreateAsyncScope();
    var initializer = scope.ServiceProvider.GetRequiredService<FashionDatabaseInitializer>();
    var seedDevelopmentData = app.Environment.IsDevelopment()
        && app.Configuration.GetValue<bool>("Database:SeedDevelopmentData");
    await initializer.InitialiseAsync(seedDevelopmentData, CancellationToken.None);
}

app.UseCors("LocalUi");
app.UseHttpsRedirection();

app.MapControllers();
app.MapHealthChecks("/health/live");

app.Run();

public partial class Program;
