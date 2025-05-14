declare module '@/lib/firebase' {
  import { Auth } from 'firebase/auth';
  import { Firestore } from 'firebase/firestore';
  import { FirebaseApp } from 'firebase/app';

  const app: FirebaseApp;
  const auth: Auth;
  const firestore: Firestore;

  export { app, auth, firestore };
}
