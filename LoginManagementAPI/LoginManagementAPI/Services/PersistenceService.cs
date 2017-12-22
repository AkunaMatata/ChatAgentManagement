using System;
using System.Collections.Generic;
using System.Linq;
using LoginManagementAPI.Api.ViewModels;
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
		public UserDataModel RegisterUser(RegisterViewModel registerModel)
		{
			// TODO models mapping
			var model = new Customer
			{
				Email = registerModel.Email,
				Name = registerModel.FullName
			};

			//			model.Password = _passwordService.Encode(model.Password);
			//			model.Salt = _passwordService.GenerateSalt();
			//			model.Password = string.Concat(model.Password, model.Salt);
			
			string defaultUserSalt = _passwordService.GenerateSalt();
			string defaultUserPassword = string.Concat(_passwordService.Encode(registerModel.Password), defaultUserSalt);

			Customer userAddedModel = this._userDbService.SaveCustomer(model, defaultUserPassword, defaultUserSalt);

			return new UserDataModel { CustomerId = userAddedModel.Id, AgentId = userAddedModel.Users.First().Id, Role = userAddedModel.Users.First().Role };
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
				var userModel = new UserDataModel { AgentId = user.Id, CustomerId = user.CustomerId, FirstName = user.FirstName, Email = user.Email };
				userModelsList.Add(userModel);
			}

			return userModelsList;
		}

		/// <summary>
		/// Gets user by id.
		/// </summary>
		/// <param name="id">The id.</param>
		/// <returns>The use data model.</returns>
		public UserDataModel GetUserById(int id)
		{
			User userEntiry = _userDbService.GetUserById(id);
			var userModel = new UserDataModel { AgentId = userEntiry.Id, CustomerId = userEntiry.CustomerId, FirstName = userEntiry.FirstName, Email = userEntiry.Email };

			return userModel;
		}

		public UserDataModel SaveUser(UserViewModel model)
		{
			var user = new User
			{
				FirstName = model.FirstName,
				LastName = model.LastName,
				CustomerId = model.CustomerId,
				Email = model.Email,
				CreatedDate = DateTime.UtcNow
			};

			string userSalt = _passwordService.GenerateSalt();
			string userPassword = string.Concat(_passwordService.Encode(model.Password), userSalt);

			user = _userDbService.SaveUser(user, userPassword, userSalt);

			var userModel = new UserDataModel
			{
				AgentId = user.Id,
				CustomerId = user.CustomerId,
				Role = user.Role,
				FirstName = user.FirstName,
				LastName = user.FirstName,
				Email = user.Email
			};

			return userModel;
		}

		/// <summary>
		/// Updates the user.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user data model.</returns>
		public UserDataModel UpdateUser(UserViewModel model)
		{
			var user = new User
			{
				Id = model.Id,
				FirstName = model.FirstName,
				LastName = model.LastName,
				CustomerId = model.CustomerId,
				Email = model.Email,
				Role = model.Role,
				IsActive = model.IsActive
			};

			user = _userDbService.UpdateUser(user);

			var userModel = new UserDataModel
			{
				AgentId = user.Id,
				CustomerId = user.CustomerId,
				Role = user.Role,
				FirstName = user.FirstName,
				LastName = user.FirstName,
				Email = user.Email
			};

			return userModel;
		}
	}
}