create table ExerciseEquipmentMap
(
    id serial constraint exerciseequipmentmap_pk primary key,
    exercise_id  integer not null
        constraint exerciseequipmentmap_exercise_id_fk references exercise,
    equipment_id integer not null
        constraint exerciseequipmentmap_equipment_id_fk references equipment
);

create unique index exerciseequipmentmap_id_uindex on ExerciseEquipmentMap(id);
