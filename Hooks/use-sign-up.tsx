import { create } from "zustand";

type useSignUp = {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export const useSignUp = create<useSignUp>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))