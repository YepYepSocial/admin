import React from 'react';
import {Tab, Tabs} from "@mui/material";

const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']

const Week = ({ dayIndex, onChange }) => {
  return (
    <Tabs value={Number(dayIndex)} onChange={onChange} centered>
      {
        weekdays.map((weekday, index) => (
          <Tab value={index} label={weekday} key={weekday}/>
        ))
      }
    </Tabs>
  );
};

export default Week;
