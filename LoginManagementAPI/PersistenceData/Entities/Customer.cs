using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersistenceData.Entities
{
	/// <summary>
	/// The customer entity class.
	/// </summary>
	public class Customer
	{
		/// <summary>
		/// Gets or set the identifier.
		/// </summary>
		/// <value>The identifier.</value>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		/// <summary>
		/// Gets or sets the name.
		/// </summary>
		/// <value>The name.</value>
		public string Name { get; set; }

		/// <summary>
		/// Gets or sets the email.
		/// </summary>
		/// <value>The email.</value>
		public string Email { get; set; }


		/// <summary>
		/// Gets or sets the users.
		/// </summary>
		/// <value>The users.</value>
		public ICollection<User> Users { get; set; }
	}
}
