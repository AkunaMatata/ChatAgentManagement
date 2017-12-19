using System;
using System.Security.Cryptography;

namespace LoginManagementAPI.Services
{
	/// <summary>
	/// Implements password service interface.
	/// </summary>
	public class PasswordService : IPasswordService
	{
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
		public byte[] GenerateSalt()
		{
			var salt = new byte[20];
			var random = new Random();

			random.NextBytes(salt);

			return salt;
		}

		/// <summary>
		/// Checks password.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <param name="password">The password.</param>
		/// <returns></returns>
		private bool CheckPassword(string email, string password)
		{
			// get from db salt and pass
			return true;
		}
	}
}