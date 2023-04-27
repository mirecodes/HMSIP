import { DocumentReference, QuerySnapshot, addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "./firebase";
import { getBillIndex } from "./firestore-internalData";
import { TBill } from "../models/TBill";

// %%% Models %%%

// A parameter type for adding a bill
// 'index' is automatically numbered
// 'expired' is set false when a bill created
export type TAddBill = Omit<TBill, 'index' | 'expired'>;

// Type of properties when update a bill
export type TUpdateBill = TBill;

// %%% Collection & Document References %%%
const billsCollRef = collection(firestore, 'Bills');

// %%% Auxiliary APIs %%%

/**
 * Return the boolean value weather the bill of the index already exists
 * @param bill the props to add or update the bill
 * @returns if the bill with the index already exists, return true
 */
export const isExistingBill = async (bill: TBill) => {
    try {
        const qry = query(billsCollRef, where('index', '==', bill.index));
        const qrySnapshot = await getDocs(qry);
        return (qrySnapshot.empty) ? false : true;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in isExistingBill(bill)"
        console.error(err_msg, err);
        throw err;
    }
}

// %%% Primary APIs %%%

/**
 * Upload a new bill to firestore, log the result on console
 * @param {TAddBill} addBillProps an object to add a new bill
 */
export const addBill = async (bill: TBill) => {
    try {
        const index = await getBillIndex();
        const newBill: TBill = {
            ...bill,
            index: index,
            expired: false
        }
        const res = await addDoc(billsCollRef, newBill);
        console.log("LOG: Succeed to upload the bill");
        console.log("LOG: DocumentReference=", res);
        return;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in addBill(addBillProps)"
        console.error(err_msg, err);
        throw err;
    }
}

/**
 * Update the bill as the props. the target bill is chosen by the index of the props
 * @param updateBillProps an object to update a new bill
 */
export const updateBill = async (updateBillProps: TUpdateBill) => {
    try {
        const qry = query(billsCollRef, where('index', '==', updateBillProps.index));
        const qrySnapshot = await getDocs(qry);
        const docRef = qrySnapshot.docs[0].ref;
        await updateDoc(docRef, updateBillProps);
        console.log("LOG: Succeed to update the bill");
        return;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in updateBill(updateBillProps)"
        console.error(err_msg, err);
        throw err;
    }
}




/**
 * Get all bills from firestore, return them as a type of TBills[]
 * @return {TBill[]} return bills array
 */
export const getBills = async () => {
    try {
        let bills: TBill[] = [];
        const qrySnapshot = await getDocs(billsCollRef) as QuerySnapshot<TBill>;
        qrySnapshot.forEach(bill => bills.push(bill.data()));
        return bills;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in getAllBills()"
        console.error(err_msg, err);
        throw err;
    }
}

/**
 * Get All Valid Bills, which means 'expired' is false
 * @returns {TBill[]} return bills array where 'expired' is false
 */
export const getValidBills = async () => {
    try {
        let bills: TBill[] = [];
        const qry = query(billsCollRef, where('expired', '==', false));
        const qrySnapshot = await getDocs(qry) as QuerySnapshot<TBill>;
        qrySnapshot.forEach(bill => bills.push(bill.data()));
        return bills;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in getValidBills()"
        console.error(err_msg, err);
        throw err;
    }
}

/**
 * Get All Expired Bills, which means 'expired' is true
 * @returns {TBill[]} return bills array where 'expired' is true
 */
export const getExpiredBills = async () => {
    try {
        let bills: TBill[] = [];
        const qry = query(billsCollRef, where('expired', '==', true));
        const qrySnapshot = await getDocs(qry) as QuerySnapshot<TBill>;
        qrySnapshot.forEach(bill => bills.push(bill.data()));
        return bills;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in getExpiredBills()"
        console.error(err_msg, err);
        throw err;
    }
}