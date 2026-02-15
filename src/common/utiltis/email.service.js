import nodemailer from 'nodemailer';

export const sendEmail = async ({to, subject, text}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_email_app_password'
        }
    });

    const info = await transporter.sendMail({
        from: 'your_email@gmail.com',
        to,
        subject,
        text
    });

    console.log('Email sent: ', info.messageId);
    return info;
}