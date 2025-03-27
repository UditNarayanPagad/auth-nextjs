import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        const response = NextResponse.json({ message: "Login successful", success: true, user });
        response.cookies.set('token', token, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 24 * 60 * 60,
        });
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}