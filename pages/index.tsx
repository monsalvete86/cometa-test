import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CuotasPagadas from './cuotasPagadas';
import CuotasPendientes from './cuotasPendientes';
import CuotasFuturas from './cuotasFuturas';

const theme = createTheme();

interface Orders {
  id?: string
  data:  {
    id?: any
  }
  status?: string
  
}

const Home: NextPage = () => {
  
  const [studentName, setStudentName] = useState('');
  const [studentCohort, setStudentCohort] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [paidOrders, setPaidOrders] = useState(null);
  const [dueOrders, setDueOrders] = useState(null);
  const [outstandingOrders, setOutstandingOrders] = useState(null);
  const [total, setTotal] = useState(0);

  async function getStudent() {
    const response =  await fetch(
      "https://cors-everywhere.herokuapp.com/http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/", 
      {
        headers: {
          hash: "OcJn4jYChW",
          key: "Content-Security-Policy",
          value: "default-src 'self' https: ; script-src 'self' ; object-src 'none'"
        },
      method: "GET"
      }
    );

    return  response;
  }

  async function getOrders() {
    const response =  await fetch(
      "https://cors-everywhere.herokuapp.com/http://ec2-3-239-221-74.compute-1.amazonaws.com:8000/api/v1/students/3b35fb50-3d5e-41b3-96d6-c5566141fab0/orders/", 
      {
        headers: {
          hash: "OcJn4jYChW",
          key: "Content-Security-Policy",
          value: "default-src 'self' https: ; script-src 'self' ; object-src 'none'"
        },
      method: "GET"
      }
    );

    return  response;
  }

  useEffect(() => {
   
    getStudent()
    .then((response) => response.json())  
    .then(data => {
      setStudentName(data.first_name + ' ' + data.last_name);
      setStudentCohort(data.cohort);
      setSchoolName(data?.school?.name);
      if (paidOrders === null) {
        getOrders()
        .then((response) => response.json())  
        .then(data => {
          setPaidOrders(data.filter((order: Orders) => order.status === "PAID"));
          setDueOrders(data.filter((order: Orders) => order.status === "DUE"));
          setOutstandingOrders(data.filter((order: Orders) => order.status === "OUTSTANDING"));
        })
      }
    });
  });

  const recalcTotal:any = () => {
   /* if (increment) setTotal(total + val);
    else setTotal(total - val);*/
    console.log('entra');
  } 
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar 
        position="absolute"
        color='transparent'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
          boxShadow: 3
        }}
      >
        <Toolbar>
          <Typography variant="h5" color="inherit" noWrap sx={{
            marginRight: '20px',
            backgroundColor: '#999',
            color: '#FFF',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            paddingLeft: '14px',
            paddingTop: '6px',
            fontWeight: 'bold'
          }}>
             B
          </Typography>
          <Typography variant="h5" color="inherit" noWrap>
            {schoolName}
          </Typography>
        </Toolbar>
      </AppBar>
      
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.palette.grey[100],
            p: '1rem'
          }}
        >
          <Card 
            sx={{ 
              minWidth: '100%',
              boxShadow: 'none',
            }}
          >
            <CardContent>
              <Grid container alignItems="center">
                <Grid  item xs={9}>
                  <Typography gutterBottom variant="h4" component="div">
                    {studentName}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography gutterBottom variant="h6" component="div">
                    {studentCohort}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={9} >
                  <Typography gutterBottom variant="h3" component="div">
                    Total a Pagar
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography gutterBottom variant="h3" component="div">
                    $ {total}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <CuotasPagadas  data={paidOrders}/>
          <CuotasPendientes data={dueOrders} />
          <CuotasFuturas data={outstandingOrders}/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2,
                position: 'sticky',
                bottom: '0px',
                fontSize: '22px',
                background: '#333',
                height: '55px',
                borderRadius: '27px',
                width: '90%'
              }}
            >
              IR A PAGAR
            </Button>
        </Box>
      
    </ThemeProvider>
  );
};

export default Home;