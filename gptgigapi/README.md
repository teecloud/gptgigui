# GPTGig API

## Applying database migrations

Entity Framework Core CLI commands are available through the local tool manifest in `.config/dotnet-tools.json`. Run the commands from the `gptgigapi` directory:

```bash
# Restore the local tools (installs dotnet-ef)
dotnet tool restore

# Apply any pending migrations to the configured database
dotnet ef database update
```

If you prefer the Visual Studio Package Manager Console, ensure `gptgigapi` is the default project and run `Update-Database` there. The `Microsoft.EntityFrameworkCore.Tools` package reference enables the Package Manager Console commands.
