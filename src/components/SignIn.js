import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router-dom';
import { SignIn as bSignIn } from '../services/backend-services';

//==================== Autenticación ================================================

async function auth({usuario, contraseña, toastr, setToastr, history}) {
  //Verificar los datos  
  if (usuario === '' || contraseña === '') {
    console.log("Credenciales no suministradas")
    let errorMessage = "Por favor ingrese sus credenciales";
    setToastr({...toastr, open: true, type: 'error', message: errorMessage}); 
    return;   
  }

  let autenticado = await bSignIn(usuario, contraseña);
  console.log(autenticado);

  if (autenticado.status !== 200) {
    let errorMessage = "El usuario y/o la contraseña ingresada no son validos, verifique sus credenciales";
    setToastr({...toastr, open: true, type: 'error', message: errorMessage});    
  }
  else {
    let successMessage = `Bienvenido de nuevo ${usuario}`;        
    localStorage.setItem('token', autenticado.data.token);
    setToastr({...toastr, open: true, type: 'success', message: successMessage});
    setTimeout(() => history.replace('/panel'), 2000);      
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
    backgroundImage: 'url(/images/SignIn.jpg)',    
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
    height: '50px',
    width: '50px',
    margin: theme.spacing(0, 0, 2, 0),
  },
  toastr: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SignIn() {
  //Usar el estilo CSS de Material-UI.
  const classes = useStyles();
  
  //Variables de Estado usando React Hooks.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');  
  const history = useHistory();  
  
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
            Iniciar Sesión
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
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {                
                event.preventDefault();
                auth({usuario: username, contraseña: password, toastr: toastr, setToastr: setToastr, history: history});                
              }}
            >
              Ingresar
            </Button>
            <Grid container>              
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"No tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
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