using LoginManagementAPI.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace LoginManagementAPI.Tests.ServicesTests
{
	/// <summary>
	/// The password service tests.
	/// </summary>
	[TestClass]
	public class PasswordServiceTests
	{
		private IPasswordService service;

		/// <summary>
		/// The initialize method.
		/// </summary>
		[TestInitialize]
		public void Initialize()
		{
			service = new PasswordService();
		}

		/// <summary>
		/// Call to encode method should returns the same values for two equal passwords.
		/// </summary>
		[TestMethod]
		public void EncodeCreatesTwoEqualValuesForTwoEqualPasswords()
		{
			// Arrange
			string password1 = "12345";
			string password2 = "12345";

			// Act
			string encoded1 = service.Encode(password1);
			string encoded2 = service.Encode(password2);

			// Assert
			Assert.AreEqual(encoded2, encoded1, "Passwords should be equal");
		}

		/// <summary>
		/// Call to encode method should returns different values for two different passwords.
		/// </summary>
		[TestMethod]
		public void EncodeCreatesDifferentValuesForTwoDifferentPasswords()
		{
			// Arrange
			string password1 = "12345";
			string password2 = "12385";

			// Act
			string encoded1 = service.Encode(password1);
			string encoded2 = service.Encode(password2);

			// Assert
			Assert.AreNotEqual(encoded2, encoded1, "Passwords should not be equal");
		}
	}
}
