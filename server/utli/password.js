const bcrypt = require('bcrypt')

function hashpassword(password){

   const salt = bcrypt.genSaltSync();
   return bcrypt.hashSync(password,salt);
}

function comparePassword(raw, hash){
    return bcrypt.compareSync(raw,hash)
}

module.exports={
    hashpassword ,
    comparePassword
}