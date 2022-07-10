export const moduleData = [
	{
		id: 1,
		name: "Dashboard",
		has_child: false,
		child: [],
		url: "/dashboard",
	},
	{
		id: 2,
		name: "User",
		has_child: true,
		child: [
			{ id: 1, name: "User Group", parent_id: 2, url: "user/create" },
			{
				id: 2,
				name: "User Permission",
				parent_id: 2,
				url: "user/permission",
			},
		],
		url: "/user",
	},
	{
		id: 3,
		name: "Registration",
		child: [
			{ id: 1, name: "Student", parent_id: 3, url: "registration/student" },
			{
				id: 2,
				name: "School",
				parent_id: 3,
				url: "registration/school",
			},
		],
		url: "/registration",
	},
];
