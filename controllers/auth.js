const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Setting = require('../models/Setting')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const enRoles = require('../models/enums/enRoles')


function generateToken(user, expiresMinuts){
  return jwt.sign({
    email: user.email,
    userId: user._id,
    roleId: user.roleId,
    fullName: user.fullName
  }, keys.jwt, {expiresIn: expiresMinuts * 60})
}

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      // Генерация токенов, пароли совпали
      const accessToken = generateToken(candidate, 60)
      const refreshToken = generateToken(candidate, 60 * 24)

      candidate.refreshToken = refreshToken;
      candidate.save();

      res.status(200).json({
        accessToken: `Bearer ${accessToken}`,
        refreshToken
      })
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'Паролі не співпадають. Спробуйте знову.'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Користувач з таким email не знайдений.'
    })
  }
}

module.exports.register = async function(req, res) {
  // email password
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такий email уже зайнятий. Спробуйте інший.'
    })
  } else {
    const setting = await Setting.findOne()
    let roleId;

    switch (req.body.key){
      case setting.teacherKey: 
        roleId = enRoles.Teacher;
        break;
      case setting.studentKey: 
        roleId = enRoles.Student;
        break;
    }

    if(!roleId){
      res.status(400).json({
        message: 'Невірний ключ'
      })
      return
    }

    // Нужно создать пользователя
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt),
      fullName: req.body.fullName,
      phone: req.body.phone,
      roleId
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}

module.exports.refreshToken = async function(req, res){

  try{
    const token = jwt.verify(req.body.refreshToken, keys.jwt)
    
    const user = await User.findById(token.userId)
    if(user.refreshToken === req.body.refreshToken){

       const accessToken = generateToken(user, 60)
       const refreshToken = generateToken(user, 60 * 24)

      user.refreshToken = refreshToken;
      user.save();

      res.status(200).json({
        accessToken: `Bearer ${accessToken}`,
        refreshToken
      })
    }
    else
    {
      res.status(426).json({
        message: 'Токены не совпадают.'
      })
    }
  }
  catch(e)
  {
    res.status(426).json({
      message: 'Не валидный токен обновления.'
    })
  }
}