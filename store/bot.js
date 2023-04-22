import { create } from "zustand";

export const SideBarOptions = {
  MainOptions: "MainOptions",
  Meassege: "Meassege",
  default: "default",
};
const useBotStore = create((set) => ({
  bot: 0,
  edges: [],
  nodes: [],
  selectedNode: null,
  sideBarStatus: "default",
  setSideBarStatus: (status) => set({ sideBarStatus: status }),
  setSelectedNode: (node) => set({ selectedNode: node }),
  setBot: (bot) => set({ bot }),
  setEdges: (edges) => set({ edges }),
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));

export default useBotStore;
