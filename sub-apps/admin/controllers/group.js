const Group = require('../../../models/Group')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
    var groups = await Group.find().populate('courseId specialtyId');
    res.status(200).json(groups)
}

module.exports.getById = async (req, res)=>{
    try{
        var group = await Group.findById(req.params.id);
        res.status(200).json(group)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

module.exports.create = async (req, res)=>{
    var group = new Group({
        ...req.body
    })
    await group.save();
    await Group.populate(group, {path: 'courseId specialtyId'})
    res.status(201).json(group)
}

module.exports.update = async (req, res)=>{
    const {_id, ...updated} = req.body
    try{
        const group = await Group.findOneAndUpdate(
            {_id},
            {$set: updated},
            {new: true}
        )
        await Group.populate(group, {path: 'courseId specialtyId'})
        res.status(200).json(group)
    }catch(ex){
        errorHandler(res,ex)
    }
}

module.exports.remove = async (req, res)=>{
    try{
        const group = await Group.findOneAndDelete({_id:req.params.id})
        res.status(200).json({
            "message":`${group.title} видалено`
        })
    }catch(ex){
        errorHandler(res,ex)
    }
}

