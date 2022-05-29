using Service.Product.Entities;

namespace Service.Product.Contracts
{
    public interface ICategoryRepository
    {
        IEnumerable<PackingCategoryEntity> PackingCategoryGetList();
        PackingCategoryEntity PackingCategoryGetById(int id);
        PackingCategoryEntity PackingCategoryCreate(PackingCategoryEntity packing);
        PackingCategoryEntity PackingCategoryModify(PackingCategoryEntity packing);
        IEnumerable<ProductUnitEntity> ProductUnitGetList();
        ProductUnitEntity UnitsGetById(int id);
        ProductUnitEntity UnitsCreate(ProductUnitEntity units);
        ProductUnitEntity UnitsModify(ProductUnitEntity units);
    }
}
