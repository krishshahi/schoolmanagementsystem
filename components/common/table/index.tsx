import React from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { SpinProps } from "antd/lib/spin";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { TableLocale } from "antd/lib/table/interface";
import styled from "styled-components";
import { theme } from "../../../theme";
import { GetComponentProps } from "rc-table/lib/interface";

const TableWrapper = styled(Table)`
	font-size: 16px;
	border: 1px solid #f0f0f0;
	overflow-x: auto;

	& thead > tr > th {
		color: #ffffff;
		background-color: #d2bc4b;
		word-break: keep-all;
		font-weight: 600;
		text-align: left;
	}

	.ant-table-thead > tr > th,
	.ant-table-tbody > tr > td,
	.ant-table tfoot > tr > th,
	.ant-table tfoot > tr > td {
		padding: 8px;
	}

	.table-row-dark {
		background-color: #f9f9f9;
	}

	& .ant-table-container table > thead > tr:first-child th:first-child,
	.ant-table-container table > tbody > tr > td:first-child {
		padding-left: 10px;
	}

	& .ant-table-tbody {
		& .ant-table-row {
			& .ant-table-cell {
				vertical-align: middle;
			}
		}
	}

	& .background-light {
		background-color: white !important;
	}

	& .background-dark {
		background-color: ${theme.lightGray} !important;
	}

	& .background-light-blue {
		background-color: white !important;

		& :hover {
			color: blue;
			cursor: pointer;
		}
	}

	& .background-dark-blue {
		background-color: ${theme.lightGray} !important;

		& :hover {
			color: blue;
			cursor: pointer;
		}
	}

	& .background-teal {
		background-color: ${theme.lightPrimaryBlue};
		color: white;

		& :hover {
			color: blue;
			cursor: pointer;
		}
	}

	& .background-pink {
		background-color: ${theme.darkPink};
		color: white;

		& :hover {
			color: blue;
			cursor: pointer;
		}
	}
`;

export interface TableComponents {
	table?: any;
	header?: {
		wrapper?: any;
		row?: any;
		cell?: any;
	};
	body?: {
		wrapper?: any;
		row?: any;
		cell?: any;
	};
}

interface TabularProps {
	key?: string;
	dataSource?: Record<string, unknown>[];
	columns?: any;
	pagination?: false | TablePaginationConfig;
	loading?: boolean | SpinProps;
	size?: SizeType;
	bordered?: boolean;
	locale?: TableLocale;
	onChange?: any;
	scroll?: any;
	components?: TableComponents;
	onRow?: GetComponentProps<any>;
	showHeader?: boolean;
	rowClassName?: any;
	hoverRow?: boolean;
	rowKey?: any;
	children?: React.ReactNode;
}

const Tabular: React.FC<TabularProps> = ({
	key,
	dataSource,
	columns,
	pagination,
	loading,
	size,
	bordered,
	locale,
	onChange,
	components,
	onRow,
	scroll,
	showHeader,
	rowClassName,
	rowKey,
	hoverRow = false,
	children,
}) => {
	return (
		<TableWrapper
			key={key}
			rowKey={rowKey}
			dataSource={dataSource}
			columns={columns}
			pagination={pagination}
			loading={loading}
			size={size}
			bordered={bordered}
			scroll={scroll}
			locale={locale}
			onChange={onChange}
			components={components}
			onRow={onRow}
			showHeader={showHeader}
			rowClassName={
				rowClassName
					? rowClassName
					: (data: any, i) => {
							if (data.table == "users-list") {
								if (
									data?.user_entrymd5 !== "" &&
									data?.user_entrymd5 !== undefined
								) {
									return "background-teal";
								} else if (data?.status_cd == "1") {
									return "background-pink";
								}
								return i % 2 == 0
									? "background-light-blue"
									: "background-dark-blue";
							}
							return i % 2 == 0 ? "background-light" : "background-dark";
					  }
			}
		/>
	);
};

export { Tabular };
