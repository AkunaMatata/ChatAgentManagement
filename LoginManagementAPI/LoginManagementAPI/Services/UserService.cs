using System.Collections.Generic;
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
				usersList.Add(new UserDetails { UserId = model.AgentId });
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
			throw new System.NotImplementedException();
		}
	}
}