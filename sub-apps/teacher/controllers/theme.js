const Theme = require('../../../models/Theme')
const errorHandler = require('../../../utils/errorHandler')

module.exports.getByTeacher = async (req, res)=>{
    try{
    var themes = await Theme.find({
      subjectId: req.params.subjectId,
      courseId: req.params.courseId
    });
    res.status(200).json(themes)
    }
    catch(ex){
        errorHandler(res, ex)
    }
}

module.exports.getById = async (req, res)=>{
  try{
  var theme = await Theme.find({_id: req.params });
  res.status(200).json(theme)
  }
  catch(ex){
      errorHandler(res, ex)
  }
}

module.exports.create = async (req, res)=>{
  var theme = new Theme({
      ...req.body
  })
  await theme.save();
  res.status(201).json(theme)
}



