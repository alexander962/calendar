import { NextResponse } from 'next/server';

const fs = require('fs');
const path = require('path');

export async function POST(req) {
  if (req.method === 'POST') {
    req.defaultCors = true;
    const { data } = await req.json();
    const directoryPath = './tmp';
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }

    const filePath = path.join(directoryPath, 'calendarData.json');

    try {
      fs.writeFileSync(filePath, `${JSON.stringify(data)}`);
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  } else {
    console.log('Method not allowed');
  }

  return NextResponse.json('response');
}
