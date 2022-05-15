create table "ExerciseEquipmentMap"
(
    "Id"          serial
        constraint exerciseequipmentmap_pk
            primary key,
    "ExerciseId"  integer not null
        constraint exerciseequipmentmap_exercise_id_fk
            references "Exercise",
    "EquipmentId" integer not null
        constraint exerciseequipmentmap_equipment_id_fk
            references "Equipment"
);

create unique index exerciseequipmentmap_id_uindex
    on "ExerciseEquipmentMap" ("Id");
