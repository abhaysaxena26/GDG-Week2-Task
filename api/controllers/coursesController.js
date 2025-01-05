const pool = require('../db/db'); //This is the database connection pool, created using a library like pg

const getAllCourses = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createCourse = async (req, res) => {
    try {
        const { title, code, credits, description, image } = req.body;
        const result = await pool.query(
            'INSERT INTO courses (title, code, credits, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, code, credits, description, image]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { image, title, code, credits, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE courses SET image = $1, title = $2, code = $3, credits = $4, description = $5 WHERE id = $6 RETURNING *',
            [image, title, code, credits, description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM courses WHERE id = $1', [id]);
        res.send('Course deleted successfully');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllCourses,
    createCourse,
    updateCourse,
    deleteCourse,
};