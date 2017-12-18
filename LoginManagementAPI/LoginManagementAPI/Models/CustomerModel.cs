using System.Collections.Generic;
using PersistenceData.Models;

namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The customer model.
	/// </summary>
	public class CustomerModel
	{
		/// <summary>
		/// Gets or set the identifier.
		/// </summary>
		/// <value>The identifier.</value>
		public int Id { get; set; }

		/// <summary>
		/// Gets or sets the name.
		/// </summary>
		/// <value>The name.</value>
		public string Name { get; set; }

		/// <summary>
		/// Gets or sets the users list.
		/// </summary>
		/// <value>The users.</value>
		public IEnumerable<UserModel> Users { get; set; }
	}
}