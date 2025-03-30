import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 10 * 60 * 1000
            });
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordExpiry: Date.now() + 10 * 60 * 1000
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS 
            }
        });

        const mailOptions = {
            from: "authnext@gmail.com",
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify Your Email Address' : 'Reset Your Password',
            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
                    <h2 style="text-align: center; color: #007BFF;">
                        ${emailType === 'VERIFY' ? 'Verify Your Email' : 'Reset Your Password'}
                    </h2>
                    <p>Hello,</p>
                    <p>
                        ${
                            emailType === 'VERIFY' 
                            ? 'Thank you for signing up! Please confirm your email address by clicking the button below.'
                            : 'We received a request to reset your password. Click the button below to proceed.'
                        }
                    </p>
                    <div style="text-align: center; margin: 20px 0;">
                        <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyEmail' : 'forgotPassword'}?token=${hashedToken}" 
                            style="background-color: #007BFF; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                            ${emailType === 'VERIFY' ? 'Verify Email' : 'Reset Password'}
                        </a>
                    </div>
                    <p>If the button above doesn’t work, paste this link into your browser:</p>
                    <p style="word-break: break-all; color: #555;">
                        <a href="${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyEmail' : 'forgotPassword'}?token=${hashedToken}" style="color: #007BFF;">
                            ${process.env.DOMAIN}/${emailType === 'VERIFY' ? 'verifyEmail' : 'forgotPassword'}?token=${hashedToken}
                        </a>
                    </p>
                    <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                    <p style="font-size: 14px; color: #777;">If you didn't request this, please ignore this email.</p>
                    <p style="font-size: 14px; color: #777;">Best regards, <br> <strong>AuthNext Team</strong></p>
                </div>
            `,
        };
        

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email Sent: ", mailResponse);

        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendEmail:", error);
        throw new Error("Email could not be sent");
    }
};
