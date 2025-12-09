// import { ALLOWED_ICONS } from "@/features/category/constants"
// import { MenuItemTag } from "@/features/menu/types"
// import type { Category, ContactSetting, MenuItem } from "@payload-types"

// enum SubCategory {
// 	BREAKFAST_CLASSICS = "breakfast-classics",
// 	BREAKFAST_HEALTHY = "breakfast-healthy",
// 	BREAKFAST_SIDES = "breakfast-sides",
// 	APPETIZERS_HOT = "appetizers-hot",
// 	APPETIZERS_COLD = "appetizers-cold",
// 	APPETIZERS_SHARING = "appetizers-sharing",
// 	MAIN_COURSES_MEAT = "main-courses-meat",
// 	MAIN_COURSES_SEAFOOD = "main-courses-seafood",
// 	MAIN_COURSES_VEGETARIAN = "main-courses-vegetarian",
// 	DESSERTS_CAKES = "desserts-cakes",
// 	DESSERTS_FROZEN = "desserts-frozen",
// 	DESSERTS_FRUIT = "desserts-fruit",
// 	BEVERAGES_HOT = "beverages-hot",
// 	BEVERAGES_COLD = "beverages-cold",
// 	BEVERAGES_ALCOHOLIC = "beverages-alcoholic"
// }

// export const demoCategories: Omit<Category, "tenant" | "createdAt" | "updatedAt" | "_status">[] = [
// 	{
// 		id: 1,
// 		name: "Breakfast",
// 		icon: ALLOWED_ICONS[0],
// 		color: "#FFA500",
// 		order: 1,
// 		subcategories: [
// 			{ id: SubCategory.BREAKFAST_CLASSICS, name: "Breakfast Classics" },
// 			{ id: SubCategory.BREAKFAST_HEALTHY, name: "Healthy Options" },
// 			{ id: SubCategory.BREAKFAST_SIDES, name: "Sides & Extras" }
// 		]
// 	},
// 	{
// 		id: 2,
// 		name: "Appetizers",
// 		icon: ALLOWED_ICONS[1],
// 		color: "#22C55E",
// 		order: 2,
// 		subcategories: [
// 			{ id: SubCategory.APPETIZERS_HOT, name: "Hot Appetizers" },
// 			{ id: SubCategory.APPETIZERS_COLD, name: "Cold Appetizers" },
// 			{ id: SubCategory.APPETIZERS_SHARING, name: "Sharing Platters" }
// 		]
// 	},
// 	{
// 		id: 3,
// 		name: "Main Courses",
// 		icon: ALLOWED_ICONS[2],
// 		color: "#3B82F6",
// 		order: 3,
// 		subcategories: [
// 			{ id: SubCategory.MAIN_COURSES_MEAT, name: "Meat & Poultry" },
// 			{ id: SubCategory.MAIN_COURSES_SEAFOOD, name: "Seafood" },
// 			{ id: SubCategory.MAIN_COURSES_VEGETARIAN, name: "Vegetarian" }
// 		]
// 	},
// 	{
// 		id: 4,
// 		name: "Desserts",
// 		icon: ALLOWED_ICONS[3],
// 		color: "#F59E0B",
// 		order: 4,
// 		subcategories: [
// 			{ id: SubCategory.DESSERTS_CAKES, name: "Cakes & Pastries" },
// 			{ id: SubCategory.DESSERTS_FROZEN, name: "Ice Cream & Frozen" },
// 			{ id: SubCategory.DESSERTS_FRUIT, name: "Fruit Desserts" }
// 		]
// 	},
// 	{
// 		id: 5,
// 		name: "Beverages",
// 		icon: ALLOWED_ICONS[4],
// 		color: "#EC4899",
// 		order: 5,
// 		subcategories: [
// 			{ id: SubCategory.BEVERAGES_HOT, name: "Hot Drinks" },
// 			{ id: SubCategory.BEVERAGES_COLD, name: "Cold Drinks" },
// 			{ id: SubCategory.BEVERAGES_ALCOHOLIC, name: "Alcoholic Beverages" }
// 		]
// 	}
// ]

