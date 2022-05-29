namespace Service.Partner.Entities
{
    public class CustomerEntity
    {
        public long Id {   get; set; }
        public string? Name { get; set; }
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { set; get; }
        public int Count_Purchases { get; set; }
        public double Total_Price { get; set; }
    }
}
