using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core;
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
		/// <param name="customerModel"></param>
		/// <returns>The added customer.</returns>
		public Customer SaveCustomer(Customer customerModel)
		{
			User defaultUser = SaveCustomerWithDefaultUser(customerModel);
			customerModel.Users.Add(defaultUser);

			return customerModel;
		}

		/// <summary>
		/// Saves new registered user.
		/// </summary>
		/// <param name="userModel">The user model.</param>
		public User SaveUser(User userModel)
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
		/// Generates default user for customer.
		/// </summary>
		/// <param name="customer">The customer.</param>
		/// <returns>The user.</returns>
		private User SaveCustomerWithDefaultUser(Customer customer)
		{
			var user = new User
			{
				Email = customer.Email,
				Name = customer.Name,
				Password = customer.Password,
				Salt = customer.Salt,
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