// export const demoMenuItems: Omit<MenuItem, "tenant" | "createdAt" | "updatedAt" | "_status">[] = [
// 	{
// 		id: 1,
// 		name: "Avocado Toast",
// 		description: "Sourdough bread topped with smashed avocado, poached eggs, and microgreens",
// 		price: 12.99,
// 		tags: [MenuItemTag.VEGETARIAN, MenuItemTag.POPULAR],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/avocado-toast.avif",
// 				alt: "Avocado Toast",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "avocado-toast.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 420,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_HEALTHY
// 	},
// 	{
// 		id: 2,
// 		name: "Buttermilk Pancakes",
// 		description: "Fluffy pancakes served with maple syrup and fresh berries",
// 		price: 10.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/pancake-1.avif",
// 				alt: "Buttermilk Pancakes",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "pancake-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_CLASSICS
// 	},
// 	{
// 		id: 3,
// 		name: "Breakfast Burrito",
// 		description: "Scrambled eggs, chorizo, black beans, cheese, and pico de gallo wrapped in a flour tortilla",
// 		price: 13.99,
// 		tags: [MenuItemTag.SPICY],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/burrito.avif",
// 				alt: "Breakfast Burrito",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "burrito.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 720,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_CLASSICS
// 	},
// 	{
// 		id: 4,
// 		name: "Eggs Benedict",
// 		description: "English muffin topped with Canadian bacon, poached eggs, and hollandaise sauce",
// 		price: 14.99,
// 		tags: [MenuItemTag.POPULAR],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/eggs-benedict-1.avif",
// 				alt: "Eggs Benedict",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "eggs-benedict-1.avif",
// 				width: 500,
// 				height: 500
// 			},
// 			{
// 				id: 2,
// 				url: "/demo/eggs-benedict-2.avif",
// 				alt: "Eggs Benedict",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "eggs-benedict-2.avif",
// 				width: 500,
// 				height: 500
// 			},
// 			{
// 				id: 3,
// 				url: "/demo/eggs-benedict-3.avif",
// 				alt: "Eggs Benedict",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "eggs-benedict-3.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 580,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_CLASSICS
// 	},
// 	{
// 		id: 5,
// 		name: "Granola Bowl",
// 		description: "House-made granola with Greek yogurt, honey, and seasonal fruits",
// 		price: 9.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/granola.avif",
// 				alt: "Granola Bowl",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "granola.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 380,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_HEALTHY
// 	},
// 	{
// 		id: 6,
// 		name: "Bacon Side",
// 		description: "Four strips of crispy bacon",
// 		price: 4.99,
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/bacon.avif",
// 				alt: "Bacon Side",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "bacon.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 280,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_SIDES
// 	},
// 	{
// 		id: 7,
// 		name: "Fresh Fruit Bowl",
// 		description: "Seasonal fresh fruits",
// 		price: 5.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/fruit-bowl.avif",
// 				alt: "Fresh Fruit Bowl",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "fruit-bowl.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 120,
// 		category: demoCategories[0] as Category,
// 		subcategory: SubCategory.BREAKFAST_SIDES
// 	},
// 	{
// 		id: 8,
// 		name: "Truffle Fries",
// 		description: "Crispy fries tossed with truffle oil, parmesan cheese, and fresh herbs",
// 		price: 8.99,
// 		tags: [MenuItemTag.VEGETARIAN, MenuItemTag.POPULAR],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/truffle-fries.avif",
// 				alt: "Truffle Fries",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "truffle-fries.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 480,
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_HOT
// 	},
// 	{
// 		id: 9,
// 		name: "Calamari",
// 		description: "Lightly fried squid served with lemon aioli and marinara sauce",
// 		price: 12.99,
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/calamari.avif",
// 				alt: "Calamari",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "calamari.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 420,
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_HOT
// 	},
// 	{
// 		id: 10,
// 		name: "Bruschetta",
// 		description: "Toasted baguette topped with diced tomatoes, basil, garlic, and balsamic glaze",
// 		price: 9.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/bruschetta-1.avif",
// 				alt: "Bruschetta",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "bruschetta-1.avif",
// 				width: 500,
// 				height: 500
// 			},
// 			{
// 				id: 2,
// 				url: "/demo/bruschetta-2.avif",
// 				alt: "Bruschetta",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "bruschetta-2.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 280,
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_COLD
// 	},
// 	{
// 		id: 11,
// 		name: "Buffalo Wings",
// 		description: "Crispy chicken wings tossed in buffalo sauce, served with blue cheese dressing",
// 		price: 13.99,
// 		tags: [MenuItemTag.SPICY],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/wings.avif",
// 				alt: "Buffalo Wings",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "wings.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 850,
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_HOT
// 	},
// 	{
// 		id: 12,
// 		name: "Spinach Artichoke Dip",
// 		description: "Creamy spinach and artichoke dip served with tortilla chips",
// 		price: 10.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/artichoke.avif",
// 				alt: "Spinach Artichoke Dip",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "artichoke.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_SHARING
// 	},
// 	{
// 		id: 13,
// 		name: "Charcuterie Board",
// 		description: "Selection of cured meats, cheeses, olives, and crackers",
// 		price: 18.99,
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/charcuterie.jpg",
// 				alt: "Charcuterie Board",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "charcuterie.jpg",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_SHARING
// 	},
// 	{
// 		id: 14,
// 		name: "Caprese Salad",
// 		description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
// 		price: 11.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/caprese.avif",
// 				alt: "Caprese Salad",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "caprese.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 320,
// 		category: demoCategories[1] as Category,
// 		subcategory: SubCategory.APPETIZERS_COLD
// 	},
// 	{
// 		id: 15,
// 		name: "Grilled Salmon",
// 		description: "Atlantic salmon with lemon butter sauce, served with roasted vegetables and quinoa",
// 		price: 24.99,
// 		tags: [MenuItemTag.POPULAR],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/salmon-1.avif",
// 				alt: "Grilled Salmon",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "salmon-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		calories: 520,
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_SEAFOOD
// 	},
// 	{
// 		id: 16,
// 		name: "Filet Mignon",
// 		description: "8oz beef tenderloin with red wine reduction, mashed potatoes, and seasonal vegetables",
// 		price: 32.99,
// 		tags: [MenuItemTag.POPULAR],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/mignon.avif",
// 				alt: "Filet Mignon",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "mignon.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_MEAT
// 	},
// 	{
// 		id: 17,
// 		name: "Mushroom Risotto",
// 		description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese",
// 		price: 18.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/risotto-1.avif",
// 				alt: "Mushroom Risotto",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "risotto-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
// 	},
// 	{
// 		id: 18,
// 		name: "Chicken Parmesan",
// 		description: "Breaded chicken breast topped with marinara sauce and mozzarella, served with spaghetti",
// 		price: 19.99,
// 		tags: [MenuItemTag.SPICY],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/parmesan-1.avif",
// 				alt: "Chicken Parmesan",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "parmesan-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_MEAT
// 	},
// 	{
// 		id: 19,
// 		name: "Spicy Thai Curry",
// 		description: "Red curry with vegetables and tofu, served with jasmine rice",
// 		price: 17.99,
// 		tags: [MenuItemTag.SPICY, MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/curry-1.avif",
// 				alt: "Spicy Thai Curry",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "curry-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
// 	},
// 	{
// 		id: 20,
// 		name: "Grilled Sea Bass",
// 		description: "Fresh sea bass with herb butter, served with roasted potatoes and asparagus",
// 		price: 28.99,
// 		tags: [MenuItemTag.SPICY],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/bass.avif",
// 				alt: "Grilled Sea Bass",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "bass.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_SEAFOOD
// 	},
// 	{
// 		id: 21,
// 		name: "Eggplant Parmesan",
// 		description: "Breaded eggplant with marinara sauce and mozzarella, served with spaghetti",
// 		price: 16.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/eggplant.avif",
// 				alt: "Eggplant Parmesan",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "eggplant.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[2] as Category,
// 		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
// 	},
// 	{
// 		id: 22,
// 		name: "Chocolate Lava Cake",
// 		description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
// 		price: 8.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/lava-1.avif",
// 				alt: "Chocolate Lava Cake",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "lava-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_CAKES
// 	},
// 	{
// 		id: 23,
// 		name: "New York Cheesecake",
// 		description: "Classic cheesecake with graham cracker crust and berry compote",
// 		price: 7.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/cheesecake-1.avif",
// 				alt: "New York Cheesecake",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "cheesecake-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_CAKES
// 	},
// 	{
// 		id: 24,
// 		name: "Tiramisu",
// 		description: "Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
// 		price: 8.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/tiramisu-1.avif",
// 				alt: "Tiramisu",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "tiramisu-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_CAKES
// 	},
// 	{
// 		id: 25,
// 		name: "Crème Brûlée",
// 		description: "Vanilla custard with a caramelized sugar top",
// 		price: 7.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/creme-1.avif",
// 				alt: "Crème Brûlée",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "creme-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_CAKES
// 	},
// 	{
// 		id: 26,
// 		name: "Gelato Selection",
// 		description: "Choice of three flavors: chocolate, vanilla, strawberry, pistachio, or caramel",
// 		price: 6.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/gelato.avif",
// 				alt: "Gelato Selection",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "gelato.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_FROZEN
// 	},
// 	{
// 		id: 27,
// 		name: "Fresh Fruit Tart",
// 		description: "Buttery pastry shell filled with custard and topped with seasonal fruits",
// 		price: 8.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/tart.jpg",
// 				alt: "Fresh Fruit Tart",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "tart.jpg",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_FRUIT
// 	},
// 	{
// 		id: 28,
// 		name: "Berry Sorbet",
// 		description: "Refreshing mixed berry sorbet, dairy-free",
// 		price: 5.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/sorbet.avif",
// 				alt: "Berry Sorbet",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "sorbet.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[3] as Category,
// 		subcategory: SubCategory.DESSERTS_FROZEN
// 	},
// 	{
// 		id: 29,
// 		name: "Craft Lemonade",
// 		description: "House-made lemonade with fresh mint and berries",
// 		price: 4.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/lemonade-1.avif",
// 				alt: "Craft Lemonade",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "lemonade-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_COLD
// 	},
// 	{
// 		id: 30,
// 		name: "Cold Brew Coffee",
// 		description: "Smooth cold-brewed coffee served over ice",
// 		price: 4.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/brew-1.avif",
// 				alt: "Cold Brew Coffee",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "brew-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_COLD
// 	},
// 	{
// 		id: 31,
// 		name: "Fresh Fruit Smoothie",
// 		description: "Blended seasonal fruits with yogurt and honey",
// 		price: 5.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/smoothie.avif",
// 				alt: "Fresh Fruit Smoothie",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "smoothie.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_COLD
// 	},
// 	{
// 		id: 32,
// 		name: "Sparkling Water",
// 		description: "Carbonated water with a slice of lemon",
// 		price: 2.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/sparkling-1.avif",
// 				alt: "Sparkling Water",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "sparkling-1.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_COLD
// 	},
// 	{
// 		id: 33,
// 		name: "Specialty Coffee",
// 		description: "Single-origin coffee prepared in your choice of method: pour-over, French press, or Aeropress",
// 		price: 5.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/coffee.avif",
// 				alt: "Specialty Coffee",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "coffee.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_HOT
// 	},
// 	{
// 		id: 34,
// 		name: "Craft Beer Selection",
// 		description: "Rotating selection of local craft beers",
// 		price: 7.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/beer.avif",
// 				alt: "Craft Beer Selection",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "beer.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_ALCOHOLIC
// 	},
// 	{
// 		id: 35,
// 		name: "Herbal Tea",
// 		description: "Selection of premium loose-leaf herbal teas",
// 		price: 3.99,
// 		tags: [MenuItemTag.VEGETARIAN],
// 		images: [
// 			{
// 				id: 1,
// 				url: "/demo/tea.avif",
// 				alt: "Herbal Tea",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "tea.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		],
// 		category: demoCategories[4] as Category,
// 		subcategory: SubCategory.BEVERAGES_HOT
// 	}
// ]

