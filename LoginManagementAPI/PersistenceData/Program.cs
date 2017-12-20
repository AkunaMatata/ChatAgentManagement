using System;
using System.Data.Entity;
using PersistenceData.Contexts;
using PersistenceData.Entities;
using PersistenceData.Models;
using PersistenceData.Services;

namespace PersistenceData
{
	class Program
	{
		static void Main(string[] args)
		{
			// Test db run
//			Database.SetInitializer<UserContext>(new DropCreateDatabaseIfModelChanges<UserContext>());
//
//			using (UserContext db = new UserContext())
//			{
//				var user1 = new UserModel { Email = "john@gmail.com", Password = "12ds345", CreatedDate = DateTime.Now};
//				var user2 = new UserModel { Email = "siarhei@gmail.com", Password = "6adsf0", CreatedDate = DateTime.Now };
//				
//				db.Users.Add(user1);
//				db.Users.Add(user2);
//				db.SaveChanges();
//				Console.WriteLine("Objects created.");
//			
//				DbSet<UserModel> users = db.Users;
//				Console.WriteLine("Users list:");
//
//				foreach (UserModel u in users)
//				{
//					Console.WriteLine("Id: {0} Email: {1} Password: {2} Created Date: {3}", u.Id, u.Email, u.Password, u.CreatedDate);
//				}
//			}

			var userDbService = new UserDbService();

			User user = userDbService.GetUserByEmail("john@gmail.com");
			Console.WriteLine("Id: {0} Email: {1} Password: {2} Created Date: {3}", user.Id, user.Email, user.Password, user.CreatedDate);
			Console.ReadKey();
		}
	}
}
