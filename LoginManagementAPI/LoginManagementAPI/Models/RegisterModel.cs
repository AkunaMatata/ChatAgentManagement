namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The register model.
	/// </summary>
	public class RegisterModel
	{
		/// <summary>
		/// Gets or sets the agent id.
		/// </summary>
		/// <value>The agent id.</value>
		public int AgentId { get; set; }

		/// <summary>
		/// Gets or sets the customer id.
		/// </summary>
		/// <value>The customer id.</value>
		public int CustomerId { get; set; }

		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets the full name.
		/// </summary>
		/// <value>The full name.</value>
		public string FullName { get; set; }

		/// <summary>
		/// Gets or sets the password.
		/// </summary>
		/// <value>The password.</value>
		public string Password { get; set; }
	}
}