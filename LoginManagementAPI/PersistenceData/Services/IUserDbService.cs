using System;
using PersistenceData.Models;

namespace PersistenceData.Services
{
	/// <summary>
	/// Interface for working with user database entity.
	/// </summary>
	public interface IUserDbService
	{
		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		/// <returns>The user model.</returns>
		UserModel SaveUser(UserModel userModel);

		/// <summary>
		/// Gets a user by an email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user model.</returns>
		UserModel GetUserByEmail(string email);
	}
}
