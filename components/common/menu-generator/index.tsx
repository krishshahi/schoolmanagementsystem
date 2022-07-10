import React from "react";
import { MenuTheme } from "antd/lib/menu/MenuContext";
import Menu from "antd/lib/menu";
import SubMenu from "antd/lib/menu/SubMenu";
import styled from "styled-components";
import { Image } from "antd";

const Wrapper = styled.div`
	& .ant-menu-submenu-title,
	.ant-menu-title {
		padding-right: 12px;
		font-size: 14px;
	}
	.ant-menu-sub li > .ant-menu-title-content {
		margin-left: 25px;
	}
	.img {
		margin-bottom: 10px;
	}
`;

interface MenuGeneratorProps {
	theme?: MenuTheme;
	mode?: any;
	className?: string;
	defaultSelectedKeys?: string[];
	defaultOpenKeys?: string[];
	items?: MenuItem[];
	selectedKeys?: string[];
	expandIcon?: any;
}

interface MenuItem {
	key: string;
	onClick?: () => void;
	icon?: JSX.Element;
	name: string;
	children?: MenuItem[];
	disabled?: boolean;
	className?: string;
}

const renderMenuItem = (items: MenuItem[]): JSX.Element[] => {
	const menuItems: JSX.Element[] = [];
	for (const item of items) {
		let children: JSX.Element[] = [];
		if (item.children) {
			children = renderMenuItem(item.children);
		}
		if (item) {
			if (children.length > 0) {
				menuItems.push(
					<SubMenu
						key={item.key}
						title={
							<span>
								{item.icon}
								<span>{item.name}</span>
							</span>
						}
						disabled={item.disabled}
					>
						{children}
					</SubMenu>
				);
			} else {
				menuItems.push(
					<Menu.Item
						key={item.key}
						onClick={item.onClick}
						disabled={item.disabled}
					>
						{item.icon}
						<span>{item.name}</span>
						{children}
					</Menu.Item>
				);
			}
		}
	}
	return menuItems;
};

const MenuGenerator: React.FC<MenuGeneratorProps> = ({
	theme,
	className,
	defaultSelectedKeys,
	defaultOpenKeys,
	items,
	mode,
	selectedKeys,
	expandIcon,
}) => {
	return (
		<Wrapper>
			<Menu
				mode={mode}
				theme={theme}
				className={className}
				defaultSelectedKeys={defaultSelectedKeys}
				defaultOpenKeys={defaultOpenKeys}
				selectedKeys={selectedKeys}
				expandIcon={expandIcon}
			>
				<Image src="/assets/logo.png" alt="loading" className="img" />
				{items && renderMenuItem(items)}
			</Menu>
		</Wrapper>
	);
};

export { MenuGenerator };
