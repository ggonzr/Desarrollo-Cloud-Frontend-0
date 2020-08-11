import React, { useState, useLayoutEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router-dom';
import { decodeToken } from '../services/jwt';

//============================== AWS ================================================
function closeSession({history}) {
  localStorage.removeItem('token');
  history.replace('/');
}

//==================== Componente Grafico ============================================

function Toastr(props) {  
  const classes = props.classes;
  //============ Elementos de Toastr ===============
  // No sé por que la desestructuración de objetos saca undefined :'(
  const open = props.toastr.open;
  const type = props.toastr.type;
  const message = props.toastr.message;
  const handleClose = props.toastr.handleClose;
  //=================================================
  if (!open) {
    return null;
  }
  return (    
    <div className={classes.toastr}>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={type}>
          {message}
      </MuiAlert>
    </Snackbar>
    </div>
  );   
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Minecraft Tantrico Server
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',        
  },
  image: {
    backgroundImage: 'url(/images/minecraft-wall-3.jpg)',    
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',        
  },
  paper: {
    margin: theme.spacing(4,4,4,4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(7),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icono: {
    textAlign: 'center',    
    height: '75px',
    width: '75px',
    margin: theme.spacing(0, 0, 2, 0),
  },
  toastr: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Panel() {
  //Historia de rutas de navegación
  const history = useHistory();
  const [estado, setEstado] = useState('');
  const [data, setData] = useState({});

  //Comprobar si el usuario está autorizado
  useLayoutEffect(() => {
    let token = localStorage.getItem('token') || null;
    if (token === null) {
      return history.replace('/');    
    }    
    else {      
      setToastr((t) => { return {...t, open: true, type: 'success', message: `Bienvenido al panel de administración`}});      
    }
  }, [history]);

  //Usar el estilo CSS de Material-UI.
  const classes = useStyles();

  //Snackbar -  Toastr    
  const handleClose = (event, reason) => {    
    if (reason === 'clickaway') {
      return;
    }
    setToastr({...toastr, open: false});
  };

  const [toastr, setToastr] = useState({open: false, message: '', type: '', handleClose: handleClose});

  //Componente Grafico.
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid component={Paper} className={classes.image}>
      <Grid item xs={false} className={classes.paper} component={Paper} square>
        <div className={classes.paper}>          
          <Icon classes={{root: classes.icono}}>
            <img className={classes.icono} src="/images/server-icon.png" alt="background-icon"/>
          </Icon>          
          <Typography variant="h4">
            Servidor
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        Tipo:
                    </Typography>
                </Grid>                
                <Grid item xs={6}>
                    <Typography variant="h5">
                        Ubuntu 18.04 LTS
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        Memoria:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        4 GB
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        Estado:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">
                        {estado}
                    </Typography>
                </Grid>
            </Grid> 
            <Grid container spacing={1}>
                <Grid item xs={6}>
                    <Button                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(event) => {                
                        console.log("Encender");                        
                    }}
                    >
                    Encender
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button                    
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(event) => {                
                        console.log("Apagar");                        
                    }}
                    >
                    Apagar
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Button                
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={(event) => {                
                    console.log("Cerrar Sesión");
                    closeSession({history: history});
                }}
                >
                 Cerrar Sesión
                </Button>
            </Grid>                       
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      </Grid> 
      <Toastr classes={classes} toastr={toastr}/>     
    </Grid>    
  );
}