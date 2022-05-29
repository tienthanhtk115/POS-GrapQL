using Service.User.Entities;
using Service.User.Contracts;
using Service.User.Database;
//using Service.User.Common;
using Service.User.GraphQL;
using Service.User.Common;
using Service.User.Model;
using Microsoft.EntityFrameworkCore;
//using Service.User.Model;

namespace Service.User.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDbContext _context;

        public UserRepository(UserDbContext context)
        {
            _context = context;
        }

        public async Task <PageInfo<UserModel>> UserGetList(int pageSize, int pageNumber, string? Name, byte Type)   //=> _context.User.ToList();
        {
            PageInfo<UserModel> response = new PageInfo<UserModel>();
            try
            {
                IEnumerable<UserModel> item = from a in _context.User
                                              select new UserModel
                                               {
                                                   Id = a.Id,
                                                   Name = a.Name,
                                                   Code = a.Code,
                                                   Email = a.Email,
                                                   Password = a.Password,
                                                   Permission = a.Permission,
                                                   Status = a.Status,
                                               };
                if (Type > 0)
                {
                    item = item.Where(r => r.Type == Type);
                }
                if (Name != null && Name != "")
                {
                    item = item.Where(r => r.Name.Contains(Name));
                }

                if (pageNumber > 0)
                {
                    response.totalCount = item.Select(x => x.Id).Count();
                    response.pageSize = pageSize;
                    response.pageCount = (int)Math.Ceiling((decimal)response.totalCount / pageSize);
                    response.listItem = item.OrderByDescending(r => r.Id).Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToList();
                }
                else
                {
                    response.listItem = item.OrderByDescending(r => r.Id).ToList();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return response;
        }

        public async Task<UserEntity> UserGetById(int Id)
        {
            UserEntity user = _context.User.Find(Id);          
            return user;
        }

        public async Task<UserEntity> UserCreate(UserEntity user)
        {
            user.dateAdded = DateTime.Now;
            user.Code = Encryptor.PasswordCode();
            user.Password = Encryptor.MD5Hash(user.Password + user.Code);
            _context.User.Add(user);
            _context.SaveChanges();         
            return user;          
        }
        public async Task CreateToken(long user_id, string token)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Id == user_id);
            user.token = token;
            user.dateUpdated = DateTime.Now;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }
        public async Task RemoveToken(long user_id)
        {
            var user = await _context.User.FirstOrDefaultAsync(x => x.Id == user_id);
            user.token = null;
            user.dateUpdated = DateTime.Now;
            _context.User.Update(user);
            await _context.SaveChangesAsync();
        }
        public int NameCheck(string Name)
        {
            int count = _context.User.Where(r => r.Name.ToUpper() == Name.ToUpper()).Count();
            return count;
        }

        public async Task<UserEntity> UserModify(UserEntity userModify)  
        {
            UserEntity user = _context.User.Where(r => r.Id== userModify.Id).FirstOrDefault();        
            user.Name = userModify.Name;
            user.Permission = userModify.Permission;            
            user.Email = userModify.Email;          
            user.Status = userModify.Status;           
            user.dateUpdated = DateTime.Now;            
  
            _context.User.Update(user);
            _context.SaveChanges();
            return userModify;
        }
        public void UserDelete(long id)
        {
            UserEntity user = _context.User.Find(id);
            _context.User.Remove(user);
            _context.SaveChanges();
        }
    }
}
