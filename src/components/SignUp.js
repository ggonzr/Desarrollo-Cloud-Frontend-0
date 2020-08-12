import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory, useLocation } from 'react-router-dom';
import { SignUp as bSignUp } from '../services/backend-services';

//==================== Autenticación ================================================

async function register({usuario, contraseña, email, firstName, lastName, toastr, setToastr, from, history}) {
  //Verificar los datos      
  if (usuario === '' || contraseña === '' || email === '' || firstName === '' || lastName === '') {
    let registerMessage = `Por favor ingrese todos los datos solicitados`;
    setToastr({...toastr, open: true, type: 'error', message: registerMessage});
    return;
  }  

  try {
    let response = await bSignUp(usuario, contraseña, firstName, lastName, email);
    console.log(response);
    
    if (response.status === 201) {
      let registerMessage = `${usuario} ha sido registrado satisfactoriamente`;
      setToastr({...toastr, open: true, type: 'success', message: registerMessage});
      setTimeout(() => history.replace(from), 2500, 'delay-toastr');    
    }  
  }
  catch (error) {
    let registerMessage = `El usuario ${usuario} ya se encuentra registrado, por favor seleccione otro nombre`;
    setToastr({...toastr, open: true, type: 'error', message: registerMessage});
  } 
};

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
      Eventos ABC
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
    backgroundImage: 'url(/images/SignUp.jpg)',    
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },  
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  icono: {
    textAlign: 'center',    
    height: '70px',
    width: '70px',
    margin: theme.spacing(0, 0, 2, 0),
  },
  toastr: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignUp() {
  //Usar el estilo CSS de Material-UI.
  const classes = useStyles();
  
  //Variables de Estado usando React Hooks.
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  //Estado de la aplicación
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" }};

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
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>                    
          <Typography component="h1" variant="h5">
            Registrarse
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Usuario"
              name="username"
              autoComplete="username"
              onChange={event => setUsername(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="firstNames"
              label="Nombres"
              name="firstNames"
              autoComplete="firstNames"
              onChange={event => setFirstName(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="lastNames"
              label="Apellidos"
              name="lastNames"
              autoComplete="lastNames"
              onChange={event => setLastName(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              onChange={event => setEmail(event.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {                
                event.preventDefault();
                register({usuario: username, contraseña: password, email: email, firstName: firstName, lastName: lastName, toastr: toastr, setToastr: setToastr, from: from, history: history});
              }}
            >
              Registrarse
            </Button>            
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Toastr classes={classes} toastr={toastr}/>     
    </Grid>    
  );
}