using gptgigapi.Models;

namespace gptgigapi.Data
{
    public static class CatalogData
    {
        public static List<ServiceCategory> Categories { get; } = new()
        {
            new ServiceCategory { Id = "clean", Name = "Cleaning", Icon = "sparkles" },
            new ServiceCategory { Id = "move", Name = "Moving", Icon = "cube" },
            new ServiceCategory { Id = "tech", Name = "Tech Help", Icon = "hardware-chip" },
        };

        public static List<ServiceItem> Services { get; } = new()
        {
            new ServiceItem { Id = "svc1", Title = "Apartment Deep Clean", CategoryId = "clean", Price = 149, DurationMin = 180, ImageUrl = "assets/samples/clean1.jpg", Rating = 4.9, Description = "Professional deep cleaning for your entire apartment." },
            new ServiceItem { Id = "svc2", Title = "Two Movers & Truck", CategoryId = "move", Price = 95, DurationMin = 120, ImageUrl = "assets/samples/move1.jpg", Rating = 4.7, Description = "Reliable moving service with two helpers and a truck." },
            new ServiceItem { Id = "svc3", Title = "Home Wi-Fi Tune Up", CategoryId = "tech", Price = 79, DurationMin = 60, ImageUrl = "assets/samples/tech1.jpg", Rating = 4.8, Description = "Optimize and secure your home wireless network." },
        };

        public static List<Provider> Providers { get; } = new()
        {
            new Provider { Id = "pro1", Name = "Avery J.", AvatarUrl = "assets/samples/p1.jpg", Rating = 4.9, Tags = new List<string>{"Cleaning","Move-Out"} },
            new Provider { Id = "pro2", Name = "Kai M.", AvatarUrl = "assets/samples/p2.jpg", Rating = 4.8, Tags = new List<string>{"Tech Help"} },
            new Provider { Id = "pro3", Name = "Riley P.", AvatarUrl = "assets/samples/p3.jpg", Rating = 4.7, Tags = new List<string>{"Moving"} },
        };
    }
}

