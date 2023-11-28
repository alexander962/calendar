// import { NextResponse } from 'next/server';
// const sgMail = require('@sendgrid/mail');
// export async function POST(req) {
//   if (req.method === 'POST') {
//     const { formData, sendGridApiKey } = await req.json();
//     const { name, company, email, phone, comments } = formData;
//     sgMail.setApiKey(sendGridApiKey);
//
//     const msg = {
//       to: 'sanyadeveloper2022@gmail.com',
//       from: 'info@martinhorn.com',
//       subject: 'New Contact Form Submission',
//       text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
//     };
//
//     try {
//       await sgMail.send(msg);
//       console.log('Email sent successfully!');
//     } catch (error) {
//       console.error('Error sending email:', error);
//     }
//   } else {
//     console.log('Method not allowed');
//   }
//
//   return NextResponse.json('response');
// }
// server.js
import { NextResponse } from 'next/server';

const fs = require('fs');
const path = require('path');

export async function POST(req) {
  if (req.method === 'POST') {
    req.defaultCors = true;
    const { data } = await req.json();
    const directoryPath = './data';
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    const filePath = path.join(directoryPath, 'calendarData.js');

    try {
      fs.writeFileSync(filePath, `export const scheduleDataOuter = ${JSON.stringify(data)};`);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  } else {
    console.log('Method not allowed');
  }

  return NextResponse.json('response');
}
