using System;

namespace PersistenceData.Models
{
	/// <summary>
	/// The agent model class.
	/// </summary>
	public class AgentModel
	{
		/// <summary>
		/// Gets or sets the identifier.
		/// </summary>
		/// <value>The id.</value>
		public int Id { get; set; }

		/// <summary>
		/// Gets or sets the customer identifier.
		/// </summary>
		/// <value>The customer id.</value>
		public int CustomerId { get; set; }
	}
}
