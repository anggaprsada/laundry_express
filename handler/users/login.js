const { User } = require("../../models");
const Validator= require('fastest-validator');
const jwt = require('jsonwebtoken');
const v = new Validator ();
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    try {
        const schema = {
        email : "string | empty:false",
        pass  : "string | min:6",
         };

        const validate = v.validate(req.body, schema);

        if (validate.length){
            return res.status(400).json({
                status: "error",
                message: validate,
            });
        }

        const user = await User.findAll({
            where:{email: req.body.email}
        });

        if (!user){
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        const validPassword = await bcrypt.compare(req.body.pass, user[0].pass);

        if (!validPassword){
            return res.status(400).json({
                status: 'error',
                message: 'Password failed'
            });
        }

        const idUser = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        const accesToken = jwt.sign({idUser, name, email }, process.env.ACCES_TOKEN_SECRET, {
            expiresIn : '15m'
        });

        const refreshToken = jwt.sign({idUser, name,  email}, process.env.REFRESH_ACCES_TOKEN_SECRET, {
            expiresIn: '7d'
        });

        await User.update({token : refreshToken},{
            where: {
                id : idUser
            } });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            status : 'OK!',
            message: accesToken
        })
    }catch(error){
        console.log(error);
    }
    
    // return res.status(200).json({
    //     status: "succes",
    //     message: {
    //         id: user[0].id,
    //         name: user[0].name,
    //         email: user[0].email,
    //         role: user[0].role,
    //         avatar: user[0].avatar,
    //         profession: user[0].profession
    //     }
    // });
    
}