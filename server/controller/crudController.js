const db = require('../models/db');

const getAllStudents = async (req, res) => {
    try {
        const sql = "SELECT * FROM student";
        db.query(sql, (err, result) => {
            if (err) {
                console.log("Database error", err);
                res.status(500).json({ message: "Server Error" });
            }
            return res.status(200).json(result);
        })
    } catch (error) {
        console.log("Unexpected Error", error);
        return res.status(500).json({ message: "Unexpected Server Error" });
    };
};

const createStudents = async (req, res) => {
    const sql = "INSERT INTO student (`Name`, `Email`) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.log("Database Error:", err)
            res.status(500).json({ message: "Server Error" });
        };
        return res.status(201).json({ message: "Student added successfully.", id: result.insertId })
    })

};

const getStudentById = async (req,res) => {
    const sql = "SELECT * FROM student WHERE id=?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if(err) {
            console.log("Server Error", err)
            res.status(500).json({message: "Server Error"});
        }
        return res.status(201).json(result);
    });
};

const updateStudents = async (req, res) => {
    const sql = 'UPDATE student SET `Name` = ?, `Email` = ? WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) return res.json({ message: 'Inside server error.' });
        return res.json(result);
    })
};

const deleteStudents = async (req, res) => {
    const sql = 'DELETE FROM student WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: 'Inside server error.' });
        return res.json(result);
    })
};

module.exports = {
    getAllStudents,
    createStudents,
    getStudentById,
    updateStudents,
    deleteStudents,
};