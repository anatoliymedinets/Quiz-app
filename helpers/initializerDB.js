const bcrypt = require('bcryptjs')

const Role = require('../models/Role')
const User = require('../models/User')
const Setting = require('../models/Setting')

module.exports.initialize = async ()=>{

  //-------------------Add roles to system---------------------------
  var roles = await Role.find()

  if(roles.length <= 0){

    var roleAdmin = new Role({ _id: 1, title :'Admin'})
    var roleTeacher = new Role({ _id: 2, title :'Teacher'})
    var roleStudent = new Role({ _id: 3, title :'Student'})

    try{
      await roleAdmin.save()
      await roleTeacher.save()
      await roleStudent.save()

      console.log('Has been added 3 roles in DB')
    }
    catch(ex){
      console.log(ex)
    }
  }

  //-------------------Add admin to system---------------------------
  var admin = await User.findOne({email: 'admin@gmail.com'})

  if(!admin){

    var userAdmin = new User({
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('123', bcrypt.genSaltSync(10)),
      phone: '0967546352',
      fullName: 'Test Admin',
      roleId: 1
    })

    try{
      await userAdmin.save()
      console.log(`Admin ${userAdmin.email} has been added in DB`)
    }
    catch(ex){
      console.log(ex)
    }
  }

  var setting = await Setting.findOne()

  if(!setting){

    var newSetting = new Setting({
      teacherKey: 'teacher',
      studentKey: 'student',
    })

    try{
      await newSetting.save()
      console.log(`Setting has been added in DB`)
    }
    catch(ex){
      console.log(ex)
    }
  }
}