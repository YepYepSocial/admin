import React, {useState} from "react";
import AppLoader from "./components/appLoader/AppLoader";
import GradesTimetableForm from "./components/gradesTimetableForm/GradesTimetableForm";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {AppContext} from "./AppContext";

const $fullTimetable = [
  {
    weekday: 'ПН',
    gradesTimetable: [],
    file: null,
  },
  {
    weekday: 'ВТ',
    gradesTimetable: [],
    file: null,
  },
  {
    weekday: 'СР',
    gradesTimetable: [],
    file: null,
  },
  {
    weekday: 'ЧТ',
    gradesTimetable: [],
    file: null,
  },
  {
    weekday: 'ПТ',
    gradesTimetable: [],
    file: null,
  },
  {
    weekday: 'СБ',
    gradesTimetable: [],
    file: null,
  },
]

function App() {
  const [fullTimetable, setFullTimetable] = useState($fullTimetable);
  const [isAppLoading, setIsAppLoading] = useState();

  return (
    <AppContext.Provider value={{ fullTimetable, setFullTimetable, isAppLoading, setIsAppLoading }}>
      <div className='main'>
        <AppLoader isOpen={isAppLoading} />
        <Routes>
          <Route path={'/:dayIndex'} element={<GradesTimetableForm />}/>
          <Route path="*" element={<Navigate to="/0" />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
