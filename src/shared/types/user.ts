export type Genders = "male" | "female" | "transgender" | "rather not say" | "other";

export type IUser = {
    id: string;
    first: string;
    last: string;
    dob: string;
    age?: number;
    fullName?: string;
    gender: Genders;
    email: string;
    picture: string;
    country: string;
    description: string;
}

export type IUserStoreData = Omit<IUser, "id">;

export type  IUserStore = {
    [userId: string]: IUserStoreData;
};