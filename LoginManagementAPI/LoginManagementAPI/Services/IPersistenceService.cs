using LoginManagementAPI.Models;
using PersistenceData.Models;
using PersistenceData.Services;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The interface for working with persistence layer.
	/// </summary>
	public interface IPersistenceService
	{
		/// <summary>
		/// Registers and saves a user in database.
		/// </summary>
		/// <param name="registerModel">The register model.</param>
		/// <returns>The user data model.</returns>
		UserDataModel RegisterUser(RegisterModel registerModel);

		/// <summary>
		/// Gets a user by email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user data model.</returns>
		UserDataModel GetUserByEmail(string email);
	}

	public class PersistenceService : IPersistenceService
	{
		private readonly IUserDbService userDbService;

		public PersistenceService()
		{
			this.userDbService = new UserDbService();
		}

		/// <summary>
		/// Registers and saves a user in database.
		/// </summary>
		/// <param name="registerModel">The register model.</param>
		/// <returns>The user data model.</returns>
		public UserDataModel RegisterUser(RegisterModel registerModel)
		{
			var userModel = new UserModel();
			UserModel userAddedModel = this.userDbService.SaveUser(userModel);

			return new UserDataModel { Role = userAddedModel.Role };
		}

		/// <summary>
		/// Gets a user by email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user data model.</returns>
		public UserDataModel GetUserByEmail(string email)
		{
			throw new System.NotImplementedException();
		}
	}
}
