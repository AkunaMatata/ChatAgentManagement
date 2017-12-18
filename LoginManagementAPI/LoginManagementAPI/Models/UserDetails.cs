namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The user details model.
	/// </summary>
	public class UserDetails
	{
		/// <summary>
		/// The user identifier.
		/// </summary>
		public int UserId { get; set; }

		/// <summary>
		/// The first name.
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// The last name.
		/// </summary>
		public string LastName { get; set; }

		/// <summary>
		/// The address.
		/// </summary>
		public string Address { get; set; }

		/// <summary>
		/// Gets or sets the settings.
		/// </summary>
		/// <value>The settings.</value>
		public UserSettings Settings { get; set; }
	}
}