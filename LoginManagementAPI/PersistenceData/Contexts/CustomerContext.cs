using System.Data.Entity;
using PersistenceData.Entities;

namespace PersistenceData.Contexts
{
	/// <summary>
	/// The db context for customer entity.
	/// </summary>
	public class CustomerContext : DbContext
	{
		public CustomerContext()
			: base("DbConnection")
		{ }

		/// <summary>
		/// Gets or sets the customers.
		/// </summary>
		/// <value>The customers</value>
		public DbSet<Customer> Customers { get; set; }
	}
}