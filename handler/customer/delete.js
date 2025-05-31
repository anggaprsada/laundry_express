const { Customer } = require('../../models');

module.exports = async (req,res) =>{
    const id = req.params.id;

    const customer = await Customer.findByPk(id,{
        attributes:['id','name','phone']
    });

    if(!customer){
        return res.status(200).json({
            status:'eror',
            message:'Customer not found'
        });
    }else{
        await customer.destroy();
    }

    const sqlOptions = {
        attributes:['id','name','phone']
    }

    const customers = await Customer.findAll(sqlOptions);
    return res.json({
        status: 'Success',
        data: customers
    });
}
