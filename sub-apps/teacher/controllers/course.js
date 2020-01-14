const Course = require('../../../models/Course')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
    var courses = await Course.find();
    res.status(200).json(courses)
    
}

module.exports.getById = async (req, res)=>{
    try{
    var course = await Course.findById(req.params.id);
    res.status(200).json(course)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

