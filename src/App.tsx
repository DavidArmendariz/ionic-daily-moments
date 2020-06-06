import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import { Route, Redirect } from 'react-router-dom';
import SettingsPage from './pages/Settings';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import EntryPage from './pages/EntryPage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  console.log(`Rendeering App with loggedIn=${loggedIn}`);
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/entries">
              {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/settings" component={SettingsPage} />
            <Redirect exact path="/" to="/entries" />
            <Route path="/entries/:id" component={EntryPage} />
            <Route exact path="/login">
              <LoginPage
                onLogin={() => setLoggedIn(true)}
                loggedIn={loggedIn}
              />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="Home" href="/entries">
              <IonIcon icon={homeIcon} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Settings" href="/settings">
              <IonIcon icon={settingsIcon} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
