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
		/// <param name="userModel"></param>
		/// <returns>The user data model.</returns>
		UserDataModel RegisterUser(UserModel userModel);

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
		/// <param name="userModel"></param>
		/// <returns>The user data model.</returns>
		public UserDataModel RegisterUser(UserModel userModel)
		{
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
