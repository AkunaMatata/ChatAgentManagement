using System.Data.Entity;
using PersistenceData.Models;

namespace PersistenceData.Contexts
{
	/// <summary>
	/// The db context for user entity.
	/// </summary>
	public class UserContext : DbContext
	{
		public UserContext()
			: base("DbConnection")
		{ }

		/// <summary>
		/// Gets or sets the users.
		/// </summary>
		/// <value>The users</value>
		public DbSet<UserModel> Users { get; set; }
	}
}
