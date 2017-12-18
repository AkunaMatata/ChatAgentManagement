namespace LoginManagementAPI.Models
{
    public class ChatCustomization
    {
        public int CustomerId { get; set; }
        public int ChatCustomizationId { get; set; }
        public string GreetingTile { get; set; }
        public string ImageUrl { get; set; }

        public bool ShowWelcomeTile { get; set; }
        public bool RequireRegistration { get; set; }
    }
}