using System;
using System.Net.Mail;
using LoginManagementAPI.Models;
using PersistenceData.Models;
using ModelStateDictionary = System.Web.Http.ModelBinding.ModelStateDictionary;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements login service interface.
	/// </summary>
	public class LoginService : ILoginService
	{
		private ModelStateDictionary _modelState;
		private readonly IPersistenceService _persistenceService;

		public LoginService(ModelStateDictionary modelState)
		{
			this._modelState = modelState;
			this._persistenceService = new PersistenceService();
		}

		private bool ValidateRegisterModel(RegisterModel registerModel)
		{
			if (registerModel == null)
			{
				throw new ArgumentNullException("Register model is null.");
			}

			if (registerModel.FullName.Trim().Length == 0)
				_modelState.AddModelError("FullName", "FullName is required.");

			if (registerModel.Email.Trim().Length == 0)
				_modelState.AddModelError("Email", "Email is required.");

			if (!this.ValidateEmail(registerModel.Email.Trim()))
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
		public UserModel Validate(UserModel model)
		{
			return model;
		}

		/// <summary>
		/// Registers an user.
		/// </summary>
		/// <param name="model">The register model.</param>
		/// <returns>The user register model.</returns>
		public RegisterModel Register(RegisterModel model)
		{
			if (this.ValidateRegisterModel(model))
			{
				return null;
			}

			UserDataModel userDataModel = this._persistenceService.RegisterUser(model);
			var registerModel = new RegisterModel {};

			// TODO populate with agent id and customer id

			return registerModel;
		}
	}
}