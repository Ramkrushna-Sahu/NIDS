import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import UserModel from '@/models/User';
import crypto from 'crypto';

type EmailType = 'verify' | 'forgot';

export const sendEmail = async (
    email: string,
    emailType: EmailType,
    userId: string
) => {
    try {
        // const hashedToken = await bcrypt.hash(userId.toString(), 10);
        const token = crypto.randomBytes(32).toString('hex');
        if (emailType === "verify") {
            await UserModel.findByIdAndUpdate(userId, {
                emailVerifyToken: token,
                emailVerifyTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
            })
        }
        if (emailType === "forgot") {
            await UserModel.findByIdAndUpdate(userId, {
                resetPasswordToken: token,
                resetPasswordTokenExpiry: new Date(Date.now() + 3600000) // 1 hour
            })
        }

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,

            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASS,
            },
        });

        const verifyUrl =
            `${process.env.NEXT_PUBLIC_BASE_URL}/${emailType === "verify"
                ? "verify-email"
                : "reset-password"
            }?token=${token}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: emailType === "verify" ? "Verify your email" : "Reset your password",
            html: `
      <h2>
        ${emailType === "verify"
                    ? "Verify Email"
                    : "Reset Password"
                }
      </h2>

      <p>
        Click below:
      </p>

      <a href="${verifyUrl}">
        ${emailType === "verify"
                    ? "Verify Account"
                    : "Reset Password"
                }
      </a>

      <br />
      <br />

      <p>
        ${verifyUrl}
      </p>
      `
        }

        const response = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", response);
        return {
            success: true,
            message: "Email sent successfully",
            response
        }
    } catch (error) {
        console.error("Error sending email: ", error);
        return {
            success: false,
            message: "Failed to send email"
        }
    }
}