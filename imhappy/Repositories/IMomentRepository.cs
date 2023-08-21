using imhappy.Models;
using System.Collections.Generic;

namespace imhappy.Repositories
{
    public interface IMomentRepository
    {
        void Add(Moment moment);
        void Delete(int id);
        List<Moment> GetAll(int userProfileId);
        Moment GetById(int id, int userProfileId);
        void Update(Moment moment);
    }
}