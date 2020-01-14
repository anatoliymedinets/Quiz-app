const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const path = require('path')

const authorize = require('./middleware/authorize')
const enRoles = require('./models/enums/enRoles')

//---------------sub-apps----------------
const adminApp = require('./sub-apps/admin')
const teacherApp = require('./sub-apps/teacher')
//const student = require('./sub-apps/student')
//--------------------------------------

const authRouter = require('./routes/auth')

const app = express();

//-------------------------------------------
app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/admin', passport.authenticate('jwt', {session: false}), authorize(enRoles.Admin), adminApp)
app.use('/api/teacher', passport.authenticate('jwt', {session: false}), authorize(enRoles.Teacher), teacherApp)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/dist/client'))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'))
  })
}

module.exports = app