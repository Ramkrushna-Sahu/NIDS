import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        // const body = await request.json(); 
        const fastApiUrl = process.env.FASTAPI_URL;

        if (!fastApiUrl) {
            return NextResponse.json({
                success: false,
                message: "FastAPI URL not configured"
            }, { status: 500 });
        }

        const { data } = await axios.post(`${fastApiUrl}/stop-monitoring`);

        return NextResponse.json({ 
            success: true, 
            data 
        },{status: 200});

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Failed to stop monitoring"
        }, { status: 500 });
    }
}