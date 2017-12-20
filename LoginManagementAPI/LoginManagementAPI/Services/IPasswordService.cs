namespace LoginManagementAPI.Services
{
	/// <summary>
	/// The password service interface.
	/// </summary>
	public interface IPasswordService
	{
		/// <summary>
		/// Encodes plain password value into cryptographic hashed value for storing in database.
		/// </summary>
		/// <param name="value"></param>
		/// <returns>The encoded password value.</returns>
		string Encode(string value);

		/// <summary>
		/// Generates salt data for password.
		/// </summary>
		/// <returns>The salt data.</returns>
		byte[] GenerateSalt();

		/// <summary>
		/// Checks password.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <param name="password">The password.</param>
		/// <returns>The result of password check.</returns>
		bool CheckPassword(string email, string password);
	}
}