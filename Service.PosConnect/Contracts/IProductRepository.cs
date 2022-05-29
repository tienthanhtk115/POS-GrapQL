using Service.PosConnect.Entities;


namespace Service.PosConnect.Contracts
{
    public interface IProductRepository
    {
        IEnumerable<ProductEntity> ProductGetList();
        ProductEntity ProductGetById(int id);
        ProductEntity ProductCreate(ProductEntity product);
        IEnumerable<ProductCategoryEntity> ProductCategoryGetList();
        ProductCategoryEntity ProductCategoryGetById(int id); 
        ProductCategoryEntity ProductCategoryCreate(ProductCategoryEntity productCategory);
        ProductCategoryEntity ProductCategoryModify(ProductCategoryEntity productCategory);  
        IEnumerable<ProductUnitEntity> ProductUnitGetList();
      //  IEnumerable<ProductScaleModel> ProductScaleGetList(); 
        
    }
}
