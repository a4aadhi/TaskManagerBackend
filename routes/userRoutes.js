const express = require('express');
const User = require('../MODELS/User');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



//register

router.post('/register', async (req,res)=>{

    try{
        const {name,email,password}= req.body;
        const user = new User ({name,email,password})
        await user.save();
        res.status(201).send({user, message:'user created successfully'});
    }
    catch(err){
        res.status(400).send({error: err})
    }
   
})


  
//login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Unable to login, invalid credentials' });
        }

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Unable to login, invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign(
            { _id: user._id.toString() },
            process.env.JWT_SECRET_KEY
        );

        res.status(200).json({
            user,
            token,
            message: "User logged in successfully"
        });
    } catch (err) {
        console.error("Login error: ", err); // Log the error to console
        res.status(500).json({ error: 'An error occurred during login' });
    }
});




module.exports = router;