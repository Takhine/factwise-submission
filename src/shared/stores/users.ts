import { create } from "zustand";
import { persist } from "zustand/middleware";

import { IUser, IUserStore } from "../types/user"
import { FW_ROOT } from "../constants/cookies";


interface IUsersStore {
    initialUsersData: IUser[];
    users: IUserStore;
    setInitialUsers: (initialUsersData: IUser[], users: IUserStore) => void;
    setUsers: (users: IUserStore) => void;
}

export const useUsersStore = create(persist<IUsersStore>((set, get) => ({
    initialUsersData: [],
    users: {},
    setUsers: (users: IUserStore) =>
        set(() => {
            return { users };
        }),
    setInitialUsers: (initialUsersData: IUser[], users: IUserStore) =>
        set(() => {
            return { initialUsersData, users };
        }),
}
), {
    name: `${FW_ROOT}users`
}
)
)