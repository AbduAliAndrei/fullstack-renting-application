import { Offer } from "../../interfaces/offer";
import firebase from "firebase";
import Firestore = firebase.firestore.Firestore;

export default function makeOffersDb({
  db,
}: {
  db: Firestore;
}): DatabaseOfferEntity<Offer, Offer> {
  const genericOfferDb = makeOffersDb<Offer,Offer>()
}
