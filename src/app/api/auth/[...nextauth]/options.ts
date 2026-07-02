import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.email },
                            { name: credentials.name }
                        ]
                    })
                    // console.log(user)
                    if (!user) {
                        throw new Error("Invalid credentials");
                    }
                    if (!user.isVerified) {
                        throw new Error("Please verify your email before logging in");
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user
                    } else {
                        throw new Error("Invalid Password");
                    }
                } catch (error) {
                    console.log(error);
                    throw new Error("Server error");
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.name = token.name
                session.user.isVerified = token.isVerified
            }
            // console.log(session)
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                await dbConnect();
                const dbUser=await UserModel.findOne({
                    email: user.email
                })
                if(dbUser){

                    token._id = dbUser._id?.toString()
                    token.name = dbUser.name
                    token.isVerified = dbUser.isVerified
                }
            }
            return token
        },
        async signIn({ user, account }) {
            if(account?.provider === "google"){
                if(!user.email){
                    return false;
                }
                await dbConnect();
                const existingUser = await UserModel.findOne({email:user.email});
                if(!existingUser){
                    await UserModel.create({
                        name: user.name,
                        email: user.email,
                        isVerified: true,
                        password: ""
                    })
                }
            }
            return true
        },
    },
    pages: {
        signIn: "/sign-in"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
}