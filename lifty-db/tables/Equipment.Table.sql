create table Equipment
(
    id serial constraint equipment_pk primary key,
    title varchar(100) not null,
    description varchar(500) not null,
    image varchar(500)
);

create unique index equipment_id_uindex on equipment(id);
