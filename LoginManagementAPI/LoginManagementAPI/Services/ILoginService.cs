using LoginManagementAPI.Models;
using PersistenceData.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The login service interface.
	/// </summary>
	public interface ILoginService
	{
		/// <summary>
		/// Validates the user credentials.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user model.</returns>
		UserModel Validate(UserModel model);

		/// <summary>
		/// Registers an user.
		/// </summary>
		/// <param name="model">The register model.</param>
		/// <returns>The user model.</returns>
		UserModel Register(RegisterModel model);
	}
}