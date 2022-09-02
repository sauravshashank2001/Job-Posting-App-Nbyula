import React from 'react'
import { Box, Grid, Typography, Button } from '@material-ui/core'


export default (props) =>
    <Box py={8} bgcolor="secondary.main" color="white">
        <Grid container justify="center">
            <Grid item xs={10}>

                <Box display="flex"justifyContent="space-between" >
                    <Typography variant="h4"> <strong>JOBS</strong></Typography>

                    {props.disable===false?<Button onClick={props.openNewJobModal} variant='contained' color="primary" disableElevation>Post Job</Button>:" "}
                </Box>

            </Grid>
        </Grid>

    </Box>

