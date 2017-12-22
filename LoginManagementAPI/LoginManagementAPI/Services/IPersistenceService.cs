﻿using System;
using System.Collections.Generic;
using LoginManagementAPI.Api.ViewModels;
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
		UserDataModel RegisterUser(RegisterViewModel registerModel);

		/// <summary>
		/// Gets a user by email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user data model.</returns>
		UserDataModel GetUserByEmail(string email);

		/// <summary>
		/// Retrieves all users.
		/// </summary>
		/// <returns>The users collection.</returns>
		IEnumerable<UserDataModel> GetAllUsers();

		/// <summary>
		/// Gets user by id.
		/// </summary>
		/// <param name="id">The id.</param>
		/// <returns>The use data model.</returns>
		UserDataModel GetUserById(int id);

		/// <summary>
		/// Saves the user.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user data model.</returns>
		UserDataModel SaveUser(UserViewModel model);

		/// <summary>
		/// Updates the user.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user data model.</returns>
		UserDataModel UpdateUser(UserViewModel model);
	}
}
