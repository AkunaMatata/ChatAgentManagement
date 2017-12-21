using PersistenceData.Models;

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
		/// Gets or sets the role.
		/// </summary>
		public string Role { get; set; }
	}
}