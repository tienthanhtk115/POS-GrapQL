using Service.Product.Database;
using Service.Product.Entities;

namespace Service.Product.Repositories
{
    public class CategoryRepository
    {
        private readonly ProductDbContext _context;

        public CategoryRepository(ProductDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PackingCategoryEntity> PackingCategoryGetList() => _context.PackingCategory.ToList();
        public PackingCategoryEntity PackingCategoryGetById(int id) => _context.PackingCategory.SingleOrDefault(x => x.Id == id);
        public PackingCategoryEntity PackingCategoryCreate(PackingCategoryEntity packing)
        {
            _context.PackingCategory.Add(packing);
            _context.SaveChanges();

            return packing;
        }

        public PackingCategoryEntity PackingCategoryModify(PackingCategoryEntity packing)
        {
            _context.PackingCategory.Update(packing);
            _context.SaveChanges();

            return packing;
        }
        public IEnumerable<ProductUnitEntity> ProductUnitGetList() => _context.Units.ToList();
        public ProductUnitEntity UnitsGetById(int id) => _context.Units.SingleOrDefault(x => x.Id == id);
        public ProductUnitEntity UnitsCreate(ProductUnitEntity units)
        {
            _context.Units.Add(units);
            _context.SaveChanges();

            return units;
        }

        public ProductUnitEntity UnitsModify(ProductUnitEntity units)
        {
            _context.Units.Update(units);
            _context.SaveChanges();

            return units;
        }
    }
}
