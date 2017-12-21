using System;
using System.Net.Mail;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using PersistenceData.Entities;
using ModelStateDictionary = System.Web.Http.ModelBinding.ModelStateDictionary;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements login service interface.
	/// </summary>
	public class LoginService : ILoginService
	{
		private readonly ModelStateDictionary _modelState;
		private readonly IPersistenceService _persistenceService;

		public LoginService(ModelStateDictionary modelState)
		{
			this._modelState = modelState;
			this._persistenceService = new PersistenceService();
		}

		private bool ValidateRegisterModel(RegisterViewModel registerModel)
		{
			if (registerModel == null)
			{
				throw new ArgumentNullException("Register model is null.");
			}

			if (registerModel.FullName.Trim().Length == 0)
				_modelState.AddModelError("FullName", "FullName is required.");

			if (registerModel.Email.Trim().Length == 0)
				_modelState.AddModelError("Email", "Email is required.");

			if (!ValidateEmail(registerModel.Email.Trim()))
			{
				_modelState.AddModelError("Email", "Email format is incorrect.");
			}

			if (registerModel.Password.Trim().Length == 0)
				_modelState.AddModelError("Password", "Password is required.");
			
			return _modelState.IsValid;
		}

		/// <summary>
		/// Validates an email.
		/// </summary>
		/// <param name="emailaddress">The email address to validate.</param>
		/// <returns>The email validation result.</returns>
		public bool ValidateEmail(string emailaddress)
		{
			try
			{
				MailAddress m = new MailAddress(emailaddress);

				return true;
			}
			catch (FormatException)
			{
				return false;
			}
		}

		/// <summary>
		/// Validates the user credentials.
		/// </summary>
		/// <param name="model">The user model.</param>
		/// <returns>The user model.</returns>
		public User Validate(User model)
		{
			return model;
		}

		/// <summary>
		/// Registers an user.
		/// </summary>
		/// <param name="model">The register model.</param>
		/// <returns>The user register model.</returns>
		public RegisterModel Register(RegisterViewModel model)
		{
			if (!ValidateRegisterModel(model))
			{
				return null;
			}

			UserDataModel userDataModel = this._persistenceService.RegisterUser(model);

			var registerModel = new RegisterModel
			{
				AgentId = userDataModel.AgentId,
				CustomerId = userDataModel.CustomerId,
				Role = userDataModel.Role.ToString()
			};

			return registerModel;
		}

		
	}
}