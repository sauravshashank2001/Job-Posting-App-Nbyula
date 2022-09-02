import { Button, ThemeProvider, makeStyles, Grid } from '@material-ui/core';
import React from 'react'
import { useHistory } from "react-router-dom";
import theme from './theme/theme';



const useStyle = makeStyles((theme) => ({


  skillchip: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    fontSize: "5vh",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 1000,
    backgroundColor: "cyan",
    color: "black",
  },

}));



export default function LandingPage() {
  const classes = useStyle();
  const history = useHistory()

  const handleOnApplicants = () => {
    history.push("/Userlogin");

  }
  const handleOnTeraformer = () => {
    history.push("/login");
  }


  return (
    <ThemeProvider theme={theme} className="d-flex align-item-center justify-content-center" >


      <div className="container my-4" >
        <h1 ><strong> Welcome to FINDIN</strong> </h1>
        <Grid item className='my-5' >
          <Button style={{ minWidth: "80vw", minHeight: "20vh" }} className={classes.skillchip} onClick={handleOnTeraformer} bgcolor="green">
            <strong>Terraformer</strong>
          </Button>
        </Grid>



        <Grid item className='my-5' >
          <Button style={{ minWidth: "80vw", minHeight: "20vh" }} className={classes.skillchip} onClick={handleOnApplicants}>
            <strong>Applicant</strong>
          </Button>
        </Grid>

      </div>



    </ThemeProvider>
  )
}
