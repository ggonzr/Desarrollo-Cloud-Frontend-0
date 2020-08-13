import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import { useHistory } from 'react-router-dom';
import { getAllEvents } from '../services/backend-services';
import EventElement from '../components/Event';

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
      display: 'block',
    },
  },
  paper: {
    margin: theme.spacing(2,2,2,2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  const [anchorEl, setAnchorEl] = React.useState(null);  
  const isMenuOpen = Boolean(anchorEl);    
  const [eventList, setEventList] = React.useState([]);

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

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);   
  };
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  
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
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Eventos ABC
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Buscar Evento ..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>            
            <IconButton aria-label="crear un nuevo evento" color="inherit">              
                <NoteAddIcon/>              
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>          
        </Toolbar>
      </AppBar>      
      {renderMenu}
    </div>
    );
  };  

  const EventList = ({list}) => {        
    return (
      <div>
        <Typography className={classes.title} variant="h6" noWrap>
            Lista de eventos
        </Typography>
        <List
          component="nav"
          aria-labelledby="lista-de-eventos"          
          className={classes.eventList}
        >             
        {list.map((el, idx) => <EventElement key={idx} idx={idx} info={el} classes={classes} deleteElement={deleteElement}/>)}       
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
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
