// Type of a bill
export type TBill = {
    index: number;
    title: string;
    when: string;
    paidBy: string;
    cost: number;
    charge: Record<string, number>;
    expired: boolean;
    createdAt: string;
    updatedAt: string;
}

export type TGetBillsMode = 'valid' | 'expired' | 'all';