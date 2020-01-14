const Subject = require('../../../models/Subject')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getAll = async (req, res)=>{
    var subjects = await Subject.find({teacherId: req.user.id});
    res.status(200).json(subjects)
}

module.exports.getById = async (req, res)=>{
    try{
        var subject = await Subject.findById(req.params.id)//.populate('teacherId', 'fullName');
        res.status(200).json(subject)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

module.exports.create = async (req, res)=>{
    var subject = new Subject({
        ...req.body
    })
    subject.teacherId = req.user._id
    await subject.save();
    res.status(201).json(subject)
}

module.exports.update = async (req, res)=>{
    console.log(req.body)
    const {_id, ...updated} = req.body
    try{
        const subject = await Subject.findOneAndUpdate(
            {_id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(subject)
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

