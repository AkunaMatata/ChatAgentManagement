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
		/// <returns>The customer model.</returns>
		Customer SaveCustomer(Customer customerModel);

		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		/// <returns>The user model.</returns>
		User SaveUser(User userModel);

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
	}
}
