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
		public string Name { get; set; }

		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		public string Email { get; set; }
	}
}