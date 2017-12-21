﻿using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using PersistenceData.Entities;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The login service interface.
	/// </summary>
	public interface ILoginService
	{
		/// <summary>
		/// Validates the user credentials.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user model.</returns>
		User Validate(User model);

		/// <summary>
		/// Registers an user.
		/// </summary>
		/// <param name="model">The register model.</param>
		/// <returns>The user register model.</returns>
		RegisterModel Register(RegisterViewModel model);
	}
}