using LoginManagementAPI.Api.ViewModels;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The authentication service interface.
	/// </summary>
	public interface IAuthenticationService
	{
		/// <summary>
		/// Validates the user credentials.
		/// </summary>
		/// <param name="model"><value>true</value> if user is valid otherwise <value>false.</value></param>
		/// <returns></returns>
		bool Validate(UserViewModel model);
	}
}