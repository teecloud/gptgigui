using System;

namespace gptgigapi.Models
{
    public class BusinessRegistration : ITenantEntity
    {
        public int Id { get; set; }
        public string Structure { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string EIN { get; set; } = string.Empty;
        public string Licenses { get; set; } = string.Empty;
        public string BankInfo { get; set; } = string.Empty;
        public string Taxes { get; set; } = string.Empty;
        public string Insurance { get; set; } = string.Empty;
        public string Operations { get; set; } = string.Empty;
        public string TenantId { get; set; } = string.Empty;
    }
}
