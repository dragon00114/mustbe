using imhappy.Models;
using imhappy.Utils;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace imhappy.Repositories
{
    public class MomentRepository : BaseRepository, IMomentRepository
    {
        public MomentRepository(IConfiguration configuration) : base(configuration) { }

        private static string MomentQuery
        {
            get
            {
                return @"SELECT m.Id, 
                                m.UserProfileId,
                                m.Date, 
                                m.Entry, 
                                m.IsSignificant,
                                m.StickerId,
                                s.Name, 
                                s.Emoji
                           FROM Moment m
                      LEFT JOIN Sticker s ON m.StickerId = s.Id
                          WHERE m.IsDeleted = 0";
            }
        }

        private static string SortByDate
        {
            get
            {
                return "ORDER BY m.Date DESC";
            }
        }

        private static Moment NewMoment(SqlDataReader reader)
        {
            return new Moment()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                Date = DbUtils.GetDateTime(reader, "Date"),
                Entry = DbUtils.GetString(reader, "Entry"),
                IsSignificant = reader.GetBoolean(reader.GetOrdinal("IsSignificant")),
                StickerId = DbUtils.GetInt(reader, "StickerId"),
                Sticker = new Sticker()
                {
                    Id = DbUtils.GetInt(reader, "StickerId"),
                    Name = DbUtils.GetString(reader, "Name"),
                    Emoji = DbUtils.GetString(reader, "Emoji")
                }
            };
        }

        public List<Moment> GetAll(int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"{MomentQuery} AND m.UserProfileId = @UserProfileId {SortByDate}";
                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);
                    var moments = new List<Moment>();
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        moments.Add(NewMoment(reader));
                    }
                    reader.Close();
                    return moments;
                }
            }
        }

        public Moment GetById(int id, int userProfileId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = $"{MomentQuery} AND m.Id = @Id AND m.UserProfileId = @UserProfileId";
                    cmd.Parameters.AddWithValue("@Id", id);
                    cmd.Parameters.AddWithValue("@UserProfileId", userProfileId);
                    Moment moment = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        moment = NewMoment(reader);
                    }
                    reader.Close();
                    return moment;
                }
            }
        }

        public void Add(Moment moment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Moment (UserProfileId, Date, Entry, StickerId, IsSignificant, IsDeleted)
                                        OUTPUT INSERTED.ID
                                        VALUES (@UserProfileId, @Date, @Entry, @StickerId, @IsSignificant, @IsDeleted)";
                    DbUtils.AddParameter(cmd, "@UserProfileId", moment.UserProfileId);
                    DbUtils.AddParameter(cmd, "@Date", moment.Date);
                    DbUtils.AddParameter(cmd, "@Entry", moment.Entry);
                    DbUtils.AddParameter(cmd, "@StickerId", moment.StickerId);
                    DbUtils.AddParameter(cmd, "@IsSignificant", moment.IsSignificant);
                    DbUtils.AddParameter(cmd, "@IsDeleted", moment.IsDeleted);
                    moment.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Moment moment)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Moment
                                           SET Date = @Date,
                                               Entry = @Entry,
                                               StickerId = @StickerId, 
                                               IsSignificant = @IsSignificant
                                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Date", moment.Date);
                    DbUtils.AddParameter(cmd, "@Entry", moment.Entry);
                    DbUtils.AddParameter(cmd, "@StickerId", moment.StickerId);
                    DbUtils.AddParameter(cmd, "@IsSignificant", moment.IsSignificant);
                    DbUtils.AddParameter(cmd, "@Id", moment.Id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Moment 
                                           SET IsDeleted = 1 
                                         WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }

}
