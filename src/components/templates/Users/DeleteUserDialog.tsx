import React from "react";
import Dialog from "src/components/organisms/Dialog";
import { DIALOG_IDS } from "src/shared/constants/dialog";
import { emptyObject } from "src/shared/constants/empty";
import { useDialog } from "src/shared/stores/dialog";
import { useUsersStore } from "src/shared/stores/users";
import Typography from "src/components/atoms/Typography";
import Button from "src/components/atoms/Button";

interface DeleteUserDialogProps { };

const DeleteUserDialog: React.FC<DeleteUserDialogProps> = () => {
    const { isVisible, closeDialog, dialogContent } = useDialog(DIALOG_IDS.DELETE_USER);
    const { userId } = dialogContent || emptyObject;
    const { users, setUsers } = useUsersStore(({ users, setUsers }) => ({ users, setUsers }))

    const handleDeleteUser = () => {
        const currentUsers = Object.assign({}, users);
        delete currentUsers[userId];
        closeDialog();
        setUsers(currentUsers)
    }
    
    return (
        <Dialog isOpen={isVisible} toggle={() => closeDialog()}>
            <div className="p-3">
                <Typography as="h2" className="font-bold text-xl">Are you sure you want to delete user?</Typography>
            </div>
            <div className="p-3 flex justify-end gap-3  mt-6">
                <Button type="button" onClick={closeDialog}>Cancel</Button>
                <Button type="button" className="text-white bg-red-400 font-semibold" onClick={handleDeleteUser}>Delete</Button>
            </div>
        </Dialog>
    );
};

DeleteUserDialog.displayName = "DeleteUserDialog";

export default DeleteUserDialog;