-- -------------------------------------------------------------
-- Generated from TablePlus 4.5.2(402)
--
-- Author: Rick Fox
--
-- Database: postagram
-- Generation Time: 2022-01-05 23:12:44.1460
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."comments";

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS comments_id_seq;

-- Table Definition
CREATE TABLE "public"."comments" (
    "id" int4 NOT NULL DEFAULT nextval('comments_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "date_created" timestamp NOT NULL DEFAULT now(),
    "post_id" int4,
    "body" text,
    PRIMARY KEY ("id")
);

CREATE INDEX post_reverse 
ON "public"."comments"(post_id);

-- Column Comment
COMMENT ON COLUMN "public"."comments"."id" IS 'the comment id';
COMMENT ON COLUMN "public"."comments"."user_id" IS 'author of the comment';
COMMENT ON COLUMN "public"."comments"."date_created" IS 'date the comment was created';
COMMENT ON COLUMN "public"."comments"."post_id" IS 'the id of the post the comment belongs too';
COMMENT ON COLUMN "public"."comments"."body" IS 'the comment body';


DROP TABLE IF EXISTS "public"."posts";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS posts_id_seq;

-- Table Definition
CREATE TABLE "public"."posts" (
    "id" int4 NOT NULL DEFAULT nextval('posts_id_seq'::regclass),
    "user_id" int4 NOT NULL,
    "date_created" timestamp NOT NULL DEFAULT now(),
    "body" text,
    "title" varchar(200),
    PRIMARY KEY ("id")
);

-- Column Comment
COMMENT ON COLUMN "public"."posts"."id" IS 'post id';
COMMENT ON COLUMN "public"."posts"."user_id" IS 'author of the post';
COMMENT ON COLUMN "public"."posts"."date_created" IS 'date the post was created';
COMMENT ON COLUMN "public"."posts"."body" IS 'post body';
COMMENT ON COLUMN "public"."posts"."title" IS 'post title';

DROP TABLE IF EXISTS "public"."users";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "firstname" varchar(200),
    "lastname" varchar(200),
    "email" varchar(200),
    "password_hash" varchar(500),
    "salt" varchar(100),
    PRIMARY KEY ("id")
);

-- Column Comment
COMMENT ON COLUMN "public"."users"."id" IS 'the user id';
COMMENT ON COLUMN "public"."users"."firstname" IS 'user first name';
COMMENT ON COLUMN "public"."users"."lastname" IS 'user last name';
COMMENT ON COLUMN "public"."users"."email" IS 'user email';
COMMENT ON COLUMN "public"."users"."password_hash" IS 'user password hash';
COMMENT ON COLUMN "public"."users"."salt" IS 'the password salt';

