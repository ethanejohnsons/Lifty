create table "Exercise"
(
    "Id"           serial
        constraint exercise_pk
            primary key,
    "DisplayName"  varchar(100) not null,
    "Instructions" varchar(500) not null,
    "Warnings"     varchar(500),
    "IsCompound"   boolean      not null,
    "ImageUrl"     varchar(500)
);

create unique index exercise_id_uindex
    on "Exercise" ("Id");
