import React from 'react';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

export default function EventElement ({info, classes}) {
    const [infoElement] = React.useState(info);
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    console.log("Elemento recibido", info)
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
              <StarBorder />
            </ListItemIcon>
           <ListItemText primary="Starred" />
         </ListItem>
       </List>
      </Collapse>
      </div>
    );
  };
