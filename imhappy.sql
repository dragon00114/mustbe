USE [master]
GO

IF db_id('imhappy') IS NULL
  CREATE DATABASE [imhappy]
GO

USE [imhappy]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Sticker];
DROP TABLE IF EXISTS [Entry];
GO

CREATE TABLE [UserProfile] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [FirstName] NVARCHAR(50) NOT NULL,
  [LastName] NVARCHAR(50) NOT NULL,
  [Email] NVARCHAR(255) NOT NULL,
  [Birthday] DATETIME NOT NULL,
  [CreateDateTime] DATETIME NOT NULL,

  CONSTRAINT [UQ_FirebaseUserId] UNIQUE([FirebaseUserId]),
  CONSTRAINT [UQ_Email] UNIQUE([Email])
)

CREATE TABLE [Sticker] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Name] NVARCHAR(50) NOT NULL,
  [Emoji] NVARCHAR(10),
)

CREATE TABLE [Moment] (
  [Id] INTEGER IDENTITY PRIMARY KEY NOT NULL,
  [Date] DATETIME NOT NULL,
  [Entry] NVARCHAR(MAX) NOT NULL,
  [StickerId] INTEGER NOT NULL DEFAULT 1,
  [UserProfileId] INTEGER NOT NULL,
  [IsDeleted] BIT NOT NULL DEFAULT 0,
  [IsSignificant] BIT NOT NULL DEFAULT 0,

  CONSTRAINT [FK_Moment_Sticker] FOREIGN KEY ([StickerId]) REFERENCES [Sticker] ([Id]),
  CONSTRAINT [FK_Moment_UserProfile] FOREIGN KEY ([UserProfileId]) REFERENCES [UserProfile] ([Id])
)
GO

SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseUserId], [FirstName], [LastName], [Email], [Birthday], [CreateDateTime])
VALUES
  (1, 'zI5r0JzDXKfKLFLPbZnSSs3mq3A2', 'Chris', 'Barington', 'test@test.com', '1990-11-26', '2021-7-11'),
  (2, '518MUTqSvjWU9G114DSIvqoxDd72', 'Test', 'Two', 'test2@test.com', '1990-01-01', '2021-7-11');
SET IDENTITY_INSERT [UserProfile] OFF

SET IDENTITY_INSERT [Sticker] ON
INSERT INTO [Sticker]
  ([Id], [Name], [Emoji])
VALUES 
  (1, 'Uncategorized', N'😊'),
  (2, 'Smile 2', N'😊'),
  (3, 'Heart', N'💖'),
  (4, 'Birthday cake', N'🎂'),
  (5, 'Lucky', N'🍀'),
  (6, 'Trophy', N'🏆'),
  (7, 'Chef', N'👨‍🍳'),
  (8, 'Chicken', N'🐔'),
  (9, 'Party 1', N'🥳'),
  (10, 'Party 2', N'🎉'),
  (11, 'Flex', N'💪'),
  (12, 'Brain', N'🧠'),
  (13, 'Dog', N'🐶'),
  (14, 'Cat', N'🐱'),
  (15, 'Thumbs up', N'👍'),
  (16, 'Home', N'🏠'),
  (17, 'Rainbow', N'🌈'),
  (18, 'Popcorn', N'🍿'),
  (19, 'Tree', N'🌲'),
  (20, 'Baby', N'👶'),
  (21, 'Fancy', N'🎩'),
  (22, 'Kiss', N'💋'),
  (23, 'Clap', N'👏'),
  (24, 'Present', N'🎁'),
  (25, 'Eggplant', N'🍆'),
  (26, 'Smile 1', N'😀'),
  (27, 'Sun', N'🌞'),
  (28, 'Superhero', N'🦸‍♂️'),
  (29, 'Car', N'🚗'),
  (30, 'Airplane', N'✈'),
  (31, 'Mind blown', N'🤯'),
  (32, 'Loved', N'🥰'),
  (33, 'Drinks', N'🍻'),
  (34, 'Scholar', N'🎓'),
  (35, 'Music', N'🎵'),
  (36, 'Sports', N'🏈');
SET IDENTITY_INSERT [Sticker] OFF

SET IDENTITY_INSERT [Moment] ON
INSERT INTO [Moment] 
  ([Id], [Date], [Entry], [StickerId], [UserProfileId], [IsDeleted], [IsSignificant])
VALUES 
  (1, '1990-11-26', 'Happy birthday, Chris!', 4, 1, 0, 1), 
  (2, '2021-07-11', 'Joined IMHAPPY', 9, 1, 0, 0), 
  (3, '2020-03-26', 'This is a test entry', 11, 1, 0, 0), 
  (4, '2021-04-02', 'Lorem ipsum', 14, 1, 0, 0), 
  (5, '2021-02-26', 'Won the lottery', 5, 1, 0, 0), 
  (6, '2021-12-28', 'This is a test entry 2.', 5, 2, 0, 0); 
SET IDENTITY_INSERT [Moment] OFF