// export const demoContactInfo: Omit<ContactSetting, "tenant" | "createdAt" | "updatedAt" | "_status"> = {
// 	id: 1,
// 	restaurantInfo: {
// 		name: "Demo Restaurant",
// 		slogan: "Built for the Love of Food",
// 		shortBio:
// 			"Demo Restaurant offers a unique dining experience that combines traditional flavors with modern culinary techniques. Our chefs are passionate about creating memorable dishes using only the freshest, locally-sourced ingredients."
// 	},
// 	contactInfo: {
// 		phone: "123-456-7890",
// 		email: "demo@example.com",
// 		whatsapp: "+1234567890"
// 	},
// 	socialLinks: [
// 		{
// 			socialItem: "facebook",
// 			url: "https://facebook.com/restaurant"
// 		},
// 		{
// 			socialItem: "instagram",
// 			url: "https://instagram.com/restaurant"
// 		},
// 		{
// 			socialItem: "x",
// 			url: "https://x.com/restaurant"
// 		},
// 		{
// 			socialItem: "youtube",
// 			url: "https://youtube.com/restaurant"
// 		},
// 		{
// 			socialItem: "tiktok",
// 			url: "https://tiktok.com/restaurant"
// 		}
// 	],
// 	branches: [
// 		{
// 			id: "downtown",
// 			name: "Downtown",
// 			address: "123 Main Street, Downtown, New York, NY 10001",
// 			phone: "+1 (555) 123-4567",
// 			email: "downtown@bistromodern.com",
// 			openingHours: [
// 				{ days: "Monday - Friday", openingTime: "11:00", closingTime: "10:00" },
// 				{ days: "Saturday - Sunday", openingTime: "10:00", closingTime: "11:00" }
// 			],
// 			mapUrl:
// 				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425882426901!3d40.74076684331894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sMadison%20Square%20Garden!5e0!3m2!1sen!2sus!4v1682596756147!5m2!1sen!2sus",
// 			image: {
// 				id: 1,
// 				url: "/demo/restaurant.avif",
// 				alt: "Downtown",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "downtown.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		},
// 		{
// 			id: "uptown",
// 			name: "Uptown",
// 			address: "456 Park Avenue, Uptown, New York, NY 10022",
// 			phone: "+1 (555) 987-6543",
// 			email: "uptown@bistromodern.com",
// 			openingHours: [
// 				{ days: "Monday - Thursday", openingTime: "11:30", closingTime: "9:30" },
// 				{ days: "Friday - Sunday", openingTime: "11:00", closingTime: "10:30" }
// 			],
// 			mapUrl:
// 				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9720375311813!2d-73.97631382426803!3d40.76438384175806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258efa154b3ab%3A0x9e9b08608a5b0099!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1682596831229!5m2!1sen!2sus",
// 			image: {
// 				id: 1,
// 				url: "/demo/restaurant-2.avif",
// 				alt: "Uptown",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "uptown.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		},
// 		{
// 			id: "brooklyn",
// 			name: "Brooklyn",
// 			address: "789 Atlantic Avenue, Brooklyn, NY 11217",
// 			phone: "+1 (555) 456-7890",
// 			email: "brooklyn@bistromodern.com",
// 			openingHours: [
// 				{ days: "Monday - Friday", openingTime: "11:00", closingTime: "10:00" },
// 				{ days: "Saturday - Sunday", openingTime: "10:00", closingTime: "11:00" }
// 			],
// 			mapUrl:
// 				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-73.99492192427143!3d40.69218924413569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a47df06b185%3A0xc889234bc07c42ee!2sBrooklyn%20Heights!5e0!3m2!1sen!2sus!4v1682596890069!5m2!1sen!2sus",
// 			image: {
// 				id: 1,
// 				url: "/demo/restaurant-3.avif",
// 				alt: "Brooklyn",
// 				updatedAt: new Date().toISOString(),
// 				createdAt: new Date().toISOString(),
// 				filename: "brooklyn.avif",
// 				width: 500,
// 				height: 500
// 			}
// 		}
// 	]
// }
import { ALLOWED_ICONS } from "@/features/category/constants"
import { MenuItemTag } from "@/features/menu/types"
import type { Category, ContactSetting, MenuItem } from "@payload-types"

