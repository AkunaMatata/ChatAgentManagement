using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using System.Web.Routing;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;
using PersistenceData.Models;

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
			this._loginService = new LoginService();
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
			UserModel userModel = new UserModel();

			UserModel result = this._loginService.Validate(userModel);

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
			var registerModel = new RegisterModel();
			this._loginService.Register(registerModel);

			return new JsonResult { Data = registerModel };
		}
	}
}
