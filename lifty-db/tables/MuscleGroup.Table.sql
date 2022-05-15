create table "MuscleGroup"
(
    "Id"          serial
        constraint musclegroup_pk
            primary key,
    "DisplayName" varchar(100) not null,
    "Description" varchar(500) not null
);

create unique index musclegroup_id_uindex
    on "MuscleGroup" ("Id");
