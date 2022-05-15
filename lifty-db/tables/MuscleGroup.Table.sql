create table MuscleGroup
(
    Id serial
        constraint musclegroup_pk primary key,
    title varchar(100) not null,
    description varchar(500) not null
);

create unique index musclegroup_id_uindex on MuscleGroup(id);
