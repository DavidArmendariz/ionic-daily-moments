import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonButtons,
  IonBackButton,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonDatetime,
  isPlatform,
} from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import { firestore, storage } from '../firebase';
import { useAuth } from '../auth';
import { useHistory } from 'react-router';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

const { Camera } = Plugins;

async function savePicture(blobUrl, userId) {
  const pictureRef = storage.ref(`/users/${userId}/pictures/${Date.now()}`);
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  const snapshot = await pictureRef.put(blob);
  const url = snapshot.ref.getDownloadURL();
  return url;
}

const AddEntryPage: React.FC = () => {
  const { userId } = useAuth();
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [pictureUrl, setPictureUrl] = useState('/assets/placeholder.png');

  const fileInputRef = useRef<HTMLInputElement>();

  useEffect(() => {
    return () => {
      if (pictureUrl.startsWith('blob:')) {
        URL.revokeObjectURL(pictureUrl);
      }
    };
  }, [pictureUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files.length > 0) {
      const file = event.target.files.item(0);
      const pictureUrl = URL.createObjectURL(file);
      setPictureUrl(pictureUrl);
    }
  };

  const handlePictureClick = async () => {
    if (isPlatform('capacitor')) {
      try {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
        });
        setPictureUrl(photo.webPath);
      } catch (error) {
        console.log(error);
      }
    } else {
      fileInputRef.current.click();
    }
  };

  const handleSave = async () => {
    const entriesRef = firestore
      .collection('users')
      .doc(userId)
      .collection('entries');
    const entryData = { date, title, pictureUrl, description };
    if (!pictureUrl.startsWith('/assets')) {
      entryData.pictureUrl = await savePicture(pictureUrl, userId);
    }
    const entryRef = await entriesRef.add(entryData);
    console.log('saved', entryRef.id);
    history.goBack();
  };
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
      <IonContent className="ion-padding">
        <IonList>
          <IonItem>
            <IonLabel position="stacked">Date</IonLabel>
            <IonDatetime
              value={date}
              onIonChange={(event) => setDate(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Title</IonLabel>
            <IonInput
              value={title}
              onIonChange={(event) => setTitle(event.detail.value)}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Picture</IonLabel>
            <br />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />
            <img
              style={{ cursor: 'pointer' }}
              src={pictureUrl}
              alt=""
              onClick={handlePictureClick}
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Description</IonLabel>
            <IonTextarea
              value={description}
              onIonChange={(event) => setDescription(event.detail.value)}
            />
          </IonItem>
          <IonButton expand="block" onClick={handleSave}>
            Save
          </IonButton>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddEntryPage;
