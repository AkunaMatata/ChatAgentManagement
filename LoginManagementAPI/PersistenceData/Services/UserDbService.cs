using System.Data.Entity;
using System.Data.Entity.Core;
using System.Linq;
using PersistenceData.Contexts;
using PersistenceData.Models;

namespace PersistenceData.Services
{
	/// <summary>
	/// Implements user db service interface.
	/// </summary>
	public class UserDbService : IUserDbService
	{
		public UserDbService()
		{
			Database.SetInitializer<UserContext>(new DropCreateDatabaseIfModelChanges<UserContext>());
		}

		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		public UserModel SaveUser(UserModel userModel)
		{
			using (UserContext userDbContext = new UserContext())
			{
				userDbContext.Users.Add(userModel);
				userDbContext.SaveChanges();

				return userDbContext.Users.First(x => x.Email.Equals(userModel.Email));
			}
		}

		/// <summary>
		/// Gets a user by an email.
		/// </summary>
		/// <param name="email">The email.</param>
		/// <returns>The user model.</returns>
		public UserModel GetUserByEmail(string email)
		{
			using (UserContext userDbContext = new UserContext())
			{
				UserModel user = userDbContext.Users.FirstOrDefault(x => x.Email.Equals(email));

				if (user == null)
				{
					throw new ObjectNotFoundException("The user with the specified email was not found");
				}

				return user;
			}
		}
	}
}