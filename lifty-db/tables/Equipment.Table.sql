create table "Equipment"
(
    "Id"          serial
        constraint equipment_pk
            primary key,
    "DisplayName" varchar(100) not null,
    "Description" varchar(500) not null,
    "ImageUrl"    varchar(500)
);

create unique index equipment_id_uindex
    on "Equipment" ("Id");
