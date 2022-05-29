namespace Service.Product.Helper
{
    public class CommonFunctions
    {
        public static string GenCodeProductScale(long id)
        { 
            return string.Format("10994{0,6}",id.ToString("D6"));
        }

        public static int GetWeightProductScale(string barcode, out int id)
        {
           if (!string.IsNullOrEmpty(barcode) && barcode.StartsWith("10994"))
           {
               id = int.Parse(barcode.Substring(4,10));
               return int.Parse(barcode.Substring(10,barcode.Length-1));
           }else{
               id = 0;
               return 0;
           }
        }
    }
}
