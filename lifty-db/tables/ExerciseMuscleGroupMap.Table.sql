create table ExerciseMuscleGroupMap
(
    id serial constraint exercisemusclegroupmap_pk
            primary key,
    exercise_id int not null
        constraint exercisemusclegroupmap_exercise_id_fk references Exercise,
    musclegroup_id int not null
        constraint exercisemusclegroupmap_musclegroup_id_fk references MuscleGroup
);

create unique index exercisemusclegroupmap_id_uindex on ExerciseMuscleGroupMap(id);
