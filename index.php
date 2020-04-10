<?php
session_start();

$dash = $_SERVER['SERVER_NAME'] === 'localhost' ? "/app#/" : "https://suaapi.com/";

if (isset($_SESSION) and isset($_SESSION['user'])) {
  header('location: ' . $dash);
}
?>


<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <title>Sistema PHP React</title>

  <meta charset="utf-8" />

  <meta name="theme-color" content="#661484" />
  <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
  <script src="https://unpkg.com/react@latest/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@latest/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/babel-standalone@latest/babel.min.js" crossorigin="anonymous"></script>
  <!-- Fonts to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
  <!-- Icons to support Material Design -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>
<style>
  body {
    margin: 0;
    padding: 0;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>

<body>
  <div id="root"></div>
  <script type="text/babel">
    const {
  colors,
  CssBaseline,
  ThemeProvider,
  Typography,
  TextField,
  Container,
  Paper,
  Button,
  makeStyles,
  createMuiTheme,
  Box,
  SvgIcon,
  Link,
} = MaterialUI;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});



function App() {

  const [error, setError] = React.useState(null);
  const [email, setEmail] = React.useState('');
  const [password, setPass] = React.useState('');


  const submitForm =(event)=>{
    event.preventDefault();
    
    const pathRoute = window.location.hostname === 'localhost' ? '': 'seusite';

    fetch(pathRoute +'/backEnd/login' , {
      method: 'post', body: JSON.stringify({email, password})
    }).then(response => response.json())
    .then(res => {
      if (!res.Success) {
        alert('Tente novamente')
      } 
      window.location.reload();
    })
  }

  return (
    <Container maxWidth="sm">
     <Paper style={{padding: 30}}>
<form method="post" onSubmit={submitForm}>

     <TextField
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          
          <TextField
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e)=>setPass(e.target.value)}
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <br/><br/><br/>
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Logar
          </Button>
</form>
     </Paper>
    </Container>
  );
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);
    </script>
</body>

</html>