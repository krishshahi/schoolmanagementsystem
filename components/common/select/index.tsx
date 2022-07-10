import React from "react";
import { Select } from "antd";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "../../../theme";
import { CaretDownFilled, DownOutlined } from "@ant-design/icons";

export interface ISelect {
	width?: string;
	height?: string;
	className?: string;
	admin?: boolean;
	fullWidth?: string;
	radius?: string;
	onBlur?: any;
	clear?: boolean;
	defaultValue?: string | string[] | number | number[];
	options?: any[];
	value?: any;
	onChange?: any;
	suffix?: string;
	type?: "optgroup" | "";
	dark?: boolean;
	onFocus?: any;
	placeholder?: string;
	error?: any;
	name?: any;
	bgColor?: string;
	required?: boolean;
	label?: string;
	loading?: boolean;
	open?: boolean;
	hide?: boolean;
	native?: boolean;
	shadow?: string;
	max_width?: string;
	showSearch?: boolean;
	filterOption?: any;
	labelClassName?: string;
	errorClassName?: string;
	mode?: "multiple" | "tag";
	onSearch?: any;
}

const SelectWithStyle = styled(({ dark, bgColor, admin, error, ...props }) => {
	return (
		<Select
			getPopupContainer={(trigger) => trigger.parentNode}
			{...dark}
			{...admin}
			{...props}
			{...error}
			bgcolor={bgColor}
		/>
	);
})`
	width: ${({ width }: ISelect) => {
		return width ? `${width} !important` : "auto";
	}};

	& .ant-select-selector {
		border-radius: ${({ radius }: ISelect) => {
			return radius ? `${radius} !important` : "4px !important";
		}};
		border-color: ${({ error }: ISelect) => {
			return error ? `${theme.alert} !important` : `#D2D2D2 !important`;
		}};
		min-height: ${({ height }: ISelect) => {
			return height ? `${height} !important` : "30px";
		}};
		width: ${({ width }: ISelect) => {
			return width ? `${width} !important` : "auto";
		}};
		box-shadow: ${({ shadow }: ISelect) => {
			return shadow === "true"
				? ` 0px 4px 4px rgba(0, 0, 0, 0.1); !important`
				: "";
		}};

		background-color: ${({ bgColor, dark }: ISelect) => {
			return bgColor
				? `${bgColor} !important`
				: dark
				? `${theme.gray9} !important`
				: theme.base;
		}};
	}

	& .ant-select-selection-item {
		align-items: center;
	}

	& .ant-select-selection-search {
		padding-top: 6px;
	}

	& .ant-select-selection-item,
	.ant-select-selection-placeholder {
		color: #444;
		min-height: ${({ admin }: ISelect) => {
			return admin ? "40px" : "auto";
		}};
		vertical-align: middle;
	}
`;

const WrapperDiv = styled.div<{ $hide: boolean }>`
	display: flex;
	flex-direction: column;
	width: ${({ width, fullWidth }: ISelect) =>
		fullWidth ? "100%" : width || "auto"};
`;

const Error = styled.div`
	color: ${theme.alert};
`;

const NativeSelectWrapper = styled.div`
	position: relative;

	& > span {
		pointer-events: none;
		position: absolute;
		right: 15px;
		top: 50%;
		margin-top: -6px;
	}
`;

const NativeSelect = styled.select<{ $dark: boolean }>`
	width: 100%;
	border: 1px solid #d9d9d9;
	padding: 14px 11px;
	background: ${({ $dark }) => ($dark ? "rgb(244, 246, 250)" : "#fff")};
	border-radius: 6px;
	appearance: none;
`;

const RequiredLabel = styled.div`
	${theme.typography.typographySecondary};
	line-height: 20px;
	font-size: 0.8em;
	border-radius: 2px;
	color: ${theme.primayRed};
`;
const LabelContainer = styled.div`
	display: flex;
	margin-bottom: 5px;
