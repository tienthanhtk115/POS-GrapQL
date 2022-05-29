using Microsoft.IdentityModel.Tokens;
using Service.User.Contracts;
using Service.User.Entities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Service.User.GraphQL
{
    public class Mutation
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly ILoggerManager _logger;

        public async Task<ResponseSingleContentModel<UserEntity>> userCreate(UserEntity user)
        {
            ResponseSingleContentModel<UserEntity> response = new ResponseSingleContentModel<UserEntity>
            {
                StatusCode = 200
            };
            try
            {
                if (_userRepository.NameCheck(user.Name) == 0)
                {
                    response.Data = await _userRepository.UserCreate(user);
                    response.Message = "Cập nhật thành công";
                }
                else
                {
                    response.StatusCode = 500;
                    response.Message = "Tên đăng nhập đã tồn tại";
                }
            }
            catch (Exception ex)
            {
                _logger.Error($"{ex.Message}");
                response.StatusCode = 500;
                response.Message = "Có lỗi xảy ra trong quá trình xử lý";
                response.Data = new UserEntity();
            }
            return response;
        }
        public async Task<ResponseSingleContentModel<UserEntity>> userModify(UserEntity user)
        {
            ResponseSingleContentModel<UserEntity> response = new ResponseSingleContentModel<UserEntity>
            {
                StatusCode = 200
            };
            try
            {
                var responsedata = await _userRepository.UserModify(user);
                if (responsedata != null)
                {
                    response.Data = responsedata;
                    response.Message = "Cập nhật thành công";
                }
                else
                {
                    response.StatusCode = 500;
                    response.Data = null;
                    response.Message = "name đã tồn tại trong hệ thống, vui lòng chọn name khác!";
                }
            }
            catch (Exception ex)
            {
                _logger.Error($"{ex.Message}");
                response.StatusCode = 500;
                response.Message = "Có lỗi xảy ra trong quá trình xử lý";
            }
            return response;
        }
        public async Task<ResponseSingleContentModel<string>> createToken(long user_id, string token)
        {
            ResponseSingleContentModel<string> response = new ResponseSingleContentModel<string>
            {
                StatusCode = 200,
                Message = "cập nhật thành công"
            };
            try
            {
                await _userRepository.CreateToken(user_id, token);
            }
            catch (Exception ex)
            {
                _logger.Error($"{ex.Message}");
                response.StatusCode = 500;
                response.Message = "Có lỗi xảy ra trong quá trình xử lý " + ex.Message;
            }
            return response;
        }
        private string GenerateToken(UserEntity user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var identity = new ClaimsIdentity(new Claim[]
            {

                new Claim(JwtRegisteredClaimNames.Sub, user.Name),
                //new Claim(JwtRegisteredClaimNames.Typ, user.type.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.Name),
                 new Claim(JwtRegisteredClaimNames.Email, user.Email)
            });
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddHours(12),
                SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
            };

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenString = tokenHandler.WriteToken(token);

            return tokenString;

        }
        public async Task<ResponseSingleContentModel<string>> removeToken(long user_id)
        {
            ResponseSingleContentModel<string> response = new ResponseSingleContentModel<string>
            {
                StatusCode = 200,
                Message = "cập nhật thành công"
            };
            try
            {
                await _userRepository.RemoveToken(user_id);
            }
            catch (Exception ex)
            {
                _logger.Error($"{ex.Message}");
                response.StatusCode = 500;
                response.Message = "Có lỗi xảy ra trong quá trình xử lý " + ex.Message;
            }
            return response;
        }
        public ResponseSingleContentModel<string> userDelete(long id)
        {
            ResponseSingleContentModel<string> response = new ResponseSingleContentModel<string>
            {
                StatusCode = 200,
                Message = "Xóa thành công"
            };
            try
            {
                _userRepository.UserDelete(id);
            }
            catch
            {
                response.StatusCode = 500;
                response.Data = "";
                response.Message = "Có lỗi trong quá trình xử lý";
            }
            return response;
        }
    }
}
