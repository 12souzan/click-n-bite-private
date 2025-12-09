import { create } from "zustand"
import type { Category } from "@payload-types"

interface CategoryStore {
	categoriesVisible: boolean
	toggleCategoriesVisibility: () => void

	// Selected subcategory
	selectedSubcategory: string | null
	setSelectedSubcategory: (subcategory: string | null) => void

	selectedCategory: Category | null
	setSelectedCategory: (category: Category | null) => void
}

export const useCategoryStore = create<CategoryStore>()(
	// persist(
	(set) => ({
		categoriesVisible: true,
		selectedCategory: null,
		selectedSubcategory: null,

		toggleCategoriesVisibility: () => set((state) => ({ categoriesVisible: !state.categoriesVisible })),

		setSelectedCategory: (selectedCategory) => set({ selectedCategory, selectedSubcategory: null }),

		setSelectedSubcategory: (selectedSubcategory) => set({ selectedSubcategory })
	})
	// {
	// 	name: `${env.NEXT_PUBLIC_RESTAURANT_NAME}-category-preferences`,
	// 	storage: createJSONStorage(() => localStorage)
	// }
	// )
)
