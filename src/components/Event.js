import React from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import PlaceIcon from '@material-ui/icons/Place';
import ClassIcon from '@material-ui/icons/Class';
import DuoIcon from '@material-ui/icons/Duo';
import { Button } from '@material-ui/core';
import { deleteEvent } from '../services/backend-services';

export default function EventElement ({idx, info, classes, deleteElement}) {
    const [infoElement] = React.useState(info);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const fechaInicio = new Date(infoElement.event_initial_date);
    const fechaFin = new Date(infoElement.event_final_date);
    
    return (
      <div>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <AnnouncementIcon />
        </ListItemIcon>
       <ListItemText primary={infoElement.event_name}/>
       {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
           <ListItemText primary={`Categoria: ${infoElement.event_category}`}/>
         </ListItem>
         <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EventAvailableIcon />
            </ListItemIcon>
           <ListItemText primary={`Fecha de Inicio: ${fechaInicio}`}/>
         </ListItem>
         <ListItem button className={classes.nested}>
            <ListItemIcon>
              <EventBusyIcon />
            </ListItemIcon>
           <ListItemText primary={`Fecha Final: ${fechaFin}`}/>
         </ListItem>
         <ListItem button className={classes.nested}>
            <ListItemIcon>
              <PlaceIcon />
            </ListItemIcon>
           <ListItemText primary={`Lugar: ${infoElement.event_place}`}/>
         </ListItem>
         <ListItem button className={classes.nested}>
            <ListItemIcon>
              <DuoIcon />
            </ListItemIcon>
           <ListItemText primary={`Tipo: ${infoElement.event_type}`}/>
         </ListItem>
         <ListItem button className={classes.nested}>
            <ListItem className={classes.nested}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(event) => {                
                        event.preventDefault();
                        console.log("Actualizar clickeado")
                    }}
                >
                    Actualizar
                </Button>
            </ListItem>   
            <ListItem button className={classes.nested}>
            <Button
                    variant="contained"
                    color="secondary"
                    onClick={(event) => {                
                        event.preventDefault();
                        console.log("Eliminar clickeado");
                        deleteElement(idx);
                        deleteEvent(info.id);
                    }}
                >
                    Eliminar
                </Button>
            </ListItem>   
         </ListItem>
       </List>
      </Collapse>
      </div>
    );
  };
