import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlertModel from "@/models/Alert";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "20");
        const severity = searchParams.get("severity");
        const attackType = searchParams.get("attackType");

        const query: any = {};

        if (severity) query.severity = severity;
        if (attackType) query.attackType = attackType;

        const skip = (page - 1) * limit;

        const [alerts, total] = await Promise.all([
            AlertModel.find(query)
                .sort({ timestamp: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            AlertModel.countDocuments(query)
        ]);
        // console.log(alerts)
        return NextResponse.json({
            success: true,
            alerts,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                hasNext: page < Math.ceil(total / limit)
            }
        });

    } catch (error: any) {
        console.error("Fetch alerts error:", error);
        return NextResponse.json({
            success: false,
            message: "Failed to fetch alerts"
        }, { status: 500 });
    }
}