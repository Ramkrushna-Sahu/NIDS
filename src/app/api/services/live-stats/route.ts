import { NextResponse } from "next/server";
import axios from "axios";
import dbConnect from '@/lib/dbConnect';
import AlertModel from "@/models/Alert";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

interface LiveAlert {
    flow_id: string;
    prediction: string;
    confidence: number;
    severity: "Low" | "Medium" | "High";
    timestamp: string;
    features: {
        "Average Packet Size": number;
        "Max Packet Length": number;
        "Flow Duration": number;
        "Destination Port": number;
    };
}

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?._id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
        }

        const fastApiUrl = process.env.FASTAPI_URL;

        if (!fastApiUrl) {
            return NextResponse.json({
                success: false,
                message: "FastAPI URL not configured"
            }, { status: 500 });
        }

        await dbConnect();
        const { data } = await axios.get(`${fastApiUrl}/live-stats`);
        console.log(data)
        if (data.success && Array.isArray(data.recent_alerts) && data.recent_alerts.length > 0) {
            await saveAlertsToMongo(data.recent_alerts, session.user._id)
        }
        return NextResponse.json({
            success: true,
            data
        }, { status: 200 });

    } catch (error: any) {
        console.error(error)
        return NextResponse.json({
            success: false,
            message: "Failed to fetch live statistics"
        }, { status: 500 });
    }
}

async function saveAlertsToMongo(alerts: LiveAlert[], userId: string) {
    try {
        for (const alert of alerts) {
            await AlertModel.updateOne({ flowId: alert.flow_id }, {
                $setOnInsert: {
                    userId: userId,
                    flowId: alert.flow_id,
                    attackType: alert.prediction,
                    confidence: alert.confidence,
                    severity: alert.severity,
                    timestamp: new Date(alert.timestamp),
                    features: alert.features,
                    source: "Realtime",
                    status: "New",
                    notes: "",
                    resolvedAt: null
                }
            }, {upsert: true});
        }
    }catch(error: any){
        return NextResponse.json({
            success: false,
            message: "MongoDB error"
        })
    }
}