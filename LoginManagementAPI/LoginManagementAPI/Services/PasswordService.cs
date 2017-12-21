using System;
using System.Security.Cryptography;
using LoginManagementAPI.Models;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements password service interface.
	/// </summary>
	public class PasswordService : IPasswordService
	{
		/// <summary>
		/// Initializes new <see cref="PasswordService"/> instance.
		/// </summary>
		public PasswordService()
		{
		}

		/// <summary>
		/// Encodes plain password value into cryptographic hashed value for storing in database.
		/// </summary>
		/// <param name="value"></param>
		/// <returns>The encoded password value.</returns>
		public string Encode(string value)
		{
			var sha1Hash = SHA1.Create();
			var encoder = new System.Text.ASCIIEncoding();
			byte[] bytesSequence = encoder.GetBytes(value ?? "");

			return BitConverter.ToString(sha1Hash.ComputeHash(bytesSequence)).ToLower().Replace("-", "");
		}

		/// <summary>
		/// Generates salt data for password.
		/// </summary>
		/// <returns>The salt data.</returns>
		public string GenerateSalt()
		{
			var salt = new byte[20];
			var random = new Random();
			random.NextBytes(salt);

			return System.Text.Encoding.Default.GetString(salt);
		}

		/// <summary>
		/// Checks password.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <param name="password">The password.</param>
		/// <param name="userModel">The user model.</param>
		/// <returns>The result of password check.</returns>
		public bool CheckPassword(string email, string password, UserDataModel userModel)
		{
			string savedPassword = userModel.Password;
			var actualPassword = string.Concat(Encode(password), userModel.Salt);

			return savedPassword.Equals(actualPassword, StringComparison.OrdinalIgnoreCase);
		}
	}
}