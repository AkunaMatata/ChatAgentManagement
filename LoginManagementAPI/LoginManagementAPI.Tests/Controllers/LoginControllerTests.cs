using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoginManagementAPI.Api.Controllers;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Services;
using Moq;

namespace LoginManagementAPI.Tests.Controllers
{
	/// <summary>
	/// Unit tests for <see cref="LoginController"/>.
	/// </summary>
	[TestClass]
	public class LoginControllerTests
	{
		private Mock<IAuthenticationService> _mockedAuthenticationService;

		/// <summary>
		/// The initialize method.
		/// </summary>
		[TestInitialize]
		public void Initialize()
		{
			this._mockedAuthenticationService = new Mock<IAuthenticationService>();
		}

		[TestMethod]
		public void Index()
		{
			// Arrange
			LoginController controller = new LoginController(this._mockedAuthenticationService.Object);
			var fakeModel = new UserViewModel { Email = "testEmail", Password = "12345" };

			// Act
			JsonResult result = controller.Index(fakeModel);

			// Assert
			Assert.IsNotNull(result);
			Assert.IsTrue(((string) result.Data).ToLower().Contains("login"));
		}
	}
}
