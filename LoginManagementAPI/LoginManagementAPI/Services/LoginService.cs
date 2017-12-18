using LoginManagementAPI.Models;
using LoginManagementAPI.Services;
using PersistenceData.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements login service interface.
	/// </summary>
	public class LoginService : ILoginService
	{
		private readonly IPersistenceService _persistenceService;

		public LoginService()
		{
			this._persistenceService = new PersistenceService();
		}

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
		public UserModel Register(RegisterModel model)
		{
			UserDataModel userDataModel = this._persistenceService.RegisterUser(model);
			var userModel = new UserModel();

			return userModel;
		}
	}
}