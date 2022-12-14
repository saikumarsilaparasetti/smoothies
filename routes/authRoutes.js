const express = require('express')

const router = express.Router()

const authController = require('../controllers/authControllers')
router.get('/signup', (req, res)=>authController.signup_get(req, res))


router.post('/signup', (req, res)=>authController.signup_post(req, res))

router.get('/login', (req, res)=>authController.login_get(req, res))


router.post('/login', (req, res)=>authController.login_post(req, res))

router.get('/logout', (req, res)=>authController.logout_get(req, res))

module.exports = router
