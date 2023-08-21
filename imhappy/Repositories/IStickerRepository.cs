using imhappy.Models;
using System.Collections.Generic;

namespace imhappy.Repositories
{
    public interface IStickerRepository
    {
        List<Sticker> GetAll();
    }
}
