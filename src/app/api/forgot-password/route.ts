import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { sendEmail } from "@/helpers/sendEmail";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const body = await req.json();
        const validate = forgotPasswordSchema.safeParse(body);

        if (!validate.success) {
            return NextResponse.json({ success: false, error: validate.error }, { status: 400 });
        }

        const { email } = validate.data;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        await sendEmail(email, "forgot", user._id.toString());
        return NextResponse.json({ success: true, message: "Reset email sent successfully" }, { status: 200 });
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