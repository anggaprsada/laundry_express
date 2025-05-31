const {User} = require('../../models');

module.exports = async (req,res) =>{
    const id = req.params.id;

    const user = await User.findByPk(id,{
        attributes:['id','name','phone','pass']
    });

    if(!user){
        return res.status(200).json({
            status:'eror',
            message:'User not found'
        });
    }else{
        await user.destroy();
    }

    const sqlOptions = {
        attributes:['id','name','phone','pass']
    }

    const users = await User.findAll(sqlOptions);
    return res.json({
        status: 'Success',
        data: users
    });
}