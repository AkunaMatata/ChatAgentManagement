using System.Collections.Generic;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The class implementing user service interface.
	/// </summary>
	public class UserService : IUserService
	{
		private IPersistenceService _persistenceService;

		/// <summary>
		/// Initializes a <see cref="UserService"/> instance.
		/// </summary>
		public UserService()
		{
			_persistenceService = new PersistenceService();
		}

		/// <summary>
		/// Gets all users.
		/// </summary>
		/// <returns>The collection of users.</returns>
		public IEnumerable<UserDetails> GetAllUsers()
		{
			IEnumerable<UserDataModel> users = _persistenceService.GetAllUsers();
			var usersList = new List<UserDetails>();

			foreach (UserDataModel model in users)
			{
				usersList.Add(new UserDetails { UserId = model.AgentId, Name = model.FirstName, Email = model.Email });
			}

			return usersList;
		}

		/// <summary>
		/// Gets user by the identifier.
		/// </summary>
		/// <param name="id">The identifier.</param>
		/// <returns>The user details model.</returns>
		public UserDetails GetById(int id)
		{
			UserDataModel userDataModel = _persistenceService.GetUserById(id);
			var userDetails = new UserDetails { UserId = userDataModel.AgentId, Name = userDataModel.FirstName, Email = userDataModel.Email };

			return userDetails;
		}

		/// <summary>
		/// Saves new user.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>The user details.</returns>
		public UserDetails SaveUser(UserViewModel model)
		{
			UserDataModel userDataModel = _persistenceService.SaveUser(model);
			var userDetails = new UserDetails { UserId = userDataModel.AgentId, Name = userDataModel.FirstName, Email = userDataModel.Email };

			return userDetails;
		}


		/// <summary>
		/// Updates user.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>The user details.</returns>
		public UserDetails UpdateUser(UserViewModel model)
		{
			UserDataModel userDataModel = _persistenceService.UpdateUser(model);
			var userDetails = new UserDetails { UserId = userDataModel.AgentId, Name = userDataModel.FirstName, Email = userDataModel.Email };

			return userDetails;
		}
	}
}