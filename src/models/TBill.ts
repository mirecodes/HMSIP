// Type of a bill
export type TBill = {
    index: number;
    title: string;
    when: string;
    paidBy: string;
    cost: number;
    charge:
    {
        A: number;
        B: number;
        C: number;
        D: number;
    };
    expired: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TGetBillsMode = 'valid' | 'expired' | 'all';