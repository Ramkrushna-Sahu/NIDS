import mongoose, { Schema, Document } from "mongoose";

export interface Alert extends Document {
    userId: mongoose.Types.ObjectId;
    flowId: string;
    attackType: string;
    confidence: number;
    severity: "Low" | "Medium" | "High";
    timestamp: Date;
    features: {
        "Average Packet Size": number;
        "Max Packet Length": number;
        "Flow Duration": number;
        "Destination Port": number;
    };
    source: "Realtime";
    status: "New" | "Reviewed" | "Resolved" | "False Positive";
    notes: string;
    createdAt: Date;
    updatedAt: Date;
}

const AlertSchema: Schema<Alert> = new Schema({
        userId: {type: Schema.Types.ObjectId,ref: "User",required: true,},
        flowId: {type: String,required: true,unique: true},
        attackType: {type: String,required: true,},
        confidence: {type: Number,required: true,},
        severity: {type: String,enum: ["Low", "Medium", "High"],required: true,},
        timestamp: {type: Date},
        features: {
            type: {
                "Average Packet Size": Number,
                "Max Packet Length": Number,
                "Flow Duration": Number,
                "Destination Port": Number,
            },
            required: true,
        },
        source: {type: String,enum: ["Realtime"],default: "Realtime",},
        status: {type: String,enum: ["New", "Reviewed", "Resolved", "False Positive"],default: "New",},
        notes: {type: String,default: "",},
    },
    {timestamps: true,}
);

const AlertModel = (mongoose.models.Alert as mongoose.Model<Alert>) ||mongoose.model<Alert>("Alert", AlertSchema);
export default AlertModel;