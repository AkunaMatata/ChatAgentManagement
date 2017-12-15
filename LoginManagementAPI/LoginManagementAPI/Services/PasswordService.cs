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
	}
}