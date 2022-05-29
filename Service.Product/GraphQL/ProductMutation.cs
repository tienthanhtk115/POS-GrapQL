using Service.Product.Entities;
using Service.Product.Contracts;

namespace Service.Product.GraphQL
{
    public class ProductMutation
    {
        public ProductEntity ProductCreate(
            [Service] IProductRepository repository,
            ProductEntity productEntity
        )
        {
            return repository.ProductCreate(productEntity);
        }

        public ProductCategoryEntity ProductCategoryCreate(
            [Service] IProductRepository repository,
            ProductCategoryEntity productCategoryEntity
        )
        {
            return repository.ProductCategoryCreate(productCategoryEntity);
        }

        public ProductCategoryEntity ProductCategoryModify(
            [Service] IProductRepository repository,
            ProductCategoryEntity productCategoryEntity
        )
        {
            return repository.ProductCategoryModify(productCategoryEntity);
        }


        public PackingCategoryEntity ProductCategoryCreate(
        [Service] ICategoryRepository repository,
        PackingCategoryEntity packingCategoryEntity
    )
        {
            return repository.PackingCategoryCreate(packingCategoryEntity);
        }

        public PackingCategoryEntity PackingCategoryModify(
            [Service] ICategoryRepository repository,
            PackingCategoryEntity packingCategoryEntity
        )
        {
            return repository.PackingCategoryModify(packingCategoryEntity);
        }


        public ProductUnitEntity UnitsCreate(
[Service] ICategoryRepository repository,
ProductUnitEntity unitEntity
)
        {
            return repository.UnitsCreate(unitEntity);
        }

        public ProductUnitEntity UnitsModify(
            [Service] ICategoryRepository repository,
           ProductUnitEntity unitEntity
        )
        {
            return repository.UnitsModify(unitEntity);
        }
    }
}
