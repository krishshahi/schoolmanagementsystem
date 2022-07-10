import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { ImageUpload, TextField, Button } from "../../../common";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { ISchool } from "../../../../interfaces";
import { UseMutateFunction } from "react-query";
import { useEffect, useState } from "react";

export interface IDocumentProps {
	id?: string;
	isLoading?: boolean;
	onSubmit?: UseMutateFunction<ISchool, unknown, ISchool | void>;
	data?: ISchool;
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
		}
		th,
		td {
			border-right: solid 1px #ccc;
			padding: 10px;
		}
		tr{
			border-bottom: solid 1px #ccc;
		}

		.plus {
			font-size: 20px;
			color: green;
			padding-right: 10px;
			cursor:pointer
		}
		.minus {
			font-size: 20px;
			color: red;
			cursor:pointer
		}
	}
`;

const Document: React.FC<IDocumentProps> = ({ isLoading, onSubmit, data }) => {
	const { t } = useTranslation();
	const [row, setRow] = useState([]);
	useEffect(() => {
		setRow([
			{
				name: "",
				type: "",
				icon: "add",
			},
		]);
	}, []);

	const formik = useFormik({
		initialValues: row,
		enableReinitialize: true,
		onSubmit: (values) => {
			console.log("valuess", row);
		},
	});

	const onChange = (i, e) => {
		e.preventDefault();
		const rows = [...row];
		rows[i] = { ...rows[i], [e.target.name]: e.target.value };
		setRow(rows);
	};

	const add = (i) => {
		const rows = [...row];
		if (i === 0) {
			rows[i] = { ...rows[i], icon: "change" };
			setRow(rows);
		}
		if (i > 0) {
			rows[i - 0] = { ...rows[i - 0], icon: "change" };
			setRow(rows);
		}
		setRow([...rows, { name: "", type: "", icon: "add" }]);
	};
	const remove = (i) => {
		if (row.length > 1) {
			var array = [...row];
			var index = i;
			if (index !== -1) {
				array.splice(index, 1);
				setRow(array);
			}

			array[array.length - 1] = { ...array[array.length - 1], icon: "add" };
			setRow(array);
		}
	};

	return (
		<>
			<Wrapper>
				<form onSubmit={formik.handleSubmit}>
					<div className={"align-row"}>
						<table className="table">
							<thead className="head">
								<th>{t("S.N.")}</th>
								<th>{t("Name")}</th>
								<th>{t("File")}</th>
								<th>{t("Action")}</th>
							</thead>
							{row &&
								row.map((itmm, index) => {
									return (
										<tbody key={index}>
											<tr key={index}>
												<td>{index + 1}</td>
												<td>
													<TextField
														placeholder={t("name")}
														value={itmm.name}
														name="name"
														onChange={(e) => onChange(index, e)}
													/>
												</td>
												<td>
													<ImageUpload type="pdf" />
												</td>
												<td>
													{itmm?.icon === "add" ? (
														<>
															<PlusCircleOutlined
																className="plus"
																onClick={() => add(index)}
															/>
															<MinusCircleOutlined
																className="minus"
																onClick={() => remove(index)}
															/>
														</>
													) : (
														<MinusCircleOutlined
															className="minus"
															onClick={() => remove(index)}
														/>
													)}
												</td>
											</tr>
										</tbody>
									);
								})}
						</table>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { Document };
