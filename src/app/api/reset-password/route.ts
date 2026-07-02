import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    try {
        await dbConnect();
        const { token, password } = await request.json();

        const user = await UserModel.findOne({
            resetPasswordToken: token, 
            resetPasswordTokenExpiry:
            {
                $gt:
                    new Date(),
            },
        });

        if (!user) {
            return NextResponse.json(
                {
                    success:false,
                    message:"Invalid or expired token",
                },
                {
                    status: 400,
                }
            );
        }

        const hashedPassword =await bcrypt.hash(password,10);

        user.password =hashedPassword;

        user.resetPasswordToken =null;

        user.resetPasswordTokenExpiry =null;

        await user.save();

        return NextResponse.json({success:true,message:"Password updated successfully",});
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success:false,
                message:"Server error",
            },
            {
                status: 500,
            }
        );
    }
}