// state.ts (Jotai state)

import { atom } from "jotai";

export const todosAtom = atom<{ id: number; content: string }[] | null>(null);
