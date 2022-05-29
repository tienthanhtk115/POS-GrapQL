

using Service.PosConnect.Contracts;
using Service.PosConnect.Database;
using Service.PosConnect.Entities;

namespace Service.PosConnect.Repositories
{
    public class ProductRepository: IProductRepository
    {
        private readonly ProductDbContext _context;

        public ProductRepository(ProductDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductEntity> ProductGetList() {

            // var query = from a in _context.Product 
            //             join b in _context.Units
            //             on a.UnitId equals b.Id
            //             select new ProductEntity{
                            
            //             };
  
          return  _context.Product.ToList();
        }
        public ProductEntity ProductGetById(int id) => _context.Product.SingleOrDefault(x=>x.Id == id);
        public ProductEntity ProductCreate(ProductEntity product)
        {
            _context.Product.Add(product);
            _context.SaveChanges();

            return product;
        }
        public IEnumerable<ProductCategoryEntity> ProductCategoryGetList() => _context.ProductCategory.ToList();
        public ProductCategoryEntity ProductCategoryGetById(int id) => _context.ProductCategory.SingleOrDefault(x => x.Id == id);
        public ProductCategoryEntity ProductCategoryCreate(ProductCategoryEntity productCategory)
        {
            _context.ProductCategory.Add(productCategory);
            _context.SaveChanges();

            return productCategory;
        }

        public ProductCategoryEntity ProductCategoryModify(ProductCategoryEntity productCategory)
        {
            _context.ProductCategory.Update(productCategory);
            _context.SaveChanges();

            return productCategory;
        } 
        
        public IEnumerable<ProductUnitEntity> ProductUnitGetList() => _context.Units.ToList();

   
    }
}
