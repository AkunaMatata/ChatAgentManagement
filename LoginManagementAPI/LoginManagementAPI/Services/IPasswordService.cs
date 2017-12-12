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
	}
}