enum SubCategory {
	BREAKFAST_CLASSICS = "breakfast-classics",
	BREAKFAST_HEALTHY = "breakfast-healthy",
	BREAKFAST_SIDES = "breakfast-sides",
	APPETIZERS_HOT = "appetizers-hot",
	APPETIZERS_COLD = "appetizers-cold",
	APPETIZERS_SHARING = "appetizers-sharing",
	MAIN_COURSES_MEAT = "main-courses-meat",
	MAIN_COURSES_SEAFOOD = "main-courses-seafood",
	MAIN_COURSES_VEGETARIAN = "main-courses-vegetarian",
	DESSERTS_CAKES = "desserts-cakes",
	DESSERTS_FROZEN = "desserts-frozen",
	DESSERTS_FRUIT = "desserts-fruit",
	BEVERAGES_HOT = "beverages-hot",
	BEVERAGES_COLD = "beverages-cold",
	BEVERAGES_ALCOHOLIC = "beverages-alcoholic"
}
export const demoCategories: Omit<Category, "tenant" | "createdAt" | "updatedAt" | "_status">[] = [
	{
		id: "0634ef50-344c-788f-5f89-9fc2c2c2f5b5",
		name: "Breakfast",
		icon: ALLOWED_ICONS[0],
		color: "#FFA500",
		order: 1,
		subcategories: [
			{ id: SubCategory.BREAKFAST_CLASSICS, name: "Breakfast Classics" },
			{ id: SubCategory.BREAKFAST_HEALTHY, name: "Healthy Options" },
			{ id: SubCategory.BREAKFAST_SIDES, name: "Sides & Extras" }
		]
	},
	{
		id: "0634ef50-344c-788f-5f8a-9fc2c2c2f5b5",
		name: "Appetizers",
		icon: ALLOWED_ICONS[1],
		color: "#22C55E",
		order: 2,
		subcategories: [
			{ id: SubCategory.APPETIZERS_HOT, name: "Hot Appetizers" },
			{ id: SubCategory.APPETIZERS_COLD, name: "Cold Appetizers" },
			{ id: SubCategory.APPETIZERS_SHARING, name: "Sharing Platters" }
		]
	},
	{
		id: "0634ef50-344c-788f-5f8b-9fc2c2c2f5b5",
		name: "Main Courses",
		icon: ALLOWED_ICONS[2],
		color: "#3B82F6",
		order: 3,
		subcategories: [
			{ id: SubCategory.MAIN_COURSES_MEAT, name: "Meat & Poultry" },
			{ id: SubCategory.MAIN_COURSES_SEAFOOD, name: "Seafood" },
			{ id: SubCategory.MAIN_COURSES_VEGETARIAN, name: "Vegetarian" }
		]
	},
	{
		id: "0634ef50-344c-788f-5f8c-9fc2c2c2f5b5",
		name: "Desserts",
		icon: ALLOWED_ICONS[3],
		color: "#F59E0B",
		order: 4,
		subcategories: [
			{ id: SubCategory.DESSERTS_CAKES, name: "Cakes & Pastries" },
			{ id: SubCategory.DESSERTS_FROZEN, name: "Ice Cream & Frozen" },
			{ id: SubCategory.DESSERTS_FRUIT, name: "Fruit Desserts" }
		]
	},
	{
		id: "0634ef50-344c-788f-5f8d-9fc2c2c2f5b5",
		name: "Beverages",
		icon: ALLOWED_ICONS[4],
		color: "#EC4899",
		order: 5,
		subcategories: [
			{ id: SubCategory.BEVERAGES_HOT, name: "Hot Drinks" },
			{ id: SubCategory.BEVERAGES_COLD, name: "Cold Drinks" },
			{ id: SubCategory.BEVERAGES_ALCOHOLIC, name: "Alcoholic Beverages" }
		]
	}
]

