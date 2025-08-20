const express = require('express');
const studentController = require('../controller/crudController');
const userController = require('../controller/authController');
const router = express.Router();


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.get('/', studentController.getAllStudents);

router.post('/', studentController.createStudents);

router.get('/read/:id', studentController.getStudentById);


router.put('/update/:id', studentController.updateStudents)

router.delete('/delete/:id', studentController.deleteStudents)

module.exports = router;