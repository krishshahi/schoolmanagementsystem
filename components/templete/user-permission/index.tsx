import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { TextField, Select, Button, Table } from "../../common";
import { DROPDOWN } from "../../../constants";
import { theme } from "../../../theme";
import {
	LockOutlined,
	SaveOutlined,
	CloseCircleOutlined,
} from "@ant-design/icons";
import { Module } from "../../container";
export interface InfoProps {
	title?: string;
}
const Wrapper = styled.div`
	& .align-row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
		& .field-class {
			margin-bottom: 20px;
		}
		& .field-classes {
			margin-bottom: 20px;
			margin-right: 15px;
			width: 500px;
		}
	}
	.module {
		width: 100%;
	}
`;
const ButtonStyle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	flex-wrap: wrap;
	justify-content: end;
	width: 100%;
	gap: 10px;
`;

const UserPermissionComponent: React.FC<InfoProps> = ({ title }) => {
	const { t } = useTranslation();
	const data = [{ module_name: "user" }];
	return (
		<>
			<Wrapper>
				<form>
					<div className={"align-row"}>
						<TextField
							label={t("Role")}
							placeholder={t("Role")}
							name={"role"}
							width={"550px"}
							className={"field-class"}
							labelClassName={"label-style"}
						/>
						<Select
							label={`${t("Status")}`}
							placeholder={t("Please Select")}
							name={"status"}
							className={"field-classes"}
							options={DROPDOWN}
							height={"35px"}
						/>
						<div className="module">
							<Module />
						</div>

						<ButtonStyle>
							<Button
								type="primary"
								fontSize={"16px"}
								borderradius={"3px"}
								icon={<SaveOutlined />}
								height={"40px"}
								padding={"0px 10px"}
								buttonClassName={"submit-button"}
								htmlType={"submit"}
							>
								{t("Submit")}
							</Button>

							<Button
								type="default"
								background={theme.gray2}
								color={theme.darkGray1}
								bordercolor={theme.darkGray2}
								hovercolor="transparent"
								icon={<CloseCircleOutlined />}
								activecolor={theme.darkGray2}
								fontSize={"16px"}
								borderradius={"3px"}
								height={"40px"}
								padding={"0px 10px"}
								buttonClassName={"submit-button"}
							>
								{t("Cancel")}
							</Button>
						</ButtonStyle>
					</div>
				</form>
			</Wrapper>
		</>
	);
};

export { UserPermissionComponent };
