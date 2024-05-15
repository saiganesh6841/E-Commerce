
const user=require("../model/user")
const bcrypt=require('bcrypt')
const jwt=require("jsonwebtoken")
const SECRET_KEY=process.env.SECRET_KEY


const userController={

    userRegister: async (req,res)=>{
        try {
            const { username, email, password, roleType } = req.body;

            const existingUser = await user.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ status: "failed", error: "Email or username already exists" });
            }
    
            // hashing  the password
            const hashedPassword = await bcrypt.hash(password, 10);
      
            // Updating the password with hassed
            const userDetails = await user.create({ username, email, password: hashedPassword, roleType });
      
            res.status(201).json({ message: 'User registered successfully', userDetails });
          } catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", error: error.message });
          }
        },

    userLogin: async(req,res)=>{
        try{
            const {email,password}=req.body

            if(!email || !password){
                return res.status(400).json({ status: "failed", error: "All Fields Are Required" });
            }
            
            const login=await user.findOne({email})
            // console.log(login)
            if(!login || !(await bcrypt.compare(password, login.password))){
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            // console.log(login._id)
            const token=jwt.sign({userId:login._id},SECRET_KEY, { expiresIn: 86400 })
            res.status(200).json({ message: 'Login successful', token});
        }catch (error) {
            console.error(error);
            res.status(500).json({ status: "failed", error: error.message });
        }
    },
    getUserDetails: async (req, res) => {
        try {
           console.log(req.user)
            const userId = req.user;
            console.log(userId)
            // getting user details from the database
            const userDetails = await user.findOne({_id:userId},{email:1, username:1});
            console.log(userDetails)

            if (!userDetails) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.status(200).json({ message: 'User details retrieved successfully', userDetails });
        } catch (error) {
            console.log(error);
            res.status(500).json({ status: 'failed', error });
        }
    }
}
module.exports=userController