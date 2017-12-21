using System.Web.Http;
using System.Web.Mvc;
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
			this._loginService = new LoginService(this.ModelState);
		}

		/// <summary>
		/// The default login action.
		/// </summary>
		/// <returns>The value indicating whether user is authenticated or not.</returns>
		[System.Web.Http.HttpPost]
		[System.Web.Http.ActionName("Default")]
		public JsonResult Post([FromBody] UserViewModel model)
		{
			// TODO models mapping
			User userModel = new User();

			User result = this._loginService.Validate(userModel);

			return new JsonResult
			{
				Data = result,
				JsonRequestBehavior = JsonRequestBehavior.AllowGet
			};
		}

		/// <summary>
		/// The register action.
		/// </summary>
		/// <param name="model">The <see cref="RegisterViewModel"/> model.</param>
		/// <returns>The registration result.</returns>
		[System.Web.Mvc.HttpPost]
		[System.Web.Http.Route("api/login/register")]
		public JsonResult Register(RegisterViewModel model)
		{
			//TODO models mapping
			//var registerModel = new RegisterModel { Email = model.Email, FullName = model.FullName, Password = model.Password };
			
			RegisterModel updatedModel = this._loginService.Register(model);

			var result = new JsonResult {Data = updatedModel != null ? (object) updatedModel : this.ModelState};

			return result;
		}
	}
}
