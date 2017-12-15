using System;
using PersistenceData.Models;

namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The user data model.
	/// </summary>
	public class UserDataModel
	{
		/// <summary>
		/// Gets or sets the agent id.
		/// </summary>
		/// <value>The agent id.</value>
		public Guid AgentId { get; set; }

		/// <summary>
		/// Gets or sets the customer id.
		/// </summary>
		/// <value>The customer id.</value>
		public Guid CustomerId { get; set; }

		/// <summary>
		/// Gets or sets the role.
		/// </summary>
		/// <value>The role.</value>
		public Role Role { get; set; }
	}
}