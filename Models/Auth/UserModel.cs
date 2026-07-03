namespace BhumiVox.Models.Auth
{
    public class UserModel
    {
        public int UserId { get; set; }
        public Guid UserGuid { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string RoleName { get; set; } = string.Empty;
        public Int32 RoleId { get; set; } = 3;
        public string Avatar { get; set; } = string.Empty;
        public bool IsActive { get; set; }
    }

    public static class RoleConstants
    {
        public const int SuperAdmin = 1;
        public const int Admin = 2;
        public const int User = 3;
    }

    public class RegisterResponse
    {
        public int UserId { get; set; }
        public Guid UserGuid { get; set; }
        public int RoleId { get; set; }
    }
}
