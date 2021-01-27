const sgMail = require('@sendgrid/mail');
const sendGridApiKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridApiKey);


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'b0583275342@gmail.com',
        subject: 'welcome to task manager',
        text: `welcome to the app, ${name} let me know how you get along with the app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'b0583275342@gmail.com',
        subject: 'Goodbye',
        text: `Goodbye ${name} Is there anything we can do to see you again?`
    })
}



module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}