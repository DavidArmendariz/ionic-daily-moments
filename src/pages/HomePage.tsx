import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonRouterLink,
} from '@ionic/react';
import React from 'react';

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        Go to <IonRouterLink routerLink="/settings">Settings</IonRouterLink>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
