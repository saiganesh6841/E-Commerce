
const { ObjectId } = require('mongoose').Types;
const Product=require('../model/productModel')


const productModel={

    productAdds: async(req,res)=>{

        try{
 
            const {title,description,image,price,rating,category,stock}=req.body

            if(!title || !description || !image || !price || !rating || !category || !stock){
                return res.status(400).json({ status: "failed", error: "All Fields Are Required" });
            }

            // const productId = new ObjectId();

            const newProduct = new Product({
                // productId,
                title,
                description,
                image, 
                price,
                rating,
                category,
                stock
            });
    
            // Save the new product to the database
            await newProduct.save();
    
            res.status(201).json({ status: "success", message: "Product added successfully", product: newProduct });
            

        }catch(err){
            console.error(err);
            res.status(500).json({ status: "failed", err});
        }
    },

    getProducts: async(req,res)=>{
        try{
                const product=await Product.find()
                // console.log(product)
                res.status(200).json({ status: "success", data: product });
        }catch(err){
            console.error(err);
            res.status(500).json({ status: "failed", err});
        }
    },
    getProductsByCategory: async(req, res) => {
        try {
            const { category } = req.query;
            console.log(category)
            if (!category) {
                return res.status(400).json({ status: "failed", error: "Category query parameter is required" });
            }

            const products = await Product.find({ category : { $regex: new RegExp(category, 'i') }  });
            res.status(200).json({ status: "success", data: products });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: "failed", error: err.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const { id } = req.query;
            if (!ObjectId.isValid(id)) {
                return res.status(400).json({ status: "failed", error: "Invalid product ID" });
            }

            const product = await Product.findById(id);
            if (!product) {
                return res.status(404).json({ status: "failed", error: "Product not found" });
            }

            res.status(200).json({ status: "success", data: product });
        } catch (err) {
            console.error(err);
            res.status(500).json({ status: "failed", error: err.message });
        }
    }

}

module.exports=productModel