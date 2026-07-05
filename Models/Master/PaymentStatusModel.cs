namespace BhumiVox.Models.Master
{
    public class PaymentStatusModel
    {
        public int PaymentStatusId { get; set; }
        public Guid PaymentStatusGuid { get; set; }
        public string StatusName { get; set; }
        public int DisplayOrder { get; set; }
    }
}
