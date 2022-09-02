import React, { useState, useEffect } from "react";
import { Box, ThemeProvider, Grid, CircularProgress, Button, makeStyles } from "@material-ui/core";
import theme from "../../theme/theme";
import Header from "../Header";
import JobCard from "../Job/JobCard";
import { firestore } from "../Firebase/firebase";
import ViewJobModal from "../Job/ViewJobModal";
import {useAuth} from "../../Context/AuthContext"
import {  useHistory } from 'react-router-dom' 
import { DragDropContext,Droppable,Draggable } from "react-beautiful-dnd";

const useStyle=makeStyles((theme)=>({
  
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
  const classes=useStyle();

    const [jobs, setJobs] = useState([]);
    const [loading, setloading] = useState(true);
    const [newJobModal, setNewJobModal]= useState(false)
    const [viewJob, setViewJob] = useState({});
    const { logout } = useAuth()
    const history=useHistory(); 
    const [dragcard, updatedragCard] = useState([])
    

    const fetchJobs = async () => {
      setloading(true);
      const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();
       const tempJob= req.docs.map((job)=> ({ ...job.data(), id: job.id }));
       setJobs(tempJob);
       updatedragCard(tempJob)
       setloading(false);
    };

   async function handleLogout(){
    await logout()
    history.push("/userlogin")
}

useEffect(() => {
      fetchJobs();
     
}, [])


 function handleOnDragEnd(result) {
    const items= Array.from(dragcard);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0 , reorderedItem);
    updatedragCard(items);
}


  return (
    
 <ThemeProvider className="my-1" theme={theme}>
 <Header disable={true} openNewJobModal={() => setNewJobModal(true)} />
    <Button variant="contained" className={classes.button} bgcolor="cyan" disableElevation onClick={handleLogout}><strong>Logout</strong></Button>
    <ViewJobModal job={viewJob} closeModal={()=>setViewJob({})}/>
    
    <Box mb={3}>
    <DragDropContext onDragEnd={handleOnDragEnd} >
        <Droppable droppableId="JobCards">
            {(provided)=>(
                <Grid container justify="center" {...provided.droppableProps} ref={provided.innerRef}>
                    
                <Grid item xs={10}> 
                   {loading?
                  <Box  display="flex" justifyContent="center"><CircularProgress/></Box>
                  :dragcard.map((job,index) =>{return(<Draggable key={job.id} draggableId={job.id}  index={index}>
                    {(provided) => (
                        <Grid item {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                       <JobCard open={()=> setViewJob(job)}  {...job} />
                       </Grid>
                    )}
                    </Draggable>)} ) }
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
