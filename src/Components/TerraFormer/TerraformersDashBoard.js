import React, { useState, useEffect } from "react";
import { Box, ThemeProvider, Grid, CircularProgress, Button, makeStyles } from "@material-ui/core";
import theme from "../../theme/theme";
import Header from "../Header";
import JobCard from "../Job/JobCard";
import NewJobModal from "../Job/NewJobModal";
import { firestore, app } from "../Firebase/firebase";
import ViewJobModal from "../Job/ViewJobModal";
import { useAuth } from "../../Context/AuthContext"
import { useHistory } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";



const useStyle = makeStyles((theme) => ({

  button: {
    fontSize: "20px",
    backgroundColor: "LightGray",
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,

  },


}));

const Home = () => {
  const classes = useStyle();
  const [jobs, setJobs] = useState([]);
  const [loading, setloading] = useState(true);
  const [newJobModal, setNewJobModal] = useState(false)
  const [viewJob, setViewJob] = useState({});
  const { logout } = useAuth()
  const history = useHistory();
  const [dragcard, updatedragCard] = useState([])


  const fetchJobs = async () => {
    setloading(true);
    const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();
    const tempJob = req.docs.map((job) => ({ ...job.data(), id: job.id }));
    setJobs(tempJob);
    updatedragCard(tempJob)
    setloading(false);
  };


  const postJob = async jobDetails => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp()
    });
    fetchJobs();
  }

  async function handleLogout() {
    await logout()
    history.push("/login")
  }

  useEffect(() => {
    fetchJobs();

  }, [])


  function handleOnDragEnd(result) {
    const items = Array.from(dragcard);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updatedragCard(items);
  }


  return (

    <ThemeProvider theme={theme}>
      <Header disable={false} openNewJobModal={() => setNewJobModal(true)} />
      <div ><Button variant="contained" className={classes.button} onClick={handleLogout}>Logout</Button>
      </div>
      <NewJobModal closeModal={() => setNewJobModal(false)} newJobModal={newJobModal} postJob={postJob} />
      <ViewJobModal job={viewJob} closeModal={() => setViewJob({})} />

      <Box mb={3}>
        <DragDropContext onDragEnd={handleOnDragEnd} >
          <Droppable droppableId="JobCards">
            {(provided) => (
              <Grid container justify="center" {...provided.droppableProps} ref={provided.innerRef}>

                <Grid item xs={10}>
                  {loading ?
                    <Box display="flex" justifyContent="center"><CircularProgress /></Box>
                    : dragcard.map((job, index) => {
                      return (<Draggable key={job.id} draggableId={job.id} index={index}>
                        {(provided) => (
                          <Grid item {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <JobCard title2="Interest" open={() => setViewJob(job)}  {...job} />
                          </Grid>
                        )}
                      </Draggable>)
                    })}
                </Grid>
              </Grid>
            )}

          </Droppable>
        </DragDropContext>
      </Box>

    </ThemeProvider>
  )
}

export default Home
