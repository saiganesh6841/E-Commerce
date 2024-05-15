
let express=require('express')
const router=express.Router()

const userController=require("../controller/user")
const productController=require('../controller/productController')
const cartController=require('../controller/cartController')
const authenticate=require('../middilewares/auth')
const validateRegister=require('../middilewares/validation')
const orderController=require('../controller/orderController')

router.post("/register",validateRegister,userController.userRegister)
router.post("/login",userController.userLogin)
router.post("/userDetails",authenticate,userController.getUserDetails)

router.post("/addProducts",productController.productAdds)
router.post("/getProducts",productController.getProducts)
router.get("/getProductsByCategory", productController.getProductsByCategory);
router.get("/getProductById", productController.getProductById);


router.post("/addCart",authenticate,cartController.addCart)
router.post("/getCart",authenticate,cartController.getCart)
router.post("/deleteCart",authenticate,cartController.deleteCart)
router.post("/clearCart",authenticate,cartController.clearCart)

router.post("/order",authenticate,orderController.createOrder)
router.post("/getOrders",authenticate,orderController.getOrders);
router.post("/deleteOrder",authenticate,orderController.deleteOrder)

module.exports=router