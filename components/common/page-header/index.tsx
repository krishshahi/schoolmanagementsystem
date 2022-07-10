import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import {
	BreadcrumbComponent as Breadcrumb,
	BreadcrumbItem,
} from "../breadcrumb";

interface PageHeaderProps {
	title: string;
	breadcrumbItems?: BreadcrumbItem[];
	showListIcon?: boolean;
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: baseline;

	& .title {
		font-size: 20px;
	}

	& .breadcrumb-wrapper {
		background-color: #d2d6de;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10px 0 10px 20px;
	}

	@media (min-width: 360px) {
		& .title {
			font-size: 20px;
		}
	}

	@media (min-width: 768px) {
		flex-direction: row;

		& .breadcrumb-wrapper {
			background-color: transparent;
			width: unset;
			padding-left: 0;
		}
	}
`;

const PageHeader: React.FC<PageHeaderProps> = (props) => {
	const { title, breadcrumbItems, showListIcon } = props;
	const { t } = useTranslation();
	return (
		<Container>
			<p className={"title"}>{t(`${title}`)}</p>
			<div className={"breadcrumb-wrapper"}>
				<Breadcrumb items={breadcrumbItems} showListIcon={showListIcon} />
			</div>
		</Container>
	);
};

export { PageHeader };
