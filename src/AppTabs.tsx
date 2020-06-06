import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import React from 'react';
import HomePage from './pages/HomePage';
import { Route, Redirect } from 'react-router-dom';
import SettingsPage from './pages/Settings';
import { home as homeIcon, settings as settingsIcon } from 'ionicons/icons';
import EntryPage from './pages/EntryPage';

interface Props {
  loggedIn: boolean;
}

const AppTabs: React.FC<Props> = ({ loggedIn }) => {
  if (!loggedIn) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/my/entries">
          <HomePage />
        </Route>
        <Route exact path="/my/settings" component={SettingsPage} />
        <Route path="/my/entries/:id" component={EntryPage} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="Home" href="/my/entries">
          <IonIcon icon={homeIcon} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="Settings" href="/my/settings">
          <IonIcon icon={settingsIcon} />
          <IonLabel>Settings</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppTabs;
