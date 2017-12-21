using PersistenceData.Models;

namespace LoginManagementAPI.Models
{
    public class UserSettings
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string AvatarUrl { get; set; }

        public Role Role { get; set; }

        public int CustomerId { get; set; }
    }
}