export const demoMenuItems: Omit<MenuItem, "tenant" | "createdAt" | "updatedAt" | "_status">[] = [
	{
		id: "018f33f4-8ac1-7dd4-a9d5-ed1d1d184a0a",
		name: "Avocado Toast",
		description: "Sourdough bread topped with smashed avocado, poached eggs, and microgreens",
		price: 12.99,
		tags: [MenuItemTag.VEGETARIAN, MenuItemTag.POPULAR],
		images: [
			{
				id: "g7h8i9j0-k1l2-3456-ghij-789012345678",
				url: "/demo/avocado-toast.avif",
				alt: "Avocado Toast",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "avocado-toast.avif",
				width: 500,
				height: 500
			}
		],
		calories: 420,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_HEALTHY
	},
	{
		id: "018f33f4-8ac1-7dd4-a9d6-ed1d1d184a0a",
		name: "Buttermilk Pancakes",
		description: "Fluffy pancakes served with maple syrup and fresh berries",
		price: 10.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "i9j0k1l2-m3n4-5678-ijkl-901234567890",
				url: "/demo/pancake-1.avif",
				alt: "Buttermilk Pancakes",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "pancake-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_CLASSICS
	},
	{
		id: "018f33f4-8ac1-7dd4-a9d7-ed1d1d184a0a",
		name: "Breakfast Burrito",
		description: "Scrambled eggs, chorizo, black beans, cheese, and pico de gallo wrapped in a flour tortilla",
		price: 13.99,
		tags: [MenuItemTag.SPICY],
		images: [
			{
				id: "k1l2m3n4-o5p6-7890-klmn-123456789012",
				url: "/demo/burrito.avif",
				alt: "Breakfast Burrito",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "burrito.avif",
				width: 500,
				height: 500
			}
		],
		calories: 720,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_CLASSICS
	},
	{
		id: "018f33f4-8ac1-7dd4-a9d8-ed1d1d184a0a",
		name: "Eggs Benedict",
		description: "English muffin topped with Canadian bacon, poached eggs, and hollandaise sauce",
		price: 14.99,
		tags: [MenuItemTag.POPULAR],
		images: [
			{
				id: "m3n4o5p6-q7r8-9012-mnop-345678901234",
				url: "/demo/eggs-benedict-1.avif",
				alt: "Eggs Benedict",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "eggs-benedict-1.avif",
				width: 500,
				height: 500
			},
			{
				id: "n4o5p6q7-r8s9-0123-nopq-456789012345",
				url: "/demo/eggs-benedict-2.avif",
				alt: "Eggs Benedict",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "eggs-benedict-2.avif",
				width: 500,
				height: 500
			},
			{
				id: "o5p6q7r8-s9t0-1234-opqr-567890123456",
				url: "/demo/eggs-benedict-3.avif",
				alt: "Eggs Benedict",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "eggs-benedict-3.avif",
				width: 500,
				height: 500
			}
		],
		calories: 580,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_CLASSICS
	},
	{
		id: "018f33f4-8ac1-7dd4-a9d9-ed1d1d184a0a",
		name: "Granola Bowl",
		description: "House-made granola with Greek yogurt, honey, and seasonal fruits",
		price: 9.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "q7r8s9t0-u1v2-3456-qrst-789012345678",
				url: "/demo/granola.avif",
				alt: "Granola Bowl",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "granola.avif",
				width: 500,
				height: 500
			}
		],
		calories: 380,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_HEALTHY
	},
	{
		id: "018f33f4-8ac1-7dd4-a9da-ed1d1d184a0a",
		name: "Bacon Side",
		description: "Four strips of crispy bacon",
		price: 4.99,
		images: [
			{
				id: "s9t0u1v2-w3x4-5678-stuv-901234567890",
				url: "/demo/bacon.avif",
				alt: "Bacon Side",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "bacon.avif",
				width: 500,
				height: 500
			}
		],
		calories: 280,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_SIDES
	},
	{
		id: "018f33f4-8ac1-7dd4-a9db-ed1d1d184a0a",
		name: "Fresh Fruit Bowl",
		description: "Seasonal fresh fruits",
		price: 5.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "u1v2w3x4-y5z6-7890-uvwx-123456789012",
				url: "/demo/fruit-bowl.avif",
				alt: "Fresh Fruit Bowl",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "fruit-bowl.avif",
				width: 500,
				height: 500
			}
		],
		calories: 120,
		category: demoCategories[0] as Category,
		subcategory: SubCategory.BREAKFAST_SIDES
	},
	{
		id: "018f33f4-8ac1-7dd4-a9dc-ed1d1d184a0a",
		name: "Truffle Fries",
		description: "Crispy fries tossed with truffle oil, parmesan cheese, and fresh herbs",
		price: 8.99,
		tags: [MenuItemTag.VEGETARIAN, MenuItemTag.POPULAR],
		images: [
			{
				id: "w3x4y5z6-a7b8-9012-wxyz-345678901234",
				url: "/demo/truffle-fries.avif",
				alt: "Truffle Fries",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "truffle-fries.avif",
				width: 500,
				height: 500
			}
		],
		calories: 480,
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_HOT
	},
	{
		id: "018f33f4-8ac1-7dd4-a9dd-ed1d1d184a0a",
		name: "Calamari",
		description: "Lightly fried squid served with lemon aioli and marinara sauce",
		price: 12.99,
		images: [
			{
				id: "y5z6a7b8-c9d0-1234-ybcd-567890123456",
				url: "/demo/calamari.avif",
				alt: "Calamari",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "calamari.avif",
				width: 500,
				height: 500
			}
		],
		calories: 420,
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_HOT
	},
	{
		id: "018f33f4-8ac1-7dd4-a9de-ed1d1d184a0a",
		name: "Bruschetta",
		description: "Toasted baguette topped with diced tomatoes, basil, garlic, and balsamic glaze",
		price: 9.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "a7b8c9d0-e1f2-3456-acde-789012345678",
				url: "/demo/bruschetta-1.avif",
				alt: "Bruschetta",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "bruschetta-1.avif",
				width: 500,
				height: 500
			},
			{
				id: "b8c9d0e1-f2g3-4567-bdef-890123456789",
				url: "/demo/bruschetta-2.avif",
				alt: "Bruschetta",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "bruschetta-2.avif",
				width: 500,
				height: 500
			}
		],
		calories: 280,
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_COLD
	},
	{
		id: "01ab56c7-acf3-7ff6-cbfb-0f3f3f3a6c2c",
		name: "Buffalo Wings",
		description: "Crispy chicken wings tossed in buffalo sauce, served with blue cheese dressing",
		price: 13.99,
		tags: [MenuItemTag.SPICY],
		images: [
			{
				id: "d0e1f2g3-h4i5-6789-defg-012345678901",
				url: "/demo/wings.avif",
				alt: "Buffalo Wings",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "wings.avif",
				width: 500,
				height: 500
			}
		],
		calories: 850,
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_HOT
	},
	{
		id: "01ab56c7-acf3-7ff6-cbfc-0f3f3f3a6c2c",
		name: "Spinach Artichoke Dip",
		description: "Creamy spinach and artichoke dip served with tortilla chips",
		price: 10.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "f2g3h4i5-j6k7-8901-fghi-234567890123",
				url: "/demo/artichoke.avif",
				alt: "Spinach Artichoke Dip",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "artichoke.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_SHARING
	},
	{
		id: "01ab56c7-acf3-7ff6-cbfd-0f3f3f3a6c2c",
		name: "Charcuterie Board",
		description: "Selection of cured meats, cheeses, olives, and crackers",
		price: 18.99,
		images: [
			{
				id: "h4i5j6k7-l8m9-0123-hijk-456789012345",
				url: "/demo/charcuterie.jpg",
				alt: "Charcuterie Board",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "charcuterie.jpg",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_SHARING
	},
	{
		id: "01ab56c7-acf3-7ff6-cbfe-0f3f3f3a6c2c",
		name: "Caprese Salad",
		description: "Fresh mozzarella, tomatoes, and basil with balsamic glaze",
		price: 11.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "j6k7l8m9-n0o1-2345-jklm-678901234567",
				url: "/demo/caprese.avif",
				alt: "Caprese Salad",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "caprese.avif",
				width: 500,
				height: 500
			}
		],
		calories: 320,
		category: demoCategories[1] as Category,
		subcategory: SubCategory.APPETIZERS_COLD
	},
	{
		id: "01ab56c7-acf3-7ff6-cbff-0f3f3f3a6c2c",
		name: "Grilled Salmon",
		description: "Atlantic salmon with lemon butter sauce, served with roasted vegetables and quinoa",
		price: 24.99,
		tags: [MenuItemTag.POPULAR],
		images: [
			{
				id: "l8m9n0o1-p2q3-4567-lmno-890123456789",
				url: "/demo/salmon-1.avif",
				alt: "Grilled Salmon",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "salmon-1.avif",
				width: 500,
				height: 500
			}
		],
		calories: 520,
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_SEAFOOD
	},
	{
		id: "01ab56c7-acf3-7ff6-cc00-0f3f3f3a6c2c",
		name: "Filet Mignon",
		description: "8oz beef tenderloin with red wine reduction, mashed potatoes, and seasonal vegetables",
		price: 32.99,
		tags: [MenuItemTag.POPULAR],
		images: [
			{
				id: "n0o1p2q3-r4s5-6789-nopq-012345678901",
				url: "/demo/mignon.avif",
				alt: "Filet Mignon",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "mignon.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_MEAT
	},
	{
		id: "01bc67d8-bdf4-7007-dc08-1f4f4f4b7d3d",
		name: "Mushroom Risotto",
		description: "Creamy arborio rice with wild mushrooms, truffle oil, and parmesan cheese",
		price: 18.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "p2q3r4s5-t6u7-8901-pqrs-234567890123",
				url: "/demo/risotto-1.avif",
				alt: "Mushroom Risotto",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "risotto-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
	},
	{
		id: "01bc67d8-bdf4-7007-dc09-1f4f4f4b7d3d",
		name: "Chicken Parmesan",
		description: "Breaded chicken breast topped with marinara sauce and mozzarella, served with spaghetti",
		price: 19.99,
		tags: [MenuItemTag.SPICY],
		images: [
			{
				id: "r4s5t6u7-v8w9-0123-rstu-456789012345",
				url: "/demo/parmesan-1.avif",
				alt: "Chicken Parmesan",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "parmesan-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_MEAT
	},
	{
		id: "01bc67d8-bdf4-7007-dc0a-1f4f4f4b7d3d",
		name: "Spicy Thai Curry",
		description: "Red curry with vegetables and tofu, served with jasmine rice",
		price: 17.99,
		tags: [MenuItemTag.SPICY, MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "t6u7v8w9-x0y1-2345-tuvw-678901234567",
				url: "/demo/curry-1.avif",
				alt: "Spicy Thai Curry",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "curry-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
	},
	{
		id: "01bc67d8-bdf4-7007-dc0b-1f4f4f4b7d3d",
		name: "Grilled Sea Bass",
		description: "Fresh sea bass with herb butter, served with roasted potatoes and asparagus",
		price: 28.99,
		tags: [MenuItemTag.SPICY],
		images: [
			{
				id: "v8w9x0y1-z2a3-4567-vwxy-890123456789",
				url: "/demo/bass.avif",
				alt: "Grilled Sea Bass",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "bass.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_SEAFOOD
	},
	{
		id: "01bc67d8-bdf4-7007-dc0c-1f4f4f4b7d3d",
		name: "Eggplant Parmesan",
		description: "Breaded eggplant with marinara sauce and mozzarella, served with spaghetti",
		price: 16.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "x0y1z2a3-b4c5-6789-xabc-012345678901",
				url: "/demo/eggplant.avif",
				alt: "Eggplant Parmesan",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "eggplant.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[2] as Category,
		subcategory: SubCategory.MAIN_COURSES_VEGETARIAN
	},
	{
		id: "01bc67d8-bdf4-7007-dc0d-1f4f4f4b7d3d",
		name: "Chocolate Lava Cake",
		description: "Warm chocolate cake with a molten center, served with vanilla ice cream",
		price: 8.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "z2a3b4c5-d6e7-8901-zabc-234567890123",
				url: "/demo/lava-1.avif",
				alt: "Chocolate Lava Cake",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "lava-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_CAKES
	},
	{
		id: "01bc67d8-bdf4-7007-dc0e-1f4f4f4b7d3d",
		name: "New York Cheesecake",
		description: "Classic cheesecake with graham cracker crust and berry compote",
		price: 7.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "b4c5d6e7-f8g9-0123-bcde-456789012345",
				url: "/demo/cheesecake-1.avif",
				alt: "New York Cheesecake",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "cheesecake-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_CAKES
	},
	{
		id: "01bc67d8-bdf4-7007-dc0f-1f4f4f4b7d3d",
		name: "Tiramisu",
		description: "Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream",
		price: 8.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "d6e7f8g9-h0i1-2345-defg-678901234567",
				url: "/demo/tiramisu-1.avif",
				alt: "Tiramisu",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "tiramisu-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_CAKES
	},
	{
		id: "01bc67d8-bdf4-7007-dc10-1f4f4f4b7d3d",
		name: "Crème Brûlée",
		description: "Vanilla custard with a caramelized sugar top",
		price: 7.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "f8g9h0i1-j2k3-4567-fghi-890123456789",
				url: "/demo/creme-1.avif",
				alt: "Crème Brûlée",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "creme-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_CAKES
	},
	{
		id: "01bc67d8-bdf4-7007-dc11-1f4f4f4b7d3d",
		name: "Gelato Selection",
		description: "Choice of three flavors: chocolate, vanilla, strawberry, pistachio, or caramel",
		price: 6.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "h0i1j2k3-l4m5-6789-hijk-012345678901",
				url: "/demo/gelato.avif",
				alt: "Gelato Selection",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "gelato.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_FROZEN
	},
	{
		id: "01cd78e9-cef5-7118-ed19-2f5f5f5c8e4e",
		name: "Fresh Fruit Tart",
		description: "Buttery pastry shell filled with custard and topped with seasonal fruits",
		price: 8.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "j2k3l4m5-n6o7-8901-jklm-234567890123",
				url: "/demo/tart.jpg",
				alt: "Fresh Fruit Tart",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "tart.jpg",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_FRUIT
	},
	{
		id: "01cd78e9-cef5-7118-ed1a-2f5f5f5c8e4e",
		name: "Berry Sorbet",
		description: "Refreshing mixed berry sorbet, dairy-free",
		price: 5.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "l4m5n6o7-p8q9-0123-lmno-456789012345",
				url: "/demo/sorbet.avif",
				alt: "Berry Sorbet",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "sorbet.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[3] as Category,
		subcategory: SubCategory.DESSERTS_FROZEN
	},
	{
		id: "0523de4f-233b-777e-4f7f-8fb1b1b1e4a4",
		name: "Craft Lemonade",
		description: "House-made lemonade with fresh mint and berries",
		price: 4.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "n6o7p8q9-r0s1-2345-nopq-678901234567",
				url: "/demo/lemonade-1.avif",
				alt: "Craft Lemonade",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "lemonade-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_COLD
	},
	{
		id: "0523de4f-233b-777e-4f80-8fb1b1b1e4a4",
		name: "Cold Brew Coffee",
		description: "Smooth cold-brewed coffee served over ice",
		price: 4.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
				url: "/demo/brew-1.avif",
				alt: "Cold Brew Coffee",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "brew-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_COLD
	},
	{
		id: "0523de4f-233b-777e-4f81-8fb1b1b1e4a4",
		name: "Fresh Fruit Smoothie",
		description: "Blended seasonal fruits with yogurt and honey",
		price: 5.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "d4e5f6g7-h8i9-0123-defg-456789012345",
				url: "/demo/smoothie.avif",
				alt: "Fresh Fruit Smoothie",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "smoothie.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_COLD
	},
	{
		id: "0523de4f-233b-777e-4f82-8fb1b1b1e4a4",
		name: "Sparkling Water",
		description: "Carbonated water with a slice of lemon",
		price: 2.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "09671283-677f-7bb2-8fae-cff5f5f528e8",
				url: "/demo/sparkling-1.avif",
				alt: "Sparkling Water",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "sparkling-1.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_COLD
	},
	{
		id: "0523de4f-233b-777e-4f83-8fb1b1b1e4a",
		name: "Specialty Coffee",
		description: "Single-origin coffee prepared in your choice of method: pour-over, French press, or Aeropress",
		price: 5.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "h8i9j0k1-l2m3-4567-hijk-890123456789",
				url: "/demo/coffee.avif",
				alt: "Specialty Coffee",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "coffee.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_HOT
	},
	{
		id: "0523de4f-233b-777e-4f84-8fb1b1b1e4a4",
		name: "Craft Beer Selection",
		description: "Rotating selection of local craft beers",
		price: 7.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "j0k1l2m3-n4o5-6789-jklm-012345678901",
				url: "/demo/beer.avif",
				alt: "Craft Beer Selection",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "beer.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_ALCOHOLIC
	},
	{
		id: "0523de4f-233b-777e-4f85-8fb1b1b1e4a4",
		name: "Herbal Tea",
		description: "Selection of premium loose-leaf herbal teas",
		price: 3.99,
		tags: [MenuItemTag.VEGETARIAN],
		images: [
			{
				id: "l2m3n4o5-p6q7-8901-lmno-234567890123",
				url: "/demo/tea.avif",
				alt: "Herbal Tea",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "tea.avif",
				width: 500,
				height: 500
			}
		],
		category: demoCategories[4] as Category,
		subcategory: SubCategory.BEVERAGES_HOT
	}
]

export const demoContactInfo: Omit<ContactSetting, "tenant" | "createdAt" | "updatedAt" | "_status"> = {
	id: "0523de4f-233b-777e-4f86-8fb1b1b1e4a4",
	restaurantInfo: {
		name: "Demo Restaurant",
		slogan: "Built for the Love of Food",
		shortBio:
			"Demo Restaurant offers a unique dining experience that combines traditional flavors with modern culinary techniques. Our chefs are passionate about creating memorable dishes using only the freshest, locally-sourced ingredients."
	},
	contactInfo: {
		phone: "123-456-7890",
		email: "demo@example.com",
		whatsapp: "+1234567890"
	},
	socialLinks: [
		{
			socialItem: "facebook",
			url: "https://facebook.com/restaurant"
		},
		{
			socialItem: "instagram",
			url: "https://instagram.com/restaurant"
		},
		{
			socialItem: "x",
			url: "https://x.com/restaurant"
		},
		{
			socialItem: "youtube",
			url: "https://youtube.com/restaurant"
		},
		{
			socialItem: "tiktok",
			url: "https://tiktok.com/restaurant"
		}
	],
	branches: [
		{
			id: "downtown",
			name: "Downtown",
			address: "123 Main Street, Downtown, New York, NY 10001",
			phone: "+1 (555) 123-4567",
			email: "downtown@bistromodern.com",
			openingHours: [
				{ days: "Monday - Friday", openingTime: "11:00", closingTime: "10:00" },
				{ days: "Saturday - Sunday", openingTime: "10:00", closingTime: "11:00" }
			],
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425882426901!3d40.74076684331894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sMadison%20Square%20Garden!5e0!3m2!1sen!2sus!4v1682596756147!5m2!1sen!2sus",
			image: {
				id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
				url: "/demo/restaurant.avif",
				alt: "Downtown",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "downtown.avif",
				width: 500,
				height: 500
			}
		},
		{
			id: "uptown",
			name: "Uptown",
			address: "456 Park Avenue, Uptown, New York, NY 10022",
			phone: "+1 (555) 987-6543",
			email: "uptown@bistromodern.com",
			openingHours: [
				{ days: "Monday - Thursday", openingTime: "11:30", closingTime: "9:30" },
				{ days: "Friday - Sunday", openingTime: "11:00", closingTime: "10:30" }
			],
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9720375311813!2d-73.97631382426803!3d40.76438384175806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258efa154b3ab%3A0x9e9b08608a5b0099!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1682596831229!5m2!1sen!2sus",
			image: {
				id: "c3d4e5f6-g7h8-9012-cdef-345678901234",
				url: "/demo/restaurant-2.avif",
				alt: "Uptown",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "uptown.avif",
				width: 500,
				height: 500
			}
		},
		{
			id: "brooklyn",
			name: "Brooklyn",
			address: "789 Atlantic Avenue, Brooklyn, NY 11217",
			phone: "+1 (555) 456-7890",
			email: "brooklyn@bistromodern.com",
			openingHours: [
				{ days: "Monday - Friday", openingTime: "11:00", closingTime: "10:00" },
				{ days: "Saturday - Sunday", openingTime: "10:00", closingTime: "11:00" }
			],
			mapUrl:
				"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.3063874233135!2d-73.99492192427143!3d40.69218924413569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a47df06b185%3A0xc889234bc07c42ee!2sBrooklyn%20Heights!5e0!3m2!1sen!2sus!4v1682596890069!5m2!1sen!2sus",
			image: {
				id: "d4e5f6g7-h8i9-0123-defg-456789012345",
				url: "/demo/restaurant-3.avif",
				alt: "Brooklyn",
				updatedAt: new Date().toISOString(),
				createdAt: new Date().toISOString(),
				filename: "brooklyn.avif",
				width: 500,
				height: 500
			}
		}
	]
}
