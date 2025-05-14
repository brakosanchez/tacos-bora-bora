import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';

declare module '@/lib/firebase' {
  export const auth: Auth;
  export const firestore: Firestore;
}
