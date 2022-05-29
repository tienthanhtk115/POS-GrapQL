using Service.Partner.Entities;


namespace Service.Partner.Contracts
{
    public interface IPartnerRepository
    {
        IEnumerable<PartnerEntity> PartnerGetList();
        PartnerEntity PartnerById(int id);
        PartnerEntity PartnerCreate(PartnerEntity partner);
        PartnerEntity PartnerModify(PartnerEntity partner);
    }
}
