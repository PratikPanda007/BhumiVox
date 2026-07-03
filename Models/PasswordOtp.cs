namespace BhumiVox.Models
{
    public class PasswordOtp
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string OtpHash { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
    }
}
