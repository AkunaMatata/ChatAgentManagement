using System;

namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The user model.
	/// </summary>
	public class User
	{
		/// <summary>
		/// The identifier.
		/// </summary>
		public Guid Id { get; set; }

		/// <summary>
		/// The password.
		/// </summary>
		public string Password { get; set; }

		/// <summary>
		/// The email.
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// The flag indicating whether user is active or not.
		/// </summary>
		public bool IsActive { get; set; }

		/// <summary>
		/// The user role.
		/// </summary>
		public Role Role { get; set; }

		/// <summary>
		/// The created date.
		/// </summary>
		public DateTime CreatedDate { get; set; }
	}
}