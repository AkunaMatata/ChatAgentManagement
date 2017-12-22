using System.Collections.Generic;
using PersistenceData.Entities;

namespace PersistenceData.Services
{
	/// <summary>
	/// Interface for working with user database entity.
	/// </summary>
	public interface IUserDbService
	{
		/// <summary>
		/// Saves customer.
		/// </summary>
		/// <param name="customerModel">The customer model.</param>
		/// <param name="userPassword">The default user password.</param>
		/// <param name="salt">The salt.</param>
		/// <returns>The customer model.</returns>
		Customer SaveCustomer(Customer customerModel, string userPassword, string salt);

		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		/// <param name="userPassword">The default user password.</param>
		/// <param name="salt">The salt.</param>
		/// <returns>The user model.</returns>
		User SaveUser(User userModel, string userPassword, string salt);

		/// <summary>
		/// Gets a user by an email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user model.</returns>
		User GetUserByEmail(string email);

		/// <summary>
		/// Gets all users.
		/// </summary>
		/// <returns>The collection of users.</returns>
		IEnumerable<User> GetAll();

		/// <summary>
		/// Gets user by id.
		/// </summary>
		/// <param name="id">The identifier.</param>
		/// <returns>The user entity.</returns>
		User GetUserById(int id);

		/// <summary>
		/// Updates the user.
		/// </summary>
		/// <param name="user">The user.</param>
		/// <returns>The updated model.</returns>
		User UpdateUser(User user);
	}
}
