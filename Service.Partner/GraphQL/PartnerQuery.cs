using Service.Partner.Contracts;
using Service.Partner.Entities;

namespace Service.Partner.GraphQL
{
    public class PartnerQuery
    {
        [UsePaging]
        public IEnumerable<PartnerEntity> partnerGetList([Service] IPartnerRepository repository) => repository.PartnerGetList();
        public PartnerEntity partnerGetById([Service] IPartnerRepository repository, int id) => repository.PartnerById(id);
    }
}
