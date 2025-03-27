import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {username, email, password} = reqBody;

        console.log(reqBody);

        //check if user exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({error: 'User already exists'}, {status: 400});
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,email, password: hashedPassword
        });
        const savedUser = await newUser.save();
        
        console.log(savedUser);

        return NextResponse.json({message: "User created successfully",success: true, savedUser});

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}