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
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `<p>Click on the link to ${emailType === 'VERIFY' ? 'verify' : 'reset'} your password</p>
            <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">Click here</a>`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email Sent: ", mailResponse);

        return mailResponse;
    } catch (error: any) {
        console.error("Error in sendEmail:", error);
        throw new Error("Email could not be sent");
    }
};


// import nodemailer from 'nodemailer';
// import User from '@/models/userModel';
// import bcrypt from 'bcryptjs';

// export const sendEmail = async ({ email, emailType, userId }: any) => {
//     try {
//         const hashedToken = await bcrypt.hash(userId.toString(), 10);

//         if (emailType === 'VERIFY') {
//             await User.findIdAndUpdate(userId, { verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 10 * 60 * 1000 });
//         } else if (emailType === 'RESET') {
//             await User.findIdAndUpdate(userId, { forgotPasswordToken: hashedToken, forgotPasswordExpiry: Date.now() + 10 * 60 * 1000 });
//         }
//         // Looking to send emails in production? Check out our Email API/SMTP product!
//         var transport = nodemailer.createTransport({
//             host: "sandbox.smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//                 user: "81da6fc5e0da69",
//                 pass: "b564943d31ac19"
//             }
//         });

//         const mailOptions = {
//             from: "uditnarayanpagad@gmail.com",
//             to: email,
//             subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
//             html: `<p>Click on the link to ${emailType === 'VERIFY' ? 'verify' : 'reset'} your password</p>
//             <a href="${process.env.DOMAIN}/verifyEmail?token=${hashedToken}">Click here</a>`
//         }
//         const mailResponse = await transport.sendMail(mailOptions);
//         return mailResponse;
//     } catch (error: any) {
//         console.error(error);
//     }
// }