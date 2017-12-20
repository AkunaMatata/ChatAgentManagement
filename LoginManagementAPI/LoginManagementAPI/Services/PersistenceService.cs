using System.Collections.Generic;
using System.Linq;
using LoginManagementAPI.Models;
using PersistenceData.Entities;
using PersistenceData.Services;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements persistence service interface.
	/// </summary>
	public class PersistenceService : IPersistenceService
	{
		private readonly IUserDbService _userDbService;
		private readonly IPasswordService _passwordService;

		public PersistenceService()
		{
			_userDbService = new UserDbService();
			_passwordService = new PasswordService();

		}

		/// <summary>
		/// Registers and saves a user in database.
		/// </summary>
		/// <param name="registerModel">The register model.</param>
		/// <returns>The user data model.</returns>
		public UserDataModel RegisterUser(RegisterModel registerModel)
		{
			// TODO models mapping
			var model = new Customer
			{
				Email = registerModel.Email,
				Password = registerModel.Password,
				Name = registerModel.FullName
			};

			model.Password = _passwordService.Encode(model.Password);
			model.Salt = _passwordService.GenerateSalt();
			model.Password = string.Concat(model.Password, model.Salt);

			Customer userAddedModel = this._userDbService.SaveCustomer(model);

			return new UserDataModel { AgentId = userAddedModel.Users.First().Id, Role = userAddedModel.Users.First().Role };
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

		/// <summary>
		/// Retrieves all users.
		/// </summary>
		/// <returns>The users collection.</returns>
		public IEnumerable<UserDataModel> GetAllUsers()
		{
			IEnumerable<User> users = _userDbService.GetAll();
			var userModelsList = new List<UserDataModel>();

			foreach (User user in users)
			{
				var userModel = new UserDataModel {AgentId = user.Id, CustomerId = user.CustomerId };
				userModelsList.Add(userModel);
			}

			return userModelsList;
		}
	}
}