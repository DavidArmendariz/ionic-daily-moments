import { IonApp, IonRouterOutlet } from '@ionic/react';
import React from 'react';
import HomePage from './pages/HomePage';
import { Route, Redirect } from 'react-router-dom';
import SettingsPage from './pages/Settings';
import { IonReactRouter } from '@ionic/react-router';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Redirect exact path="/" to="/home" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
