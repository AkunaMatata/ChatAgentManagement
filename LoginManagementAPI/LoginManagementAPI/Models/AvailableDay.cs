using System;
namespace LoginManagementAPI.Models
{
    public class AvailableDay
    {
        public int CustomerId { get; set; }
        public int AvailableDayId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}