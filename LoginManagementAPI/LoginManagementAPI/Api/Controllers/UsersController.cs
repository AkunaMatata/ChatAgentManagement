using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;

namespace LoginManagementAPI.Api.Controllers
{
	/// <summary>
	/// The users controller.
	/// </summary>
	public class UsersController : ApiController
	{
		private IUserService _userService;

		/// <summary>
		/// Initializes new <see cref="UsersController"/> instance.
		/// </summary>
		public UsersController()
		{
			_userService = new UserService();
		}

		/// <summary>
		/// The register action.
		/// </summary>
		/// <returns>The registration result.</returns>
		[System.Web.Mvc.HttpGet]
		[System.Web.Http.Route("api/users/getall")]
		public JsonResult GetAll()
		{
			IEnumerable<UserDetails> usersList = _userService.GetAllUsers();

			var result = new JsonResult { Data = usersList };

			return result;
		}
	}
}