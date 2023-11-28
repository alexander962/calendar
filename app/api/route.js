import { NextResponse } from 'next/server';

const fs = require('fs');
const path = require('path');

export function middleware() {
  // retrieve the current response
  const res = NextResponse.next();

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', 'true');
  res.headers.append('Access-Control-Allow-Origin', '*'); // replace this with your actual origin
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
  res.headers.append(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  return res;
}

// specify the path regex to apply the middleware to
export const config = {
  matcher: '/api',
};

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
