using System.Collections.Generic;
using System.Web.Http;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;

namespace LoginManagementAPI.Api.Controllers
{
	/// <summary>
	/// The users controller.
	/// </summary>
	public class UsersController : ApiController
	{
		private readonly IUserService _userService;

		/// <summary>
		/// Initializes new <see cref="UsersController"/> instance.
		/// </summary>
		public UsersController()
		{
			_userService = new UserService();
		}

		/// <summary>
		/// The get all users action.
		/// </summary>
		/// <returns>The registration result.</returns>
		[HttpGet]
		public IHttpActionResult Get()
		{
			IEnumerable<UserDetails> usersList = _userService.GetAllUsers();
		    var result = Ok(usersList);

			return result;
		}

		/// <summary>
		/// The get all users action.
		/// </summary>
		/// <returns>The registration result.</returns>
		[HttpGet]
		public IHttpActionResult Get(int id)
		{
			UserDetails usersList = _userService.GetById(id);
		    var result = Ok(usersList);

			return result;
		}
	}
}