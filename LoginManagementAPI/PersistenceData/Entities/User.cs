using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PersistenceData.Models;

namespace PersistenceData.Entities
{
	/// <summary>
	/// The user model.
	/// </summary>
	public class User
	{
		/// <summary>
		/// The identifier.
		/// </summary>
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int Id { get; set; }

		/// <summary>
		/// The password.
		/// </summary>
		public string Password { get; set; }

		/// <summary>
		/// Gets or sets the name.
		/// </summary>
		/// <value>The name.</value>
		public string Name { get; set; }

		/// <summary>
		/// The email.
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// The flag indicating whether user is active or not.
		/// </summary>
		public bool IsActive { get; set; }

		/// <summary>
		/// The user role.
		/// </summary>
		public Role Role { get; set; }

		/// <summary>
		/// The created date.
		/// </summary>
		public DateTime CreatedDate { get; set; }

		/// <summary>
		/// Gets or sets the salt.
		/// </summary>
		/// <value>The salt.</value>
		public string Salt { get; set; }

		public Customer Customer { get; set; }

		[ForeignKey("Customer")]
		public int CustomerId { get; set; }
	}
}
