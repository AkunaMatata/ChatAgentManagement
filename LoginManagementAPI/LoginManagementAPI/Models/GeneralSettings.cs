using System.Collections.Generic;

namespace LoginManagementAPI.Models
{
    public class GeneralSettings
    {
        public int Id { get; set; }

        public IList<string> AvailableDays { get; set; }
    }
}