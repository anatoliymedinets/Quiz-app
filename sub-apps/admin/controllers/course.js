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

module.exports.create = async (req, res)=>{
    var course = new Course({
        title: req.body.title,
        description: req.body.description
    })
    await course.save();
    res.status(201).json(course)
}

module.exports.update = async (req, res)=>{

    const updated = {
        title: req.body.title,
        description: req.body.description
    }

    try{
        const course = await Course.findOneAndUpdate(
            {_id: req.body._id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(course)
    }catch(ex){
        errorHandler(res,ex)
    }
}

module.exports.remove = async (req, res)=>{
    try{
        const course = await Course.findOneAndDelete({_id:req.params.id})
        res.status(200).json({
            "message":`${course.title} видалено`
        })
    }catch(ex){
        errorHandler(res,ex)
    }
}

