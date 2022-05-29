using Service.Partner.Entities;
using Service.Partner.Contracts;

namespace Service.Partner.GraphQL
{
    public class PartnerMutation
    {
        public PartnerEntity PartnerCreate(
            [Service] IPartnerRepository repository,
            PartnerEntity partnerEntity
        )
        {
            return repository.PartnerCreate(partnerEntity);
        }
    }
}
