import { NextResponse } from 'next/server';

const withCors = require('nextjs-cors');

const fs = require('fs');
const path = require('path');

export async function POST(req) {
  if (req.method === 'POST') {
    req.defaultCors = false;
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