`;
const Label = styled.div`
	${theme.typography.PackDesc};
	margin-right: 5px;
	color: #5e5c5c;
`;

const StyledCaretDownFilled = styled(CaretDownFilled)`
	color: black;
	pointer-events: none;
`;
const SelectComponent = (props: ISelect) => {
	const { Option, OptGroup } = Select;
	const {
		options,
		clear,
		type,
		suffix,
		loading,
		admin,
		label,
		required,
		hide,
		native,
		onChange,
		name,
		dark,
		value,
		mode,
		labelClassName,
		className,
		errorClassName,
		placeholder,
		filterOption,
		onSearch,
		...rest
	} = props;

	const { t } = useTranslation();

	if (native) {
		return (
			<WrapperDiv $hide={hide} className={className ?? ""}>
				{label && (
					<LabelContainer className={labelClassName ?? ""}>
						<Label>{label}</Label>
						{required && <RequiredLabel>{t("*")}</RequiredLabel>}
					</LabelContainer>
				)}
				<NativeSelectWrapper>
					<NativeSelect
						$dark={dark}
						onChange={(e) => onChange(e.target.value)}
						placeholder={placeholder}
						name={name}
					>
						{type === "optgroup"
							? options &&
							  options.map(
									(option: any, idx: number) =>
										option.optname && (
											<optgroup key={idx} label={option.optname}>
												{option.values &&
													option.values.map((option: any, index: number) => (
														<option
															key={`${idx}-${index}`}
															value={option.value || t("Please Select")}
															selected={option.value === value}
														>
															{t(`${option.name}`)}
														</option>
													))}
											</optgroup>
										)
							  )
							: options &&
							  options.map((option: any, index: number) =>
									typeof option == "object" ? (
										<option
											key={index}
											value={option.value || t("Please Select")}
											selected={option.value === value}
										>
											{t(`${option.name}`)}
										</option>
									) : (
										<option
											key={index}
											value={option || t("Please Select")}
											selected={option === value}
										>
											{option}
										</option>
									)
							  )}
					</NativeSelect>
					<DownOutlined />
				</NativeSelectWrapper>
				{props.error && (
					<Error className={errorClassName ?? ""}>{props.error}</Error>
				)}
			</WrapperDiv>
		);
	}

	return (
		<WrapperDiv $hide={hide} className={className ?? ""}>
			{label && (
				<LabelContainer className={labelClassName ?? ""}>
					<Label>{label}</Label>
					{required && <RequiredLabel>{t("*")}</RequiredLabel>}
				</LabelContainer>
			)}
			<SelectWithStyle
				allowClear={clear}
				onSearch={onSearch}
				admin={admin}
				suffixIcon={<DownOutlined />}
				onChange={onChange}
				name={name}
				dark={dark}
				value={value || t("Please Select")}
				mode={mode}
				placeholder={placeholder}
				showArrow
				filterOption={filterOption}
				{...rest}
			>
				{type === "optgroup"
					? options &&
					  options.map(
							(option: any, idx: number) =>
								option.optname && (
									<OptGroup key={idx} label={option.optname}>
										{option.values &&
											option.values.map((option: any, index: number) => (
												<Option
													key={`${idx}-${index}`}
													value={option.value}
													placeholder={placeholder}
												>
													{t(`${option.name}`)}
												</Option>
											))}
									</OptGroup>
								)
					  )
					: options &&
					  options.map((option: any, index: number) =>
							typeof option == "object" ? (
								<Option
									key={index}
									value={option.value}
									placeholder={placeholder}
									disabled={option?.disabled}
								>
									{t(`${option.name}`)}
								</Option>
							) : (
								<Option key={index} value={option}>
									{option}
								</Option>
							)
					  )}
			</SelectWithStyle>
			{props.error && (
				<Error className={errorClassName ?? ""}>{props.error}</Error>
			)}
		</WrapperDiv>
	);
};

export { SelectComponent };
