import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import EventNote from '@material-ui/icons/EventNote';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import { getAllEvents, updateEvent, createEvent } from '../services/backend-services';
import EventElement from '../components/Event';
import moment from 'moment';

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
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState('');

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
  
  const closeSession = () => {
    localStorage.removeItem('token');
    return history.replace('/');
  };
  
  const readFile = (ev) => {
    let file = ev.target.files[0];    
    if (!file) {
      return;
    }    
    return file;
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
                setActualEvent(-2);
              }}
             >              
                <NoteAddIcon/>              
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={closeSession}
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
  
  //Permite actualizar un evento en el sistema
  const UpdateEvent = ({idx}) => { 
    console.log("Valor idx", idx);
    if (idx === -1 || idx === -2) {
      return null;
    }
    else {      
      let event = eventList[idx.idx]; 
      event.event_initial_date = moment(event.event_initial_date, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DDTHH:mm');
      event.event_final_date = moment(event.event_final_date, 'YYYY-MM-DDTHH:mm:ssZ').format('YYYY-MM-DDTHH:mm');
      console.log("Evento", event)  
      setCategory(event.event_category);                            
      return (        
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h6" noWrap>
                {event.event_name}
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_address"
              label="Nuevo nombre del evento"
              type="text"
              id="event_title"
              defaultValue={event.event_name}     
              onChange={(ev) => {
                event.event_name = ev.target.value;
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_address"
              label="Dirección del evento"
              type="text"
              id="event_address"
              defaultValue={event.event_address}     
              onChange={(ev) => {
                event.event_address = ev.target.value;
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_place"
              label="Lugar del evento"
              type="text"
              id="event_place"
              defaultValue={event.event_place}     
              onChange={(ev) => {
                event.event_place = ev.target.value;
              }}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel 
                className={classes.formLabel} 
                htmlFor="filled-age-native-simple"
              >
                Categoria
              </InputLabel>
              <Select
                native
                value={category}
                onChange={(ev) =>{
                  ev.preventDefault();                  
                  event.event_category = ev.target.value;
                  setCategory(event.event_category);                  
                }}                
              >                
                <option value={"COURSE"}>Curso</option>
                <option value={"CONFERENCE"}>Conferencia</option>
                <option value={"SEMINAR"}>Seminario</option>
                <option value={"CONGRESS"}>Congreso</option>
              </Select>              
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel 
                className={classes.formLabel} 
                htmlFor="filled-age-native-simple"
              >
                Tipo de evento
              </InputLabel>
              <Select
                native
                value={type}
                onChange={(ev) =>{
                  ev.preventDefault();                  
                  event.event_type = ev.target.value;
                  setType(event.event_type);
                }}                
              >                
                <option value={"VIRTUAL"}>Virtual</option>
                <option value={"PRESENCIAL"}>Presencial</option>                
              </Select>              
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="datetime-local"
              label="Fecha de inicio"
              type="datetime-local"
              defaultValue={event.event_initial_date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(ev) =>{
                console.log("Fecha seleccionada", ev.target.value);
              }}
            />
            <TextField
              id="datetime-local"
              label="Fecha final"
              type="datetime-local"
              defaultValue={event.event_final_date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(ev) =>{
                console.log("Fecha seleccionada", ev.target.value);
              }}
            />
            </FormControl>
            <Button
              type="submit"
              className={classes.detailButton}
              variant="contained"
              color="primary"              
              onClick={(ev) => {                                
                updateEvent(event);
                setActualEvent(-1); //Cerrar la ventana                
              }}
            >
              Actualizar
            </Button>
          </Paper>                              
        </Grid>        
      );
    }    
  };

  //Permite actualizar un evento en el sistema
  //Con el ánimo de no sobreescribir el panel, se utilizara el indice -2 para indicar que se crea
  //un evento.
  const CreateEvent = ({idx}) => { 
    if (idx !== -2) {
      return null;
    }
    else {      
      let event = {
        'event_name': '',
        'event_category': '',
        'event_place': '',
        'event_address': '',
        'event_initial_date': '',
        'event_final_date': '',
        'event_type': '',        
      };      
      //setCategory(event.event_category);                            
      return (        
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.title} variant="h6" noWrap>
                Crear nuevo evento
            </Typography>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_address"
              label="Nuevo nombre del evento"
              type="text"
              id="event_title"
              defaultValue={event.event_name}     
              onChange={(ev) => {
                event.event_name = ev.target.value;
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_address"
              label="Dirección del evento"
              type="text"
              id="event_address"
              defaultValue={event.event_address}     
              onChange={(ev) => {
                event.event_address = ev.target.value;
              }}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required              
              name="event_place"
              label="Lugar del evento"
              type="text"
              id="event_place"
              defaultValue={event.event_place}     
              onChange={(ev) => {
                event.event_place = ev.target.value;
              }}
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel 
                className={classes.formLabel} 
                htmlFor="filled-age-native-simple"
              >
                Categoria
              </InputLabel>
              <Select
                native
                value={category}
                onChange={(ev) =>{
                  ev.preventDefault();                  
                  event.event_category = ev.target.value;
                  //setCategory(event.event_category);                  
                }}                
              >                
                <option value={"COURSE"}>Curso</option>
                <option value={"CONFERENCE"}>Conferencia</option>
                <option value={"SEMINAR"}>Seminario</option>
                <option value={"CONGRESS"}>Congreso</option>
              </Select>              
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel 
                className={classes.formLabel} 
                htmlFor="filled-age-native-simple"
              >
                Tipo de evento
              </InputLabel>
              <Select
                native
                value={type}
                onChange={(ev) =>{
                  ev.preventDefault();                  
                  event.event_type = ev.target.value;
                  //setType(event.event_type);
                }}                
              >                
                <option value={"VIRTUAL"}>Virtual</option>
                <option value={"PRESENCIAL"}>Presencial</option>                
              </Select>              
            </FormControl>
            <FormControl variant="outlined" className={classes.formControl}>
            <TextField
              id="datetime-local"
              label="Fecha de inicio"
              type="datetime-local"
              defaultValue={event.event_initial_date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(ev) =>{
                console.log("Fecha seleccionada", ev.target.value);
                event.event_initial_date = ev.target.value;
              }}
            />
            <TextField
              id="datetime-local"
              label="Fecha final"
              type="datetime-local"
              defaultValue={event.event_final_date}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(ev) =>{
                console.log("Fecha seleccionada", ev.target.value);
                event.event_final_date = ev.target.value;
              }}
            />
            </FormControl>
            <input 
              accept="image/*"
              className={classes.inputFile}
              id="icon-button-file"
              type="file"
              onChange={(ev) =>{
                ev.preventDefault();
                event.thumbnail = readFile(ev);
              }}
            />
            <label htmlFor="icon-button-file">                            
              <IconButton color="primary" aria-label="upload picture" component="span">
                <FileCopyIcon />                
              </IconButton>
            </label>
            <Button
              type="submit"
              className={classes.detailButton}
              variant="contained"
              color="primary"              
              onClick={(ev) => {                                
                createEvent(event);
                setActualEvent(-1); //Cerrar la ventana                
              }}
            >
              Crear
            </Button>
          </Paper>                              
        </Grid>        
      );
    }    
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
        <UpdateEvent idx={actualEvent}/>
        <CreateEvent idx={actualEvent}/>
      </Grid>
    </div>
  );
}
