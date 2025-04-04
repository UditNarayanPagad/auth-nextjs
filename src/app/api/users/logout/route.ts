import { NextResponse } from "next/server";

export function GET(){
    try {
        const response = NextResponse.json({ message: "Logout successful", success: true });
        response.cookies.set('token', '', {httpOnly: true, maxAge: 0});
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}