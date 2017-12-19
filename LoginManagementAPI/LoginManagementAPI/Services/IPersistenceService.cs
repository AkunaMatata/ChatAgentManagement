using System;
using LoginManagementAPI.Models;
using PersistenceData.Models;

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
}
