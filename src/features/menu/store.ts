import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type ViewMode = "grid" | "list"

interface MenuStore {
	viewMode: ViewMode
	toggleViewMode: () => void
}

export const useMenuStore = create<MenuStore>()(
	persist(
		(set) => ({
			viewMode: "grid",
			toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === "grid" ? "list" : "grid" }))
		}),
		{
			name: `clicknbite-menu-preferences`,
			storage: createJSONStorage(() => localStorage)
		}
	)
)
