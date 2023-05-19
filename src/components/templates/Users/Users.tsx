import React, { Fragment, useCallback, useState } from "react";
import Typography from "../../atoms/Typography";
import SearchInput from "../../molecules/SearchInput";
import { useUsers } from "./userUsers";
import UserDetails from "./UserDetails";
import { isObjectEmpty } from "src/shared/helpers/object";
import Empty from "src/components/molecules/Empty";
import Button from "src/components/atoms/Button";
import { Accordion } from "src/components/organisms/Accordion/Accordion";

interface UsersProps { };

const Users: React.FC<UsersProps> = () => {
    const [activeEventKey, setActiveEventKey] = useState<string | null>(null);
    const [activeEdit, setActiveEdit] = useState<string | null>(null);
    const { users, searchValue, handleSearchChange, resetInitialData } = useUsers();

    const resetUsers = useCallback(() => {
        resetInitialData();
        setActiveEventKey(null);
        setActiveEdit(null);
    }, [resetInitialData, setActiveEventKey, setActiveEdit])

    const renderResetCta = useCallback(() =>
        <Button onClick={() => resetUsers()} className="text-white bg-red-400 font-semibold">Reset users</Button>
        , [resetUsers]);

    return (
        <div className="container py-20 px-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4">
                <Typography as="h2" className="font-bold text-xl">Users</Typography>
                {renderResetCta()}
            </div>
            <SearchInput value={searchValue} disabled={!!activeEdit} onChange={handleSearchChange} />
            <div className="my-6 flex flex-col gap-6">
                <Accordion activeEventKey={activeEventKey} onToggle={(key) => setActiveEventKey(key)}>
                    {users && !isObjectEmpty(users) && Object.entries(users).filter(([userId, userData]) => {
                        return `${userData.first} ${userData.last}`.toUpperCase().indexOf(searchValue.toUpperCase()) > -1;
                    }).map(([userId, user]) => (
                        <Fragment key={userId}>
                            <UserDetails userId={userId} activeEdit={activeEdit} handleEdit={setActiveEdit} {...user} />
                        </Fragment>
                    ))}
                </Accordion>

                {users && isObjectEmpty(users) && <Empty emptyText="No users found" cta={renderResetCta()} />}
            </div>
        </div>
    );
};

Users.displayName = "Users";

export default Users;