import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const fastapiURL = process.env.FASTAPI_URL;

        // console.log(formData)

        if (!fastapiURL) {
            return NextResponse.json({
                success: false,
                message: "FastAPI URL not configured"
            }, { status: 500 });
        }
        const {data} = await axios.post(`${fastapiURL}/analyze-file`, formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        });
        console.log("file analyzer: ", data)
        return NextResponse.json({success: true, data},{status: 200})
    }
    catch (error: any) { 
        console.error(error);
        return NextResponse.json({
            success: false, message:"Failed to analyze file"
        }, {status: 500})
    }
}