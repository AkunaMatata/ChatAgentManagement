using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Results;
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
		/// The get user by id action.
		/// </summary>
		/// <returns>The action result.</returns>
		[HttpGet]
		public IHttpActionResult Get(int id)
		{
			UserDetails userDetails = _userService.GetById(id);
		    OkNegotiatedContentResult<UserDetails> result = Ok(userDetails);

			return result;
		}

		/// <summary>
		/// The user post action.
		/// </summary>
		/// <param name="model">The user view model.</param>
		/// <returns></returns>
		[HttpPost]
		public IHttpActionResult Post(UserViewModel model)
		{
			UserDetails user = _userService.SaveUser(model);
			OkNegotiatedContentResult<UserDetails> result = Ok(user);

			return result;
		}

		/// <summary>
		/// The user put action.
		/// </summary>
		/// <param name="model">The model to update.</param>
		/// <returns>The updated model.</returns>
		[HttpPut]
		public IHttpActionResult Put(UserViewModel model)
		{
			UserDetails updatedModel = _userService.UpdateUser(model);
			OkNegotiatedContentResult<object> result = Ok(updatedModel != null ? (object)updatedModel : ModelState);

			return result;
		}
	}
}