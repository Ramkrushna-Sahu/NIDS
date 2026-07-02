import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try {
        const fastApiUrl = process.env.FASTAPI_URL;

        if (!fastApiUrl) {
            return NextResponse.json({
                success: false,
                message: "FastAPI URL not configured"
            }, { status: 500 });
        }

        const { data } = await axios.get(`${fastApiUrl}/traffic-trend`);

        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Failed to fetch fetch traffic trend"
        }, { status: 500 });
    }
}