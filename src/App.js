import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useStyles from './styles';
import { Home, Navbar, Auth, UserProfile, PostDetails} from './components';

const App = () => {
  const classes = useStyles();
  return (
      <BrowserRouter>
        <Container className={classes.mainContainer} maxWidth= {false}>
            <Navbar />
            <Routes>
                <Route path='/thoughts/' exact Component={Home} />
                <Route path='/thoughts/:id' exact Component={PostDetails} />
                <Route path='/thoughts/auth' exact Component={Auth} />
                <Route path='/thoughts/profile' exact Component={UserProfile} />
            </Routes>
        </Container>
      </BrowserRouter>
  )
}

export default App