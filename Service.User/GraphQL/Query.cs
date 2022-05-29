using Service.User.Contracts;
using Service.User.Entities;
using Service.User.Model;

namespace Service.User.GraphQL
{
    public class Query
    {
        //[UsePaging]
        //public IEnumerable<UserEntity> UserGetList([Service] IUserRepository repository) => repository.UserGetList();
        #region Property  
        private readonly IUserRepository _userRepository;
        #endregion

        public Query(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<ResponseSingleContentModel<PageInfo<UserModel>>> userGetList(int pageSize = 20, int pageNumber = 1, string? name = "", byte type = 0)
            
        {
            ResponseSingleContentModel<PageInfo<UserModel>> response = new ResponseSingleContentModel<PageInfo<UserModel>>
            {
                StatusCode = 200,
                Data = new PageInfo<UserModel>()
            };

            try
            {
                response.Data = await _userRepository.UserGetList(pageSize, pageNumber, name, type);
                response.Message = "";
            }
            catch
            {
                response.StatusCode = 500;
                response.Message = "có lỗi xảy ra trong quá trình xử lý";
            }
            return response;
        }

        public async Task<ResponseSingleContentModel<UserEntity>> UserGetById(int id)
        {
            ResponseSingleContentModel<UserEntity> response = new ResponseSingleContentModel<UserEntity>
            {
                StatusCode = 200
            };
            response.Data = await _userRepository.UserGetById(id);
            return response;
        }
    }
}
