using Service.Partner.Entities;
using Service.Partner.Contracts;
using Service.Partner.Database;

namespace Service.Partner.Repositories
{
    public class PartnerRepository: IPartnerRepository
    {
        private readonly PartnerDbContext _context;

        public PartnerRepository(PartnerDbContext context)
        {
            _context = context;
        }

        public IEnumerable<PartnerEntity> PartnerGetList() => _context.Partner.ToList();
        public PartnerEntity PartnerById(int id) => _context.Partner.SingleOrDefault(x => x.Id == id);
        public PartnerEntity PartnerCreate(PartnerEntity partner)
        {
            _context.Partner.Add(partner);
            _context.SaveChanges();

            return partner;
        }
        public PartnerEntity PartnerModify(PartnerEntity partner)
        {
            _context.Partner.Update(partner);
            _context.SaveChanges();

            return partner;
        }
    }
}
