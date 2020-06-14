import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import React from 'react';

const AddEntryPage: React.FC = () => {
  console.log('[AddEntryPage] render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Add entry</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">TODO</IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
