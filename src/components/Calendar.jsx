'use client';

import scheduleDataOuter from '../../tmp/calendarData';
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule';
import React, { useState } from 'react';

const Calendar = () => {
  const [scheduleData, setScheduleData] = useState(scheduleDataOuter ? scheduleDataOuter : []);

  const createEvent = async dataSchedule => {
    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': 'POST',
        },
        body: JSON.stringify({
          data: dataSchedule,
        }),
      });

      if (response.status === 200 || response.status === 202) {
        console.log('successfully');
      } else {
        console.log('Failed, please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      console.log('Error');
    }
  };

  const handleActionComplete = args => {
    console.log(args);
    if (
      args.requestType === 'eventCreated' ||
      args.requestType === 'eventChanged' ||
      args.requestType === 'eventRemoved'
    ) {
      createEvent([...scheduleData]);
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <ScheduleComponent
        height="650px"
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date()}
        actionComplete={handleActionComplete}
      >
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
