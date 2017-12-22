using PersistenceData.Models;

namespace LoginManagementAPI.Api.ViewModels
{
	/// <summary>
	/// The user view model.
	/// </summary>
	public class UserViewModel
	{
		/// <summary>
		/// Gets or sets the identifier.
		/// </summary>
		/// <value>The identifier.</value>
		public int Id { get; set; }

		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets the password.
		/// </summary>
		/// <value>The password.</value>
		public string Password { get; set; }

		/// <summary>
		/// Gets or sets the first name.
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// The last name.
		/// </summary>
		public string LastName { get; set; }

		/// <summary>
		/// Gets or sets the customer id.
		/// </summary>
		public int CustomerId { get; set; }

		/// <summary>
		/// Gets or sets the role.
		/// </summary>
		/// <value>The role.</value>
		public Role Role { get; set; }

		/// <summary>
		/// Gets or sets is active flag.
		/// </summary>
		/// <value>Is active flag.</value>
		public bool IsActive { get; set; }
	}
}