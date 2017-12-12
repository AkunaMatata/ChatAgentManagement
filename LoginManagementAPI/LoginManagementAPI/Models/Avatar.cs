using System;

namespace LoginManagementAPI.Models
{
	/// <summary>
	/// The class for user avatar.
	/// </summary>
	public class Avatar
	{
		/// <summary>
		/// The file id.
		/// </summary>
		public Guid FileId { get; set; }

		/// <summary>
		/// The file length.
		/// </summary>
		public long Length { get; set; }

		/// <summary>
		/// The created date.
		/// </summary>
		public DateTime CreatedDate { get; set; }

		/// <summary>
		/// The updated date.
		/// </summary>
		public DateTime UpdatedDate { get; set; }
	}
}