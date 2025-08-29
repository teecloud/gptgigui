using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using gptgigapi.Models;
using gptgigapi.Services;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace gptgigapi.Data
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        private readonly string _tenantId;

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options, ITenantProvider tenantProvider) : base(options)
        {
            _tenantId = tenantProvider.GetTenantId();
        }

        public DbSet<Photo> Photos => Set<Photo>();
        public DbSet<VendorProfile> VendorProfiles => Set<VendorProfile>();
        public DbSet<CustomerProfile> CustomerProfiles => Set<CustomerProfile>();
        public DbSet<Message> Messages => Set<Message>();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Photo>().HasQueryFilter(e => e.TenantId == _tenantId);
            builder.Entity<VendorProfile>().HasQueryFilter(e => e.TenantId == _tenantId);
            builder.Entity<CustomerProfile>().HasQueryFilter(e => e.TenantId == _tenantId);
            builder.Entity<Message>().HasQueryFilter(e => e.TenantId == _tenantId);
        }

        public override int SaveChanges()
        {
            ApplyTenantId();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            ApplyTenantId();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void ApplyTenantId()
        {
            foreach (var entry in ChangeTracker.Entries<ITenantEntity>().Where(e => e.State == EntityState.Added))
            {
                entry.Entity.TenantId = _tenantId;
            }
        }
    }
}
