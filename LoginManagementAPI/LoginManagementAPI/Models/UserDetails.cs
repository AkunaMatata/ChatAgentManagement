using System;

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
		public Guid UserId { get; set; }

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
	}
}