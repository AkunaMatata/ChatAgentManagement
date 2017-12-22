using System.Collections.Generic;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The users service interface.
	/// </summary>
	public interface IUserService
	{
		/// <summary>
		/// Gets all users.
		/// </summary>
		/// <returns>The collection of users.</returns>
		IEnumerable<UserDetails> GetAllUsers();

		/// <summary>
		/// Gets user by the identifier.
		/// </summary>
		/// <param name="id">The identifier.</param>
		/// <returns>The user details model.</returns>
		UserDetails GetById(int id);

		/// <summary>
		/// Saves new user.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>The user details.</returns>
		UserDetails SaveUser(UserViewModel model);

		/// <summary>
		/// Updates user.
		/// </summary>
		/// <param name="model">The model.</param>
		/// <returns>The user details.</returns>
		UserDetails UpdateUser(UserViewModel model);
	}
}