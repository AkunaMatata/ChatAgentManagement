using System.Web.Mvc;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;

namespace LoginManagementAPI.Api.Controllers
{
	/// <summary>
	/// The login controller.
	/// </summary>
	public class LoginController : Controller
	{
		private readonly IAuthenticationService _authenticationService;

		public LoginController(IAuthenticationService authenticationService)
		{
			this._authenticationService = authenticationService;
		}

		/// <summary>
		/// The default login action.
		/// </summary>
		/// <returns>The value indicating whether user is authenticated or not.</returns>
		[HttpPost]
		public JsonResult Index(UserViewModel model)
		{
			// TODO models mapping
			User user = new User();

			var result = this._authenticationService.Validate(model) ? "login success" : "login failed";

			return new JsonResult
			{
				Data = result
			};
		}
	}
}
