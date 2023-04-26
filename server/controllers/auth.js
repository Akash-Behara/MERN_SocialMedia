import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// REGISTER USER
export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, password, picturePath, friends, location, occuption} = req.body;
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName, lastName, email, password: passwordHash, picturePath, friends, location, occuption, viewedProfile: Math.floor(Math.random() * 1000), impressions: Math.floor(Math.random() * 1000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// LOGIN USER
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if(!user){
            throw new Error(res.status(400).json({ message: "User does not exist" }))
            // res.status(400).json({ message: "User does not exist" })
        }

        const isMatchPassowrd = await bcrypt.compare(password, user.password);
        if(!isMatchPassowrd){
            throw new Error(res.status(400).json({ message: "Invaild Credentials" }))
            // res.status(400).json({ message: "Invaild Credentials" })
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        delete user.password;

        res.status(200).json({ token, user });

    } catch (err) {
        console.log(err)
        // res.status(500).json({ error: err.message });
    }
}