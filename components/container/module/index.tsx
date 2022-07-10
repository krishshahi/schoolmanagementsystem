import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "../../../theme";
import { Checkbox } from "antd";
import { moduleData } from "../../../constants";
import { Button } from "../../common";
import { useState } from "react";
export interface IAddressProps {
	id?: string;
	isLoading?: boolean;
}
const Wrapper = styled.div`
	& .align-row {
		& .field-classes {
			margin-bottom: 5px;
			width: 280px;
		}
		.table {
			width: 100%;
			border: solid 1px #ccc;
		}
		.head {
			border-bottom: solid 1px #ccc;
    height: 35px;
    text-align: left;
    background: #d3b209;
    color: white;
}
tr > .td-child {
			padding-left:35px
		}
tr > .td-center {
			text-align:center
		}
		}
		th,
		td {
			border-right: solid 1px #ccc;
			padding: 10px;
		}
		tr{
			border-bottom: solid 1px #ccc;
		}
		

	}
`;
const Module: React.FC<IAddressProps> = ({ isLoading }) => {
	const { t } = useTranslation();
	const [data, setData] = useState([
		{
			id: 1,
			module_name: "",
			readOnly: false,
			create: false,
			update: false,
			delete: false,
		},
	]);
	const onChange = (i, e) => {
		e.preventDefault();
		const datas = [...data];
		datas[i] = { ...datas[i], [e.target.name]: e.target.value };
		setData(datas);
	};
	const onChanges = (name, i, e) => {
		const datas = [...data];
		datas[i] = {
			...datas[i],
			module_name: name,
			[e.target.name]: e.target.checked,
		};
		setData(datas);
		console.log("checked = ", e.target.name);
		console.log("checked = ", e.target.checked);
	};

	const submit = () => {
		console.log("submit", data);
	};

	return (
		<>
			<Wrapper>
				<form>
					<div className={"align-row"}>
						<table className="table">
							<thead className="head">
								<th style={{ width: "10%" }}>{t("S.N.")}</th>
								<th style={{ width: "50%" }}>{t("Module")}</th>
								<th>{t("Read Only")}</th>
								<th>{t("Create")}</th>
								<th>{t("Update")}</th>
								<th>{t("delete")}</th>
							</thead>
							{moduleData &&
								moduleData.map((itmm, index) => {
									return (
										<>
											<tbody>
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{itmm.name}</td>
													<td className="td-center">
														<Checkbox
															name="readOnly"
															value="readonly"
															onChange={(e) => onChanges(itmm.name, index, e)}
														/>
													</td>
													<td className="td-center">
														<Checkbox
															name="create"
															value="create"
															onChange={(e) => onChanges(itmm.name, index, e)}
														/>
													</td>
													<td className="td-center">
														<Checkbox
															name="update"
															value="update"
															onChange={(e) => onChanges(itmm.name, index, e)}
														/>
													</td>
													<td className="td-center">
														<Checkbox
															name="delete"
															value="delete"
															onChange={(e) => onChanges(itmm.name, index, e)}
														/>
													</td>
												</tr>
												{itmm.child.length > 0 &&
													itmm.child.map((item, i) => {
														return (
															<tr key={i}>
																<td className="td-child">*</td>
																<td className="td-child">{item.name}</td>
																<td className="td-center">
																	<Checkbox
																		name="readOnly"
																		value="readonly"
																		onChange={(e) =>
																			onChanges(item.name, index, e)
																		}
																	/>
																</td>
																<td className="td-center">
																	<Checkbox
																		name="create"
																		value="create"
																		onChange={(e) => onChanges(item.name, i, e)}
																	/>
																</td>
																<td className="td-center">
																	<Checkbox
																		name="update"
																		value="update"
																		onChange={(e) => onChanges(item.name, i, e)}
																	/>
																</td>
																<td className="td-center">
																	<Checkbox
																		name="delete"
																		value="delete"
																		onChange={(e) => onChanges(item.name, i, e)}
																	/>
																</td>
															</tr>
														);
													})}
											</tbody>
										</>
									);
								})}
						</table>
					</div>
					<Button
						type="primary"
						fontSize={"16px"}
						borderradius={"3px"}
						height={"40px"}
						padding={"0px 10px"}
						buttonClassName={"submit-button"}
						onClick={submit}
					>
						{t("Submit")}
					</Button>
				</form>
			</Wrapper>
		</>
	);
};

export { Module };
