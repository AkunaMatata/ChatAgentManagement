using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Globalization;
using System.Linq;
using PersistenceData.Contexts;
using PersistenceData.Entities;

namespace PersistenceData.Services
{
	/// <summary>
	/// Implements user db service interface.
	/// </summary>
	public class UserDbService : IUserDbService
	{
		public UserDbService()
		{
//			Database.SetInitializer<UserContext>(new DropCreateDatabaseAlways<UserContext>());
//			Database.SetInitializer<CustomerContext>(new DropCreateDatabaseAlways<CustomerContext>());
		}

		/// <summary>
		/// Saves customer.
		/// </summary>
		/// <param name="customerModel">The customer model.</param>
		/// <param name="userPassword">The default user password.</param>
		/// <param name="salt">The salt.</param>
		/// <returns>The customer model.</returns>
		public Customer SaveCustomer(Customer customerModel, string userPassword, string salt)
		{
			User defaultUser = SaveCustomerWithDefaultUser(customerModel, userPassword, salt);
			customerModel.Users.Add(defaultUser);

			return customerModel;
		}

		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		/// <param name="userPassword">The default user password.</param>
		/// <param name="salt">The salt.</param>
		public User SaveUser(User userModel, string userPassword, string salt)
		{
			userModel.Password = userPassword;
			userModel.Salt = salt;

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
		public User GetUserByEmail(string email)
		{
			using (UserContext userDbContext = new UserContext())
			{
				User user = userDbContext.Users.FirstOrDefault(x => x.Email.Equals(email));

				if (user == null)
				{
					throw new ObjectNotFoundException("The user with the specified email was not found");
				}

				return user;
			}
		}

		/// <summary>
		/// Gets all users.
		/// </summary>
		/// <returns>The collection of users.</returns>
		public IEnumerable<User> GetAll()
		{
			IList<User> users;

			using (UserContext dbContext = new UserContext())
			{
				users = dbContext.Users.ToList();
			}

			return users;
		}

		/// <summary>
		/// Gets user by id.
		/// </summary>
		/// <param name="id">The identifier.</param>
		/// <returns>The user entity.</returns>
		public User GetUserById(int id)
		{
			User user;

			using (UserContext dbContext = new UserContext())
			{
				user = dbContext.Users.FirstOrDefault(x => x.Id == id);
			}

			if (user == null)
			{
				throw new ObjectNotFoundException(string.Format(CultureInfo.InvariantCulture, "The user with id {0} was not found.", id));
			}

			return user;
		}

		/// <summary>
		/// Updates the user.
		/// </summary>
		/// <param name="user">The user.</param>
		/// <returns>The updated model.</returns>
		public User UpdateUser(User user)
		{
			using (UserContext dbContext = new UserContext())
			{
				var result = dbContext.Users.SingleOrDefault(b => b.Id == user.Id);

				if (result != null)
				{
					result.CustomerId = user.CustomerId;
					result.Email = user.Email;
					result.FirstName = user.FirstName;
					result.LastName = user.LastName;
					result.IsActive = user.IsActive;
					result.Role = user.Role;
					user = result;

					dbContext.SaveChanges();
				}
			}

			return user;
		}

		/// <summary>
		/// Generates default user for customer.
		/// </summary>
		/// <param name="customer">The customer.</param>
		/// <param name="userPassword">The default user password.</param>
		/// <param name="salt">The salt.</param>
		/// <returns>The user.</returns>
		private User SaveCustomerWithDefaultUser(Customer customer, string userPassword, string salt)
		{
			var user = new User
			{
				Email = customer.Email,
				FirstName = customer.Name,
				Password = userPassword,
				Salt = salt,
				Customer = customer,
				CreatedDate = DateTime.UtcNow
			};

			using (UserContext userDbContext = new UserContext())
			{
				userDbContext.Users.Add(user);
				userDbContext.SaveChanges();
				
				User addedUser = userDbContext.Users.FirstOrDefault(x => x.Email.Equals(user.Email));

				if (addedUser == null)
				{
					throw new ObjectNotFoundException("The user was not created.");
				}

				return addedUser;
			}
		}
	}
}