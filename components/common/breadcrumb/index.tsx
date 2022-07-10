import React from "react";
import { Breadcrumb } from "antd";
import styled from "styled-components";
import {
	DashboardFilled,
	RightOutlined,
	SnippetsFilled,
} from "@ant-design/icons";
import Link from "next/link";
import { theme } from "../../../theme";

const { Item } = Breadcrumb;

export interface BreadcrumbComponentProps {
	items?: BreadcrumbItem[];
	showHomeIcon?: boolean;
	showListIcon?: boolean;
}

export interface BreadcrumbItem {
	name?: string;
	href?: string;
	key?: string;
	showListIcon?: boolean;
}

interface IBreadcrumb {
	maxwidth?: string;
}

const BreadcrumbStyled = styled(Breadcrumb)<IBreadcrumb>`
	display: flex;
	align-items: center;
	margin-bottom: 5px;
	& a {
		color: #000000;
		text-decoration: none;

		& :hover {
			color: #000000;
		}
	}

	& .ant-breadcrumb-separator {
		margin: 0 10px;
	}

	& .anticon {
		font-size: 11px;
		color: #000000;
	}
`;

const ItemStyled = styled(Item)`
	font-size: 12px;
	line-height: 14px;
	color: #000000;

	& .has-link {
		color: ${theme.gray8};
	}

	& .no-link {
		color: ${theme.gray5};
	}
`;

const renderBreadcrumbItem = (items: BreadcrumbItem[]): JSX.Element[] => {
	const breadcrumbItems: JSX.Element[] = [];
	for (const item of items) {
		breadcrumbItems.push(
			<ItemStyled key={items.indexOf(item)}>
				{item.href ? (
					item.showListIcon ? (
						<Link href={item.href}>
							<a>
								<SnippetsFilled />
								<span className={"has-link"}>{item.name}</span>
							</a>
						</Link>
					) : (
						<Link href={item.href}>
							<a>
								<span className={"has-link"}>{item.name}</span>
							</a>
						</Link>
					)
				) : (
					<span className={"no-link"}>{item.name}</span>
				)}
			</ItemStyled>
		);
	}
	return breadcrumbItems;
};

export const BreadcrumbComponent: React.FC<BreadcrumbComponentProps> = ({
	items,
	showHomeIcon = true,
}) => {
	return items ? (
		<BreadcrumbStyled
			separator={<RightOutlined style={{ color: theme.gray7 }} />}
		>
			{showHomeIcon && (
				<DashboardFilled
					style={{
						marginRight: 10,
						fontSize: 12,
						color: theme.gray8,
						marginTop: "5px",
					}}
				/>
			)}

			{renderBreadcrumbItem(items)}
		</BreadcrumbStyled>
	) : (
		<></>
	);
};
