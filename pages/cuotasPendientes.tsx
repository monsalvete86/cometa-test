import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const theme = createTheme();

interface Orders {
  id?: string
  data?: any
  price?: string
  interest?: string
  name?: string
  due?: string
  payin?: {
    created?: string
  }
} 

interface OnChangeTotal{
  onChange: () => void;
}
export default function CuotasPendientes(orders: Orders) {
  let dueOrders = orders.data || [];
  const [pendientesDesplegado, setPagadasDesplegado] = useState(false);

  const desplegar = () => {
    setPagadasDesplegado(!pendientesDesplegado);
  }


  const cuotas = (orders: Orders[], onChange?: any) => {
    const months = ["Ene", "Feb", "Mar","Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dec"];
  
    const getPaymentDate = (orderDate: string) => {
      // console.log(orderDate);
      let created = new Date(orderDate);
      let formatted_date = "Vence el " + created.getDate() + " de " + months[created.getMonth()] + ".";
      return formatted_date;
    }
    // console.log(onChange)
    const funcChange =  () => {
     // onChage
    }

    return (
      <List>
        {
          orders.map((order) => {
            return (
              <ListItem
              key={order?.id}
              secondaryAction={
                <>
                <ListItemButton>
                  <ListItemText sx={{textAlign: 'right'}} primary={'$' + order?.price} secondary={order?.interest ? 'Interés: $ ' + order?.interest : ''}/>
                
                    <Checkbox
                      value={order?.price}
                      
                      sx={{
                        color: "#000",
                        "&.Mui-checked": {
                          color: "#000"
                        }
                      }}
                    />
                </ListItemButton>
                </>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemText  primary={order?.name} secondary={order?.due? getPaymentDate(order?.due) : ''} />
                
              </ListItemButton>
            </ListItem>
            );
          })
        }
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
        
        <Accordion expanded={pendientesDesplegado} sx={{ boxShadow: 'none' }} onChange={desplegar}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container alignItems="center">
              <Grid  >
                <Typography gutterBottom variant="h4" component="div" sx={{fontWeight: '600'}}>
                  Cuotas pendientes
                </Typography>
                {!pendientesDesplegado && 
                  <Typography gutterBottom variant="caption" component="div" sx={{color: theme.palette.grey[500]}}>
                    Dale click para expandir
                  </Typography>
                  }
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ flexGrow: 1, boxShadow: 'none' }} >
              {cuotas(dueOrders)}
            </Box>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
}
