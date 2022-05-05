import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import * as Services from './services/services';

const theme = createTheme();

interface Orders {
  id?: string
  data: any
  price?: string
  interest?: string
  name?: string
  due?: string
  payin?: {
    created?: string
  }
}

export default function CuotasPagadas(orders: Orders) {
  let paidOrders = orders.data || [];

  const [pagadasDesplegado, setPagadasDesplegado] = useState(false);

  const desplegar = () => {
    setPagadasDesplegado(!pagadasDesplegado);
  }

  
  
 const cuotas = (paidOrders: Orders[]) => {
    const months = ["Ene", "Feb", "Mar","Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
  
    const getPaymentDate = (orderDate: string) => {
      // console.log(orderDate);
      let created = new Date(orderDate);
      let formatted_date = "Pagado el " + created.getDate() + " de " + months[created.getMonth()] + ".";
      return formatted_date;
    }
  
    return (
      <List>
        {paidOrders.map((order) => {
          return (
            <ListItem
            key={order?.id}
            secondaryAction={
              <>
                $ {order?.price}
              </>
            }
            disablePadding
          >
            <ListItemText  primary={order?.name} secondary={order?.payin?.created? getPaymentDate(order?.payin?.created) : ''}/>
          </ListItem>
          );
        })}
      </List>
    );

 };

  return (
    <Card 
      sx={{ 
        minWidth: '100%',
        boxShadow: 'none',
        my: '8px'
      }}
    >
      <CardContent
        sx={{
          boxShadow: 'none',
        }}
      >
        
        <Accordion  expanded={pagadasDesplegado} sx={{ boxShadow: 'none' }} onChange={desplegar}>
          <AccordionSummary            
            expandIcon={<ExpandMoreIcon />}
            id="panel-header"
          >
            <Grid container alignItems="center">
              <Grid >
                <Typography gutterBottom variant="h4" component="div" sx={{fontWeight: '600'}}>
                  Cuotas pagadas
                </Typography>
                {!pagadasDesplegado && 
                  <Typography gutterBottom variant="caption" component="div" sx={{color: theme.palette.grey[500]}}>
                    Dale click para expandir
                  </Typography>
                }
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, boxShadow: 'none' }} >
              {cuotas(paidOrders)}
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
