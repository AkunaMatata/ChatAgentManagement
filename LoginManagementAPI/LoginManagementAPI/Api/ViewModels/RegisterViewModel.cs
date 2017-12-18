using System.ComponentModel.DataAnnotations;

namespace LoginManagementAPI.Api.ViewModels
{
	/// <summary>
	/// The registration view model.
	/// </summary>
	public class RegisterViewModel
	{
		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets the full name.
		/// </summary>
		/// <value>The full name.</value>
		public string FullName { get; set; }

		/// <summary>
		/// Gets or sets the password.
		/// </summary>
		/// <value>The password.</value>
		public string Password { get; set; }
	}
}