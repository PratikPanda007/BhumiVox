using System.Data;
using Microsoft.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using BhumiVox.Models;
using BhumiVox.Models.Auth;

namespace BhumiVox.Helper
{
    public class DBUtils
    {
        private readonly string _connectionString;

        public DBUtils(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }

        // 🔹 For SELECT (returns DataTable)
        public DataTable ExecuteDataTable(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            using var da = new SqlDataAdapter(cmd);
            var dt = new DataTable();
            da.Fill(dt);
            return dt;
        }

        // 🔹 For INSERT / UPDATE / DELETE
        public int ExecuteNonQuery(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            conn.Open();
            return cmd.ExecuteNonQuery();
        }

        // 🔹 For single value (scalar)
        public object ExecuteScalar(string spName, SqlParameter[] parameters = null)
        {
            using var conn = GetConnection();
            using var cmd = new SqlCommand(spName, conn);
            cmd.CommandType = CommandType.StoredProcedure;

            if (parameters != null)
                cmd.Parameters.AddRange(parameters);

            conn.Open();
            return cmd.ExecuteScalar();
        }

        // ================================================================================================= [ User Login Starts Here ]
        public UserModel? LoginUser(string email)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_LoginUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@Email", email);

            conn.Open();

            using var reader = cmd.ExecuteReader();

            if (!reader.Read())
                return null;

            return new UserModel
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                FullName = reader.GetString(reader.GetOrdinal("FullName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),
                Phone = reader.IsDBNull(reader.GetOrdinal("Phone"))
                            ? string.Empty
                            : reader.GetString(reader.GetOrdinal("Phone")),
                PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),
                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId")),
                Avatar = reader.IsDBNull(reader.GetOrdinal("Avatar"))
                            ? string.Empty
                            : reader.GetString(reader.GetOrdinal("Avatar")),
                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
            };
        }

        // ================================================================================================= [ User Login Ends Here ]

        // ================================================================================================= [ User Registration Starts Here ]
        public async Task<RegisterResponse> RegisterUserAsync(RegisterRequest request, string createdBy)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_RegisterUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;

            cmd.Parameters.AddWithValue("@FullName", request.FullName);
            cmd.Parameters.AddWithValue("@Email", request.Email);
            cmd.Parameters.AddWithValue("@Phone", (object?)request.Phone ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@PasswordHash", request.Password);
            cmd.Parameters.AddWithValue("@Avatar", (object?)request.Avatar ?? DBNull.Value);
            cmd.Parameters.AddWithValue("@CreatedBy", createdBy);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                throw new Exception("User registration failed.");

            return new RegisterResponse
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                UserGuid = reader.GetGuid(reader.GetOrdinal("UserGuid")),
                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId"))
            };
        }
        // ================================================================================================= [ User Registration Ends Here ]

        // ================================================================================================= [ User Login Starts Here ]
        public async Task<UserModel?> LoginUserAsync(string email)
        {
            using var conn = new SqlConnection(_connectionString);
            using var cmd = new SqlCommand("bv_sp_LoginUser", conn);

            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("@Email", email);

            await conn.OpenAsync();

            using var reader = await cmd.ExecuteReaderAsync();

            if (!await reader.ReadAsync())
                return null;

            return new UserModel
            {
                UserId = reader.GetInt32(reader.GetOrdinal("UserId")),
                FullName = reader.GetString(reader.GetOrdinal("FullName")),
                Email = reader.GetString(reader.GetOrdinal("Email")),

                Phone = reader.IsDBNull(reader.GetOrdinal("Phone"))
                    ? string.Empty
                    : reader.GetString(reader.GetOrdinal("Phone")),

                PasswordHash = reader.GetString(reader.GetOrdinal("PasswordHash")),

                RoleId = reader.GetInt32(reader.GetOrdinal("RoleId")),

                Avatar = reader.IsDBNull(reader.GetOrdinal("Avatar"))
                    ? string.Empty
                    : reader.GetString(reader.GetOrdinal("Avatar")),

                IsActive = reader.GetBoolean(reader.GetOrdinal("IsActive"))
            };
        }
        // ================================================================================================= [ User Login Ends Here ]
    }
}
