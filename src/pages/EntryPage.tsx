import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonButton,
  IonIcon,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import { firestore } from '../firebase';
import { Entry, toEntry } from '../models';
import { useAuth } from '../auth';
import { trash as trashIcon } from 'ionicons/icons';

interface RouteParams {
  id: string;
}

const EntryPage: React.FC = () => {
  const history = useHistory();
  const { userId } = useAuth();
  const { id } = useParams<RouteParams>();
  const [entry, setEntry] = useState<Entry>();
  console.log('[EntryPage] render');
  useEffect(() => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    entryRef.get().then((doc) => {
      setEntry(toEntry(doc));
    });
  }, [id, userId]);

  const handleDelete = async () => {
    const entryRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries')
      .doc(id);
    await entryRef.delete();
    history.goBack();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>{entry?.title}</IonTitle>
          <IonButtons slot="end" onClick={handleDelete}>
            <IonButton>
              <IonIcon icon={trashIcon} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">{entry?.description}</IonContent>
    </IonPage>
  );
};

export default EntryPage;
