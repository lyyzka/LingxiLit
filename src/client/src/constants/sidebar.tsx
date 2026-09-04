import getMessage from "@/constants/messages";
import { SidebarItemProps } from "@/types/sidebar";
import {
	Activity,
	Cable,
	Bot,
	Boxes,
	Building2,
	FolderKanban,
	Home,
	Key,
	LayoutDashboard,
	SettingsIcon,
	User,
} from "lucide-react";

export const ICON_CLASSES = "flex-shrink-0 size-4";

const m = getMessage();

export const SIDEBAR_ITEMS: SidebarItemProps[] = [
	{
		icon: <Home className={ICON_CLASSES} />,
		text: "首页",
		link: "/home",
		type: "action",
	},
	{
		icon: <LayoutDashboard className={ICON_CLASSES} />,
		text: "仪表盘",
		link: "/dashboards",
		type: "action",
	},
	{
		title: "应用",
		type: "section",
		icon: <Boxes className={ICON_CLASSES} />,
		groups: [
			{
				title: m.SIDEBAR_MONITOR,
				children: [
					{
						icon: <Activity className={ICON_CLASSES} />,
						text: "观测",
						link: "/telemetry",
						type: "action",
					},
					{
						icon: <Bot className={ICON_CLASSES} />,
						text: "智能体",
						link: "/agents",
						type: "action",
					},
				],
			},
			{
				title: "配置",
				children: [
					{
						icon: <Cable className={ICON_CLASSES} />,
						text: "数据连接",
						link: "/connectors",
						type: "action",
					},
				],
			},
		],
	},
	{
		title: "设置",
		type: "section",
		collapsible: true,
		icon: <SettingsIcon className={ICON_CLASSES} />,
		children: [
			{
				icon: <Building2 className={ICON_CLASSES} />,
				text: m.ORGANISATION,
				link: "/organisation",
				type: "action",
			},
			{
				icon: <FolderKanban className={ICON_CLASSES} />,
				text: m.SIDEBAR_PROJECTS,
				link: "/organisation?tab=projects",
				type: "action",
			},
			{
				icon: <User className={ICON_CLASSES} />,
				text: m.USER_PROFILE,
				link: "/settings/profile",
				type: "action",
			},
			{
				icon: <Key className={ICON_CLASSES} />,
				text: m.API_KEYS,
				link: "/settings/api-keys",
				type: "action",
			},
		],
	},
];
