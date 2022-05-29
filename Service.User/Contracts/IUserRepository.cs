using Service.User.Entities;
using Service.User.GraphQL;
using Service.User.Model;

namespace Service.User.Contracts
{
    public interface IUserRepository
    {
        Task<PageInfo<UserModel>> UserGetList(int pageSize, int pageNumber, string? Name, byte Type);
        Task<UserEntity> UserGetById(int Id);
        Task<UserEntity> UserCreate(UserEntity user);
        Task<UserEntity> UserModify(UserEntity userModify);
        Task CreateToken(long user_id, string token);
        Task RemoveToken(long user_id);
        int NameCheck(string Name);
        void UserDelete(long id);
        
    }
}
