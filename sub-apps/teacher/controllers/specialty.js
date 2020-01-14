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