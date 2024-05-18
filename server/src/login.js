const {Router} = require("express");
const { user }  = require('../database/schema/user')

const {hashpassword, comparePassword } = require('../utli/password')

const router = Router();

router.post('/register',async(req,res)=>{
    const {firstName,lastName,userName,emailID,password} = req.body; 

    if(!firstName||!lastName || !userName || !emailID || !password){
        const response = {
            status:400,
            msg:"please fill the details"
        }

        return res.send(response)
    } 
    
    const userDB = await user.findOne({emailID});

    if(userDB){

        console.log('user already exist')

        const response  = {
            status: false,
            code : 400,
            msg: "user already exist"
        }
        res.send(response)
    }
    else{
        console.log("success!")

        const response = {
            status: true,
            code : 200,
            msg : "success"
        }

        res.send(response) 
        const hashedpassword = hashpassword(req.body.password)
       

        const newuser = await user.create({firstName,lastName,userName,emailID,password:hashedpassword})

        newuser.save()
    }
   
})  

router.post('/login', async (req, res) => {
    const { emailID, password } = req.body;

    if (!emailID || !password) return res.sendStatus(400);

    const userDB = await user.findOne({ emailID });

    if (!userDB) {
        const response = {
            status: false,
            code: 401,
            msg: "Invalid email or password"
        }
        return res.status(401).json(response);
    }

    const isValid = comparePassword(password, userDB.password);

    if (isValid) {
        console.log("matched ");

        const response = {
            status: true,
            code: 200,
            msg: "Thank You! Login Successful",
            firstName: userDB.firstName,
            lastName: userDB.lastName
        };

        return res.status(200).json(response);
    } else {
        console.log("unmatched");

        const response = {
            status: false,
            code: 400,
            msg: "Invalid email or password"
        };
        return res.status(400).json(response);
    }
});


router.get('/getuserDetails',async(req,res)=>{
    const userDB = await user.find()

    return res.send(userDB)
}) ;

router.put('/editUser/:id', async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, userName, emailID } = req.body;

    try {
        const updatedUser = await user.findByIdAndUpdate(id, { firstName, lastName, userName, emailID }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        res.json({ status: true, msg: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Internal server error" });
    }
});


router.delete('/deleteUser/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await user.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        res.json({ status: true, msg: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, msg: "Internal server error" });
    }
});



module.exports = router;