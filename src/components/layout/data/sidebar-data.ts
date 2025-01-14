import {
	IconBarrierBlock,
	IconBrowserCheck,
	IconBug,
	IconError404,
	IconFile,
	IconHelp,
	IconLayoutDashboard,
	IconLock,
	IconLockAccess,
	IconNotification,
	IconPackages,
	IconPalette,
	IconPhone,
	IconServerOff,
	IconSettings,
	IconTool,
	IconUserCog,
	IconUserFilled,
	IconUserOff,
	IconUsers,
} from "@tabler/icons-react";
import { Command } from "lucide-react";
import { type SidebarData } from "../types";

export const sidebarData: SidebarData = {
	user: {
		name: "satnaing",
		email: "satnaingdev@gmail.com",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "NextCall Admin",
			logo: Command,
			plan: "Free trial",
		},
	],
	navGroups: [
		{
			title: "General",
			items: [
				{
					title: "Assistants",
					url: "/assistants",
					icon: IconUserFilled,
				},

				{
					title: "Calls",
					url: "/calls",
					icon: IconPhone,
				},
				{
					title: "Files",
					url: "/files",
					icon: IconFile,
				},
			],
		},
		{
			title: "Other",
			items: [
				{
					title: "Settings",
					icon: IconSettings,
					items: [
						{
							title: "Profile",
							url: "/settings",
							icon: IconUserCog,
						},
						{
							title: "Account",
							url: "/settings/account",
							icon: IconTool,
						},
						{
							title: "Appearance",
							url: "/settings/appearance",
							icon: IconPalette,
						},
						{
							title: "Notifications",
							url: "/settings/notifications",
							icon: IconNotification,
						},
						{
							title: "Display",
							url: "/settings/display",
							icon: IconBrowserCheck,
						},
					],
				},
				{
					title: "Help Center",
					url: "/help-center",
					icon: IconHelp,
				},
			],
		},
	],
};
