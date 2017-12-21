using System.Web.Http;
using System.Web.Http.Results;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;
using PersistenceData.Entities;

namespace LoginManagementAPI.Api.Controllers
{
	/// <summary>
	/// The login controller.
	/// </summary>
	public class LoginController : ApiController
	{
		private readonly ILoginService _loginService;

		public LoginController()
		{
			this._loginService = new LoginService(ModelState);
		}

		/// <summary>
		/// The default login action.
		/// </summary>
		/// <returns>The value indicating whether user is authenticated or not.</returns>
		[HttpPost]
		[ActionName("Default")]
		public IHttpActionResult Post([FromBody] UserViewModel model)
		{
			// TODO models mapping
			User userModel = new User();

			User result = this._loginService.Validate(userModel);

		    return Ok(result);

		}

		/// <summary>
		/// The register action.
		/// </summary>
		/// <param name="model">The <see cref="RegisterViewModel"/> model.</param>
		/// <returns>The registration result.</returns>
		[System.Web.Mvc.HttpPost]
		public IHttpActionResult Put(RegisterViewModel model)
		{
			//TODO models mapping
			//var registerModel = new RegisterModel { Email = model.Email, FullName = model.FullName, Password = model.Password };
			
			RegisterModel updatedModel = this._loginService.Register(model);

			var result = Ok(updatedModel != null ? (object)updatedModel : ModelState);

			return result;
		}
	}
}
