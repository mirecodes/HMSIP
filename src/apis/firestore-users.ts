import { QuerySnapshot, collection, doc, getDocs, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { TUser, TUserCode } from "../models/TUser";
import { TBill } from "../models/TBill";


// %%% Models %%%

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
        setUsersProps.forEach(async (user) => {
            const docRef = doc(usersCollRef, user.code);
            await setDoc(docRef, user)
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
export const updateUser = async (updateUserProps: TUpdateUser) => {
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

export const getUsers = async () => {
    try {
        let users: TUser[] = [];
        const qry = query(usersCollRef);
        const qrySnapshot = await getDocs(qry) as QuerySnapshot<TUser>;
        qrySnapshot.forEach((user) => users.push(user.data()));
        console.dir(users);
        return users;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in getUsers()"
        console.error(err_msg, err);
        throw err;
    }
}