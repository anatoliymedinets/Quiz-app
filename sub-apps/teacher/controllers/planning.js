const Planning = require('../../../models/Planning')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
    var plannings = await Planning.find({teacherId: req.user.id});
    res.status(200).json(plannings)
}

module.exports.getById = async (req, res)=>{
    try{
        var planning = await Planning.findById(req.params.id)
        res.status(200).json(planning)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

module.exports.create = async (req, res)=>{
    var planning = new Planing({
        ...req.body
    })
    planning.teacherId = req.user._id
    await planning.save();
    res.status(201).json(planning)
}

module.exports.update = async (req, res)=>{
    console.log(req.body)
    const {_id, ...updated} = req.body
    try{
        const planning = await Planning.findOneAndUpdate(
            {_id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(planning)
    }catch(ex){
        errorHandler(res,ex)
    }
}

module.exports.remove = async (req, res)=>{
    try{
        const planning = await Planning.findOneAndDelete({_id:req.params.id})
        res.status(200).json({
            "message":`${planning.title} видалено`
        })
    }catch(ex){
        errorHandler(res,ex)
    }
}

