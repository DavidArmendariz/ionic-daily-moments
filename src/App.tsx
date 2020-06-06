import { IonApp } from '@ionic/react';
import React from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import SettingsPage from './pages/Settings';

const App: React.FC = () => {
  return (
    <IonApp>
      <BrowserRouter>
        <Route exact path="/home" component={HomePage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Redirect exact path="/" to="/home" />
      </BrowserRouter>
    </IonApp>
  );
};

export default App;
