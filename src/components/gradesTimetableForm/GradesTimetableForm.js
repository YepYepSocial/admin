import React, {useContext, useMemo} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import {FileUploader} from "react-drag-drop-files";
import {parseGradesTimetable} from "../../helpers/parseGradesTimetable";
import {AppContext} from "../../AppContext";
import {useNavigate, useParams} from "react-router-dom";
import Week from "./components/week/Week";
import {postTimetable} from "../../api/postTimetable";
import {getGrades} from "../../api/getGrades";

const GradesTimetableForm = () => {
  const {fullTimetable, setFullTimetable, setIsAppLoading} = useContext(AppContext)
  const params = useParams();

  const weekday = useMemo(() => {
    return params.dayIndex
  }, [params])

  const gradesTimetable = useMemo(() => {
    return fullTimetable[weekday].gradesTimetable
  }, [fullTimetable, weekday])

  const onChange = async (_file) => {
    const gradesTimetable = await parseGradesTimetable(_file);

    const newFullTimeTable = [...fullTimetable];
    newFullTimeTable[weekday].gradesTimetable = gradesTimetable;
    newFullTimeTable[weekday].file = _file;

    setFullTimetable(newFullTimeTable)
  }

  const isButtonSaveDisabled = useMemo(() => {
    return fullTimetable[weekday].file === null
  }, [fullTimetable, weekday])

  const isButtonCancelVisible = useMemo(() => {
    return fullTimetable[weekday].file !== null
  }, [fullTimetable, weekday])

  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    navigate(`/${newValue}`);
  };

  const onCancelClick = () => {
    const newFullTimeTable = [...fullTimetable];
    newFullTimeTable[weekday].gradesTimetable = [];
    newFullTimeTable[weekday].file = null;

    setFullTimetable(newFullTimeTable)
  }

  const onConfirmClick = async () => {
    setIsAppLoading(true);

    const grades = await getGrades();

    gradesTimetable.forEach(async (grade) => {
      const gradeId = grades.find((_grade) => _grade.gradeName === grade.name).id
      await postTimetable(gradeId, weekday, grade.timetable)
    })

    setIsAppLoading(false);
  }

  return (
    <div>
      <Grid container justifyContent={'center'} direction={"column"} margin={'auto 0'} width={'530px'}>
        <Grid item>
          <Week dayIndex={weekday} onChange={handleChange}/>
        </Grid>
        <Grid item>
          <Grid item height={'500px'} overflow={'auto'}>
            { gradesTimetable?.map((grade) => (
              <div key={grade.name}>
                <Typography fontWeight={'bold'} pt={2}>
                  {grade.name}
                </Typography>
                <div>
                  {grade.timetable?.map((timetableItem, index) => (
                    <Grid container key={index} pt={2}>
                      <Grid item>
                        {index + 1}. {timetableItem?.subject}, {timetableItem?.classRoom}
                      </Grid>
                    </Grid>
                  ))}
                </div>
              </div>
            )) }
          </Grid>
          <Grid item pt={4}>
            <FileUploader handleChange={onChange} multiply={true} fileOrFiles={fullTimetable[weekday].file}/>
          </Grid>
          <Grid item container pt={2}>
            <Grid item pr={2}>
              <Button variant="contained" disabled={isButtonSaveDisabled} onClick={onConfirmClick}>
                Сохранить
              </Button>
            </Grid>
            {isButtonCancelVisible && <Grid item>
              <Button variant="outlined" color="error" onClick={onCancelClick}>
                Отменить
              </Button>
            </Grid>}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default GradesTimetableForm;
