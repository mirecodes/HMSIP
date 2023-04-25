import { QuerySnapshot, addDoc, collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";
import { getBillIndex } from "./firestore-internalData";

// %%% Models %%%

// Type of a bill
export type TBill = {
    index: number;
    title: string;
    when: string;
    paidBy: string;
    cost: number;
    charge: Record<string, number>[];
    expired: boolean;
    createdAt: string;
    modifiedAt: string;

}

// A parameter type for adding a bill
// 'index' is automatically numbered
// 'expired' is set false when a bill created
export type TAddBill = Omit<TBill, 'index' | 'expired'>;

// Type of properties when update a bill
export type TUpdateBill = TBill;


// %%% Collection & Document References %%%
const billsCollRef = collection(firestore, 'bills');

// %%% Auxiliary APIs %%%


// %%% Primary APIs %%%

/**
 * Upload a new bill to firestore, log the result on console
 * @param {TAddBill} addBillProp an object to add a new bill
 * @return {void} void
 */
export const addBill = async (addBillProp: TAddBill) => {
    try {
        const index = await getBillIndex();
        const bill: TBill = {
            ...addBillProp,
            index: index,
            expired: false
        }
        const res = await addDoc(billsCollRef, bill);
        if (res) {
            console.log("LOG: Succeed to upload the bill");
        } else {
            console.log("ERROR: Failed to upload the bill");
        }
        return;
    } catch (err) {
        const err_msg = "ERROR: Error has occured in addBill(addBillProps)"
        console.error(err_msg, err);
        throw err;
    }
}

/**
 * Get all bills from firestore, return them as a type of TBills[]
 * @return {TBill[]} return bills array
 */
export const getAllBills = async () => {
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

