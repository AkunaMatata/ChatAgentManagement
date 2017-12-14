using LoginManagementAPI.Models;
using PersistenceData.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements login service interface.
	/// </summary>
	public class LoginService : ILoginService
	{
		/// <summary>
		/// Validates the user credentials.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user model.</returns>
		public UserModel Validate(UserModel model)
		{
			return model;
		}

		/// <summary>
		/// Registers an user.
		/// </summary>
		/// <param name="model">The register model.</param>
		/// <returns>The register model.</returns>
		public RegisterModel Register(RegisterModel model)
		{
			throw new System.NotImplementedException();
		}
	}
}