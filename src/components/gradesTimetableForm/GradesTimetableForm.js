import React, {useContext, useMemo} from 'react';
import {Button, Grid, Typography} from "@mui/material";
import {FileUploader} from "react-drag-drop-files";
import {parseGradesTimetable} from "../../helpers/parseGradesTimetable";
import {AppContext} from "../../AppContext";
import {useNavigate, useParams} from "react-router-dom";
import Week from "./components/week/Week";
import {postTimetable} from "../../api/postTimetable";

const GradesTimetableForm = () => {
  const {fullTimetable, setFullTimetable, setIsAppLoading} = useContext(AppContext)
  const params = useParams();

  const dayIndex = useMemo(() => {
    return params.dayIndex
  }, [params])

  const gradesTimetable = useMemo(() => {
    return fullTimetable[dayIndex].gradesTimetable
  }, [fullTimetable, dayIndex])

  const onChange = async (_file) => {
    const gradesTimetable = await parseGradesTimetable(_file);

    const newFullTimeTable = [...fullTimetable];
    newFullTimeTable[dayIndex].gradesTimetable = gradesTimetable;
    newFullTimeTable[dayIndex].file = _file;

    setFullTimetable(newFullTimeTable)
  }

  const isButtonSaveDisabled = useMemo(() => {
    return fullTimetable[dayIndex].file === null
  }, [fullTimetable, dayIndex])

  const isButtonCancelVisible = useMemo(() => {
    return fullTimetable[dayIndex].file !== null
  }, [fullTimetable, dayIndex])

  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    navigate(`/${newValue}`);
  };

  const onCancelClick = () => {
    const newFullTimeTable = [...fullTimetable];
    newFullTimeTable[dayIndex].gradesTimetable = [];
    newFullTimeTable[dayIndex].file = null;

    setFullTimetable(newFullTimeTable)
  }

  const onConfirmClick = () => {
    setIsAppLoading(true);

    gradesTimetable.forEach(async (grade) => {
      await postTimetable(grade.name, dayIndex, grade.timetable)
    })

    setIsAppLoading(false);
  }

  return (
    <div>
      <Grid container justifyContent={'center'} direction={"column"} margin={'auto 0'} width={'530px'}>
        <Grid item>
          <Week dayIndex={dayIndex} onChange={handleChange}/>
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
            <FileUploader handleChange={onChange} multiply={true} fileOrFiles={fullTimetable[dayIndex].file}/>
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
