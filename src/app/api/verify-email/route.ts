import {NextRequest, NextResponse} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function GET(request: NextRequest) {
    try{
        await dbConnect();
        const token = request.nextUrl.searchParams.get("token");
        if(!token){
            return NextResponse.json({ success: false, error: "Token is missing" }, { status: 400 });
        }
        const user = await UserModel.findOne({ emailVerifyToken: token, emailVerifyTokenExpiry: { $gt: new Date() } });
        if(!user){
            return NextResponse.json({ success: false, error: "Invalid or expired token" }, { status: 400 });
        }
        if(!user.emailVerifyTokenExpiry || user.emailVerifyTokenExpiry < new Date()){
            return NextResponse.json({ success: false, error: "Token has expired" }, { status: 400 });
        }
        user.isVerified = true;
        user.emailVerifyToken = null
        user.emailVerifyTokenExpiry = null;
        await user.save();
        return NextResponse.json({ success: true, message: "Email verified successfully" }, { status: 200 });
    }catch(error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "Server Error",
            },
            { status: 500 }
        );
    }
    
}