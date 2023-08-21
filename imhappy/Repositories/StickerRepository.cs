using imhappy.Models;
using imhappy.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace imhappy.Repositories
{
    public class StickerRepository : BaseRepository, IStickerRepository
    {
        public StickerRepository(IConfiguration config) : base(config) { }
        public List<Sticker> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT Id,
                                               Name,
                                               Emoji
                                          FROM Sticker 
                                      ORDER BY Name";
                    var reader = cmd.ExecuteReader();
                    var stickers = new List<Sticker>();
                    while (reader.Read())
                    {
                        stickers.Add(new Sticker()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Emoji = DbUtils.GetString(reader, "Emoji")
                        });
                    }
                    reader.Close();
                    return stickers;
                }
            }
        }
    }
}