import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
    try {
        const body = request.json();
        const fastapiURL = process.env.FASTAPI_URL;

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
        return NextResponse.json({
            success: true,
            data
        }, {status: 200})
    }
    catch (error: any) {
        console.error(error)
        return NextResponse.json({ success: false, message: "Failed to get prediction" }, { status: error?.response?.status || 500 })
    }
}