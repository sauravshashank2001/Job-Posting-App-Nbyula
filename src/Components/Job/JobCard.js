import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
    wrapper: {
        border: "1px solid #e8e8e8",
        cursor: "pointer",
        transition: "0.5s",

        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
            borderLeft: "6px solid #4D64E4",
        },
    },
    companyName: {
        fontSize: "15.5px",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(0.75),
        borderRadius: "5px",
        display: "inline-block",
        fontWeight: 600,

    },
    skillchip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: "14.5px",
        borderRadius: "5px",
        transition: "3s",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: "#fff",
    },

}));

export default (props) => {

    const classes = useStyle();
    let endDate = parseInt(props.deadline);
    return (
        <Box p={4} bgcolor={endDate <= 14 && endDate > 3 ? "yellow" : (endDate > 21 ? "green" : "red")} className={classes.wrapper}>
            <Grid container alignItems="center" >
                <Grid item xs>
                    <Typography variant="subtitle1"><h6><strong>{props.title}</strong></h6></Typography>
                    <Typography className={classes.companyName} variant="subtitle1"><strong>{props.companyName}</strong></Typography>
                </Grid>
                <Grid item container xs>
                    {props.skills.map((skill) => (
                        <Grid className={classes.skillchip} key={skill} item>{skill}</Grid>
                    ))}
                </Grid>
                <Grid item container direction="column" alignItems="flex-end" xs>
                    <Grid item>
                        <Typography ><strong>Closing in {props.deadline} days,</strong> <strong>{props.location},</strong>  <strong>{props.phone},</strong> <strong>{props.email}</strong> </Typography>
                    </Grid>
                    <Grid item>
                        <Box >
                            <Button className="mx-2" onClick={props.open} variant="outlined">Check</Button>
                            <Button variant="outlined">Interest</Button>
                        </Box>
                        <Box mt={2}>

                        </Box>
                    </Grid>
                </Grid>

            </Grid>
        </Box>
    )
}