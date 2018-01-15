// React
import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

// This component should be connected but we can wait
const CalendarOverview = () => (
  <div>
    <h1>CalendarOverview </h1>
    <BigCalendar
      events={[]}
      startAccessor="startDate"
      endAccessor="endDate" />
  </div>
);

export default CalendarOverview;
