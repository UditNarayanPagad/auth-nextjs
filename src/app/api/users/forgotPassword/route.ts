import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const token = reqBody.token;
        const password = reqBody.user.password;
        const existUser = await User.findOne({ email: reqBody.user.email });
        console.log("Received Token:", token);
        if (!existUser) {
            console.log("User not found");
            return NextResponse.json({ error: "User not exist" }, { status: 400 });
        }
        if(!(token.length > 0)) {
            await sendEmail({ email: reqBody.user.email, emailType: "RESET", userId: existUser._id })
            return NextResponse.json({ message: "Check your email", success: true })
        }

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordExpiry: { $gt: Date.now() }
        });
        if (!user) {
            return NextResponse.json({ error: "Invalid token" }, { status: 400 });
        }
        console.log(user)
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Reset password Successfull", success: true })
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}