﻿using System.Web.Http;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using LoginManagementAPI.Api.Controllers;
using LoginManagementAPI.Api.ViewModels;
using LoginManagementAPI.Models;
using LoginManagementAPI.Services;
using Moq;
using PersistenceData.Entities;
using PersistenceData.Models;

namespace LoginManagementAPI.Tests.Controllers
{
	/// <summary>
	/// Unit tests for <see cref="LoginController"/>.
	/// </summary>
	[TestClass]
	public class LoginControllerTests
	{
		private Mock<ILoginService> _mockedLoginService;

		/// <summary>
		/// The initialize method.
		/// </summary>
		[TestInitialize]
		public void Initialize()
		{
			_mockedLoginService = new Mock<ILoginService>();
		}

		/// <summary>
		/// Index method should return not null model.
		/// </summary>
		[TestMethod]
		public void LoginControllerIndexReturnsNotNullModel()
		{
			// Arrange
			LoginController controller = new LoginController();
			var fakeModel = new RegisterViewModel { Email = "testEmail", Password = "12345" };
			this._mockedLoginService.Setup(x => x.Validate(It.IsAny<User>())).Returns(new User());

			// Act
			var result = controller.Post(fakeModel);

			// Assert
			Assert.IsNotNull(result);
		}
	}
}
