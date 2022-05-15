create table Exercise
(
    id serial constraint exercise_pk primary key,
    title varchar(100) not null,
    instructions varchar(500) not null,
    warnings varchar(500),
    compound boolean not null,
    image varchar(500)
);

create unique index exercise_id_uindex on exercise(id);
