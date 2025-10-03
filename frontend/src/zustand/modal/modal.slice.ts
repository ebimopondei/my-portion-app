import type { StateCreator } from "zustand";

export interface ModalState {
  isPaymentModalOpen: boolean;
  togglePaymentModal: () => void;
}

export const createModalsSlice: StateCreator<
 ModalState
> = (set, get) => ({
  isPaymentModalOpen: false,
  togglePaymentModal: () =>{
     set((state) => ({ isPaymentModalOpen: !state.isPaymentModalOpen }));
}});
