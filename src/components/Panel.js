import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EventNote from '@material-ui/icons/EventNote';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import { getAllEvents } from '../services/backend-services';
import EventElement from '../components/Event';
import CreateEvent from '../components/CreateEvent';
import UpdateEvent from '../components/UpdateEvent';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  }, 
  inputFile: {
    display: 'none'
  }, 
  paper: {
    margin: theme.spacing(2,2,2,2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '80%'
  }, 
  formLabel: {
    margin: theme.spacing(1,2,2,2),
  },
  textField: {
    width: '80%'
  },
  eventList: {
    marginTop: theme.spacing(1),
    spacing: theme.spacing(1)
  },   
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  detailButton: {
    width: '80%',
    marginTop: theme.spacing(2),
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const history = useHistory();  
  const [eventList, setEventList] = React.useState([]);  
  const [actualEvent, setActualEvent] = React.useState(-1);  

  //Comprobar si el usuario está autorizado  
  React.useLayoutEffect(() => {
    let token = localStorage.getItem('token') || null;
    if (token === null) {
      return history.replace('/');    
    }    
  }, [history]);

  React.useEffect(() => {    
    async function getData() {      
      let response = await getAllEvents();       
      setEventList(response.data)
    } 
    getData();   
  }, []);
  
  //Permite eliminar un elemento de la lista de eventos 
  // y renderizar de nuevo el componente
  const deleteElement = (idx) => {
    let newList = [...eventList];
    newList.splice(idx, 1);
    setEventList(newList);
  };   

  const menuId = 'primary-search-account-menu';  
  
  //Cerrar sesión en el sistema
  const closeSession = () => {
    localStorage.removeItem('token');
    return history.replace('/');
  };
  
  //Renderizar el panel derecho de acuerdo al elemento
  //necesario
  const RenderPanel = ({idx}) => {
    let el = idx.idx;
    console.log("Render panel clickeado", el);
    if (el >= 0) {
      let element = eventList[el];
      return (
        <UpdateEvent
          pEvent={element}
          classes={classes}
          updateEventInferface={setActualEvent}
        />
      );      
    }    
    else if (el === -2) {
      return (
        <CreateEvent                    
          classes={classes}
          updateEventInferface={setActualEvent}
        />
      );
    }
    else {
      return null;
    }    
  };

  const NavBar = () => {
    return (
    <div className={classes.grow}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <EventNote />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Eventos ABC
          </Typography>          
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>            
            <IconButton
             aria-label="crear un nuevo evento"
             color="inherit"
             onClick={(ev) => {
                setActualEvent({idx: -2});
              }}
             >              
                <NoteAddIcon/>              
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={() => closeSession()}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>          
        </Toolbar>
      </AppBar>            
    </div>
    );
  };
  
  

  const EventList = ({list}) => {        
    return (
      <div>
        <Typography className={classes.title} variant="h6" noWrap>
            Lista de Eventos
        </Typography>
        <List
          component="nav"
          aria-labelledby="lista-de-eventos"          
          className={classes.eventList}
        >             
        {list.map((el, idx) => 
          <EventElement 
            key={idx}
            idx={idx}
            info={el}
            classes={classes}
            deleteElement={deleteElement}
            updateElement={setActualEvent}
          />)}       
        </List>
      </div>
    );
  }; 

  return (
    <div>
      <NavBar/>
      <Grid container>
        <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
              <EventList list={eventList}/>
            </Paper>
        </Grid>
        <RenderPanel idx={actualEvent}/>
      </Grid>
    </div>
  );
}
