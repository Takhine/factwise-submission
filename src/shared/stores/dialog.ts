import { createStore } from "zustand/vanilla";
import { create } from "zustand";
import produce from "immer";
import { DIALOG_IDS } from "../constants/dialog";

type IDs = keyof typeof DIALOG_IDS;

export type DialogIds = typeof DIALOG_IDS[IDs];

export type DialogStoreType<T = any> = {
  isVisible: { [id: string]: boolean };
  dialogContent: { [id: string]: any };
  setDialogContent: (id: DialogIds, content: T) => void;
  openDialog: (id: DialogIds) => void;
  closeDialog: (id: DialogIds) => void;
};

const store = createStore<DialogStoreType>((set) => ({
  isVisible: {},
  dialogContent: {},
  setDialogContent: (id: DialogIds, content: any): void => {
    set(
      produce((state) => {
        state.dialogContent[id] = content;
      })
    );
  },
  openDialog: (id: DialogIds): void => {
    document.body.style.overflowY = "hidden";
    set(
      produce((state) => {
        state.isVisible[id] = true;
      })
    );
  },
  closeDialog: (id: DialogIds): void => {
    document.body.style.overflowY = "auto";
    set(
      produce((state) => {
        state.isVisible[id] = false;
      })
    );
  },
}));

const useDialogStore = create(store);

/**
 * Use the below in a React Component
 * const { isVisible, openDialog, closeDialog, toggleDialog } = useDialog(DialogIds.DELETE_USER)
 */
const useDialog = <T = any>(id: DialogIds) => {
  return {
    isVisible: useDialogStore((store) => store.isVisible[id]),
    dialogContent: useDialogStore<T>((store) => store.dialogContent[id]),
    setDialogContent: useDialogStore(
      (store) => (content: T) => store.setDialogContent(id, content)
    ),
    openDialog: useDialogStore((store) => () => store.openDialog(id)),
    closeDialog: useDialogStore((store) => () => store.closeDialog(id)),
  };
};

export { useDialogStore, useDialog };
