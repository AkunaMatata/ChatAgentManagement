using System.Collections.Generic;

namespace LoginManagementAPI.Models
{
    public class ChatSettings
    {
        public int CustomerId { get; set; }
        public int ChatSettingsId { get; set; }
        public IDictionary<string,string> Shortcuts { get; set; }

        public GeneralSettings GeneralSettings { get; set; }

    }
}