import {NextResponse, NextRequest} from 'next/server';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import {signupSchema} from '@/schemas/signupSchema';
import bcrypt from 'bcryptjs';
import {sendEmail} from "../../../helpers/sendEmail"

export async function POST(req: NextRequest) {
    try{
        await dbConnect();
        const body = await req.json();
        const validate = signupSchema.safeParse(body);

        if(!validate.success) {
            return NextResponse.json({success: false, error: validate.error.flatten()}, {status: 400});
        }

        const {name, email, password} = validate.data;
        const existingUser = await UserModel.findOne({email});
        const hashedPassword = await bcrypt.hash(password, 10);

        if(existingUser && existingUser.isVerified) {
            return NextResponse.json({success: false, error: {email: ["Email/User already exists"]}}, {status: 400});
        }

        if(existingUser && !existingUser.isVerified) {
            existingUser.name = name;
            existingUser.password = hashedPassword;
            await existingUser.save();

            const emailResp = await sendEmail(email, "verify", existingUser._id.toString());
            if (!emailResp.success) {
                return NextResponse.json({ success: false, error: "Failed to send verification email" }, { status: 500 });
            }
            return NextResponse.json({success: true, message: "Email sent successfully"}, {status: 200});
        }

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const emailResp = await sendEmail(email, "verify", newUser._id.toString());
        if (!emailResp.success) {
            return NextResponse.json({ success: false, error: "Failed to send verification email" }, { status: 500 });
        }
        return NextResponse.json({success: true, message: "User created successfully"}, {status: 201});


    }
    catch (error) {
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