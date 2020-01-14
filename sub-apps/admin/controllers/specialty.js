const Specialty = require('../../../models/Specialty')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
    var specialties = await Specialty.find();
    res.status(200).json(specialties)
}

module.exports.getById = async (req, res)=>{
    try{
    var specialty = await Specialty.findById(req.params.id);
    res.status(200).json(specialty)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

module.exports.create = async (req, res)=>{
    var specialty = new Specialty({
        title: req.body.title
    })
    await specialty.save();
    res.status(201).json(specialty)
}

module.exports.update = async (req, res)=>{
    console.log(req.body)
    const updated = {
        title: req.body.title,
    }

    try{
        const specialty = await Specialty.findOneAndUpdate(
            {_id: req.body._id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(specialty)
    }catch(ex){
        errorHandler(res,ex)
    }
}

module.exports.remove = async (req, res)=>{
    try{
        const specialty = await Specialty.findOneAndDelete({_id:req.params.id})
        res.status(200).json({
            "message":`${specialty.title} видалено`
        })
    }catch(ex){
        errorHandler(res,ex)
    }
}

