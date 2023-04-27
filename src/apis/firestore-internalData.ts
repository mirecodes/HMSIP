

import { DocumentSnapshot, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

// %%% Models %%%
type TIndexCounter = {
    nextIndex: number;
}


// %%% Collection & Document References %%%
const intlDataCollRef = collection(firestore, 'InternalData');
const indexCounterDocRef = doc(intlDataCollRef, 'index-counter');

// %%% Auxiliary APIs %%%


// %%% Primary APIs %%%

/**
 * Return next index of bills, increase its number by 1
 * @returns Return next index of bills
 */
export const getBillIndex = async () => {

    try {
        // Read the document
        const docSnapshot = await getDoc(indexCounterDocRef) as DocumentSnapshot<TIndexCounter>;
        const indexCounter = docSnapshot.data() as TIndexCounter;
        const nextIndex = indexCounter.nextIndex;
        // Get the next index, update the document
        const nextIndexCounter: TIndexCounter = {
            nextIndex: nextIndex + 1
        }
        await updateDoc(indexCounterDocRef, nextIndexCounter);
        // Return next index
        return nextIndex;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in getIndex()"
        console.error(err_msg, err);
        throw err;
    }
}