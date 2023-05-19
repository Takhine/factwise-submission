import { useCallback, useEffect, useState } from "react"
import { useUsersStore } from "../../../shared/stores/users";
import { IUser } from "src/shared/types/user";
import { useDebounce } from "src/shared/hooks/useDebounce";

export const useUsers = () => {
    const [searchValue, setSearchValue] = useState<string>("");
    const { users, initialUsersData, setUsers, setInitialUsers } = useUsersStore(({ users, initialUsersData, setUsers, setInitialUsers }) =>
        ({ users, initialUsersData, setUsers, setInitialUsers }))

    const debouncedSearchTerm = useDebounce(searchValue, 100);

    const handleSearchChange = useCallback((e?: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e?.target.value || "")
    }, []);

    const getUsersState = useCallback((users: IUser[]) => {
        return users.reduce((users, user: IUser) => {
            const { id: userId, ...userData } = user;
            return ({ ...users, [userId]: userData })
        }, {});
    }, []);

    // Fetching from local json
    const fetchInitialData = () => {
        fetch('celebrities.json', {
            headers: {
                'Content-type': "application/json",
                'Accept': "application/json"
            }
        }).then((res) => {
            return res.json();
        }).then((json) => {
            const users = json;
            const usersState = getUsersState(users)

            setInitialUsers(users, usersState);
        })
    }

    const resetInitialData = useCallback(() => {
        const usersState = getUsersState(initialUsersData)
        setUsers(usersState);
    }, [initialUsersData])

    useEffect(() => {
        // Fetch initial data once and store
        if (Array.isArray(initialUsersData) && !initialUsersData.length) {
            fetchInitialData();
        }
    }, [])

    return { users, searchValue: debouncedSearchTerm, handleSearchChange, resetInitialData }
}