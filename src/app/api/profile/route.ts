import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions);
        if (!session || !session?.user?._id) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }
        const user = await UserModel.findById(session.user._id).select('-password');
        if (!user) {
            return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        });
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}