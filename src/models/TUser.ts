// Type of a user
export type TUserCode = 'A' | 'B' | 'C' | 'D'

export type TUser = {
    code: TUserCode;
    name: string;
    imageURL: string;
    spent: number;
    owed: number;
    difference: number;
    createdAt: string;
    updatedAt: string;
}
