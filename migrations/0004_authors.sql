alter table blog_posts add column if not exists author_photo text not null default '';
alter table blog_posts add column if not exists cover_url text not null default '';
