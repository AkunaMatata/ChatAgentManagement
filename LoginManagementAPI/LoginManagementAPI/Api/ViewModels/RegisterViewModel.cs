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
		[Required]
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets the full name.
		/// </summary>
		/// <value>The full name.</value>
		[Required]
		public string FullName { get; set; }

		/// <summary>
		/// Gets or sets the password.
		/// </summary>
		/// <value>The password.</value>
		[Required]
		public string Password { get; set; }
	}
}