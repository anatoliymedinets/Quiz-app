const Setting = require('../../../models/Setting')
const errorHandler = require('../../../utils/errorHandler')

module.exports.get = async (req, res)=>{
    var setting = await Setting.findOne();
    res.status(200).json(setting)
}


module.exports.update = async (req, res)=>{
  const {_id, ...updated} = req.body
  try{
      const setting = await Setting.findOneAndUpdate(
          {_id},
          {$set: updated},
          {new: true}
      )
      res.status(200).json(setting)
  }catch(ex){
      errorHandler(res,ex)
  }
}

