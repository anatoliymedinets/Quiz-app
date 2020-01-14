authorize = function(roles = []){
  if (typeof roles === 'number') {
    roles = [roles];
  }
  return [
    (req, res, next) => {
         if (roles.length && !roles.includes(req.user.roleId)) {           
             //user is not in role
            return res.status(403).json({ message: 'Forbidden' });
         }
        //authorization successful
        next();
    }
  ];
}

module.exports = authorize