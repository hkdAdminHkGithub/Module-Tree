const urlBase = 'tree'
export const routes = [
	{
		path: "*",
		component: resolve => require(["./Pages/NotFound.vue"], resolve)
	},
	{
		path: `/${urlBase}`,
		component: resolve => require(["./Pages/home/index.vue"], resolve),
	},

	// __Menu__
	{
		path: `/${urlBase}/menu`,
		component: resolve => require(["./Pages/menu/index.vue"], resolve),
	},

	// __Category__
	{
		path: `/${urlBase}/category`,
		component: resolve => require(["./Pages/category/index.vue"], resolve),
	},
];