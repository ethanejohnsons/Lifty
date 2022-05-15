create table "ExerciseMuscleGroupMap"
(
    "Id"            serial
        constraint exercisemusclegroupmap_pk
            primary key,
    "ExerciseId"    int not null
        constraint exercisemusclegroupmap_exercise_id_fk
            references "Exercise",
    "MuscleGroupId" int not null
        constraint exercisemusclegroupmap_musclegroup_id_fk
            references "MuscleGroup"
);

create unique index exercisemusclegroupmap_id_uindex
    on "ExerciseMuscleGroupMap" ("Id");
