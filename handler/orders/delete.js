const { Order } = require('../../models');

module.exports = async (req,res) =>{
    const id = req.params.id;

    const order = await Order.findByPk(id,{
        attributes: [
            'id', 
            'customerId', 
            'orderdate',
            'status',
            'productName',
            'quantity',
            'price'
        ]
    });

    if(!order){
        return res.status(200).json({
            status:'eror',
            message:'Order not found'
        });
    }else{
        await order.destroy();
    }

    const sqlOptions = {
        attributes: [
            'id', 
            'customerId', 
            'orderdate',
            'status',
            'productName',
            'quantity',
            'price'
        ]
    }

    const orders = await Order.findAll(sqlOptions);
    return res.json({
        status: 'Success',
        data: orders
    });
}