/**
 * The data endpoint for Lifty.
 */

const express = require('express');
const router = express.Router();
const { Pool } = require('pg');

const equipmentQuery = `SELECT * FROM Equipment `;
const muscleGroupQuery = `SELECT * FROM MuscleGroup `;
const exerciseQuery = `
    SELECT DISTINCT exercise.*, equipment.*, muscleGroup.*
    FROM Exercise AS exercise
        JOIN ExerciseEquipmentMap AS equipmentMap
            ON exercise.id = equipmentMap.exercise_id
        JOIN ExerciseMuscleGroupMap AS muscleGroupMap
            ON exercise.id = muscleGroupMap.exercise_id
        JOIN Equipment AS equipment
            ON equipment.id = equipmentMap.equipment_id
        JOIN MuscleGroup AS muscleGroup
            ON muscleGroup.id = muscleGroupMap.musclegroup_id `;

function buildQuery(query, params) {
    if (Object.keys(params).length === 0) {
        return query;
    }

    let newQuery = query + 'WHERE '

    for (let value in params) {
        newQuery = newQuery + value + ' = ' + params[value].replace(/"/g, "'");

        if (Object.keys(params).length > 1) {
            newQuery += ' AND '
        }
    }

    return newQuery.substring(0, newQuery.length - 4);
}

async function submitQuery(query, params) {
    const pool = new Pool();
    const data = await pool.query(buildQuery(query, params));
    await pool.end();
    return data.rows;
}

router.get('/exercise', async (req, res) => {
    submitQuery(exerciseQuery, req.query)
        .then(data => res.send(data))
        .catch(err => res.status(500).send());
});

router.get('/equipment', async (req, res) => {
    submitQuery(equipmentQuery, req.query)
        .then(data => res.send(data))
        .catch(err => res.status(500).send());
});

router.get('/musclegroup', async (req, res) => {
    submitQuery(muscleGroupQuery, req.query)
        .then(data => res.send(data))
        .catch(err => res.status(500).send());
});

module.exports = router;
