using Service.Product.Contracts;
using Service.Product.Entities;
using Service.Product.Models; 

namespace Service.Product.GraphQL
{
    public class ProductQuery
    {
        [UsePaging]
        public IEnumerable<ProductEntity> ProductGetList([Service] IProductRepository repository) => repository.ProductGetList();

        [UsePaging]
        public IEnumerable<ProductCategoryEntity> ProductCategoryGetList([Service] IProductRepository repository) => repository.ProductCategoryGetList();

        public ProductCategoryEntity ProductCategoryGetById([Service] IProductRepository repository, int id) => repository.ProductCategoryGetById(id);
        public IEnumerable<ProductScaleModel> ProductGetDataScaleExcel([Service] IProductRepository repository)=> repository.ProductScaleGetList(); 
        public IEnumerable<ProductUnitEntity> ProductUnitGetList([Service] ICategoryRepository repository) => repository.ProductUnitGetList();

        [UsePaging]
        public IEnumerable<PackingCategoryEntity> PackingCategoryGetList([Service] ICategoryRepository repository) => repository.PackingCategoryGetList();

        public PackingCategoryEntity PackingCategoryGetById([Service] ICategoryRepository repository, int id) => repository.PackingCategoryGetById(id);

    }
}
