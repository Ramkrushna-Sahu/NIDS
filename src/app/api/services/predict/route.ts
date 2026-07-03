import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    // console.log("📥 Received in Next.js API:", request.json());
    try {
        const body = await request.json();
        const fastapiURL = process.env.FASTAPI_URL;
        // console.log("📥 Received in Next.js API inside try-catch:", body);
        if (!fastapiURL) {
            return NextResponse.json({
                success: false,
                message: "FastAPI URL not configured"
            }, { status: 500 });
        }

        const { data } = await axios.post(`${fastapiURL}/predict`, body, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        // console.log("✅ FastAPI Response:", data);

        return NextResponse.json({
            success: true,
            data
        }, {status: 200})
    }
    catch (error: any) {
        console.error("/predict arror: ")
        return NextResponse.json({ success: false, message: "Failed to get prediction" }, { status: error?.response?.status || 500 })
    }
}