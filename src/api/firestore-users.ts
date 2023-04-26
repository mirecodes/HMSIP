// %%% Models %%%

import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

// Type of a user
export type TUser = {
    code: string;
    name: string;
    imageURL: string;
    spent: number;
    owed: number;
    difference: number;
    createdAt: string;
    updatedAt: string;
}

// A parameter type for set users
// The users cannot added or deleted after the creation
export type TSetUsers = TUser[];

// Type of properties when update the user
export type TUpdateUser = TUser;


// %%% Collection & Document References %%%
const usersCollRef = collection(firestore, 'Users');

// %%% Auxiliary APIs %%%

// %%% Primary APIs %%%

/**
 * Set users in firestore. users are not added or deleted after creation.
 * @param setUsersProps the information to set users, in form of TUser array
 */
export const setUsers = async (setUsersProps: TSetUsers) => {
    try {
        setUsersProps.forEach((user) => {
            const docRef = doc(usersCollRef, user.code);
            console.log("LOG: Succeed to set the user code=", user.code);
            console.log("LOG: DocumentReference=", docRef);
        });
        console.log("LOG: Finish to set all users");
    } catch (err) {
        const err_msg = "ERROR: Error has occured in setUsers(setUsersProps)"
        console.error(err_msg, err);
        throw err;
    }
}

/**
 * Update the user in firestore.
 * @param updateUserProps the information to update the user, in form of TUser
 */
export const updateUsers = async (updateUserProps: TUpdateUser) => {
    try {
        const docRef = doc(usersCollRef, updateUserProps.code);
        await updateDoc(docRef, updateUserProps);
        console.log("LOG: Succeed to update the user");
    } catch (err) {
        const err_msg = "ERROR: Error has occured in updateUserProps(updateUserProps)"
        console.error(err_msg, err);
        throw err;
    }
}