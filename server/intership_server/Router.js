const express = require('express');
const router = express.Router();
const Product = require('./Productschema');
const History = require('./Historyschema');
const {body,validationResult} = require('express-validator');

/*
@usage: All product
@url : http://127.0.0.1:5000/api/product
@fields : no-fields
@method:Get
@acess : Public
*/

router.get('/product',async (req,res) =>
{
    try
    {
        let AllProduct = await Product.find();
        res.status(200).json({Product : AllProduct});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }

});

/*
@usage: Single product
@url : http://127.0.0.1:5000/api/product/:product_id
@fields : no-fields
@method:Get
@acess : Public
*/

router.get('/product/:product_id',async (req,res) =>
{
    let id = req.params.product_id;
    try
    {
        let SinglePro = await Product.findById(id);
        res.status(200).json({product : SinglePro});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }

});



/*
@usage: Update product
@url : http://127.0.0.1:5000/api/product/:product_id
@fields : name,image,price,qty,info
@method:put
@acess : Public
*/

router.put('/product/:product_id',async (req,res) =>
{
    let id=req.params.product_id;
    try {
        let productF = await Product.findById(id);
        if(!productF)
        {
            return res.status(200).json({msg:'Product Not Found!!'});
        }
        let updateProduct =
            {
                email: req.body.email,
                curr_bal: req.body.curr_bal
            };
        productF = await Product.findByIdAndUpdate(id,{
            $set : updateProduct
        },{new : true});
        console.log(updateProduct);
        res.status(200).json({
            msg:'Product is Updated',
            product:productF
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }
});

/*
@usage: Create product
@url : http://127.0.0.1:5000/api/product
@fields : name,image,price,qty,info
@method:post
@acess : Public
*/

router.post('/product',[
    //Validation
    body('name').notEmpty().withMessage('Name is Required'),
    body('email').notEmpty().withMessage('Email is Required'),
],async (req,res) =>
{
    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //creat product
        let product = {
            name:req.body.name,
            email:req.body.email,
            curr_bal:0,
            info:req.body.info
        };
        product=new Product(product);
        product=await product.save();//save into DataBase
        res.status(200).json({
            msg:'Product is Created',
            product:product
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }
});


/* Create History
 */

router.post('/history',[
    //Validation
    body('sendername').notEmpty().withMessage('Sender Name is Required'),
    body('receivername').notEmpty().withMessage('Receiver Name is Required'),
    body('amount').notEmpty().withMessage('Amount is Required'),
],async (req,res) =>
{
    let errors = validationResult(req);
    if(!errors.isEmpty())
    {
        return res.status(400).json({errors:errors.array()});
    }
    try{
        //creat product
        let history = {
            sendername:req.body.sendername,
            receivername:req.body.receivername,
            amount:req.body.amount,
        };
        history=new History(history);
        history=await history.save();//save into DataBase
        res.status(200).json({
            msg:'History is Created',
            history:history
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }
});

/* Get Create */
router.get('/history',async (req,res) =>
{
    try
    {
        let AllProduct = await History.find();
        res.status(200).json({History : AllProduct});
    }
    catch (e) {
        console.error(e);
        res.status(500).json({errors:[{msg:e.message}]});
    }

});



module.exports = router;