import React, { ReactNode, useEffect, useState } from "react";
import { ConfigProvider, DatePicker as AntDatePicker } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { theme } from "../../../theme";
import { i18next } from "../../../i18n";
import jaJP from "antd/lib/locale/ja_JP";
import { DateFormat } from "../../../constants";

const { RangePicker } = AntDatePicker;

interface DatePickerProps {
	value?: any;
	format?: string;
	onChange?: (val: string, date?: any) => void;
	onOpenChange?: (val: any) => void;
	size?: "large" | "small" | "default";
	bordered?: boolean;
	className?: string;
	labelClassName?: string;
	errorClassName?: string;
	wrapperClassName?: string;
	name?: string;
	disabledDate?: any;
	label?: string;
	range?: boolean;
	showTime?: boolean;
	suffixIcon?: ReactNode;
	prefixIcon?: ReactNode;
	clearIcon?: ReactNode;
	error?: any;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	id?: string;
	required?: boolean;
	separator?: string;
	placeholder?: any;
	allowClear?: any;
	fullWidth?: boolean;
	width?: string;
	extraLabel?: string;
	extralabelclassname?: string;
	disabled?: boolean;
	defaultPickerValue?: [moment.Moment, moment.Moment];
}

const LabelContainer = styled.div`
	display: flex;
	margin-bottom: 5px;
`;

const ErrorCounterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2px;
`;

const Label = styled.div`
	${theme.typography.PackDesc};
	margin-right: 10px;
	color: #5e5c5c;
`;

const ErrorStyled = styled.span`
	font-size: 12px;
	color: ${theme.alert};
	margin-top: 2px;
	margin-left: 2px;
`;

const RequiredLabel = styled.div`
	${theme.typography.typographySecondary};
	line-height: 20px;
	font-size: 0.8em;
	border-radius: 2px;
	padding: 0 4px;
	color: #fff;
	background-color: ${theme.primayRed};
`;

const DatePickerWrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */

	& .ant-picker {
		height: 35px;
		width: ${({ width, fullWidth }: DatePickerProps) =>
			fullWidth ? "100%" : width || "auto"};
	}
`;

const DatePicker: React.FC<DatePickerProps> = (props) => {
	const {
		value,
		onChange,
		format = DateFormat,
		size,
		bordered,
		className,
		name,
		label,
		required,
		range = false,
		showTime,
		disabledDate,
		suffixIcon,
		prefixIcon,
		separator,
		placeholder,
		allowClear,
		clearIcon,
		labelClassName,
		wrapperClassName,
		errorClassName,
		extralabelclassname,
		extraLabel,
		defaultPickerValue,
		...rest
	} = props;
	const { t } = useTranslation();
	const [currentDate, setCurrentDate] = useState<moment.Moment>();
	const [rangeDate, setRangeDate] = useState();
	useEffect(() => {
		onChange && onChange(currentDate?.format(format));
	}, [currentDate]);

	useEffect(() => {
		onChange && onChange(rangeDate);
	}, [rangeDate]);

	const handleDateChange = (date: any) => {
		if (range) {
			setRangeDate(date);
			return;
		}
		setCurrentDate(date);
	};
	return (
		<DatePickerWrapperStyled className={wrapperClassName ?? ""}>
			{label && (
				<LabelContainer className={labelClassName ?? ""}>
					<Label>
						{label}
						{extraLabel && (
							<span className={extralabelclassname ?? ""}>{extraLabel}</span>
						)}
					</Label>
					{required && <RequiredLabel>{t("Required")}</RequiredLabel>}
				</LabelContainer>
			)}
			{!range ? (
				<ConfigProvider locale={i18next.language === "ja" && jaJP}>
					<AntDatePicker
						className={className}
						size={size === "default" ? null : size}
						bordered={bordered}
						value={value && moment(value, format)}
						format={format}
						showTime={showTime}
						disabledDate={disabledDate}
						onChange={handleDateChange}
						placeholder={placeholder || moment(moment.now()).format(DateFormat)}
						name={name}
						suffixIcon={suffixIcon}
						clearIcon={clearIcon}
						allowClear={allowClear}
						{...rest}
					/>
				</ConfigProvider>
			) : (
				<ConfigProvider locale={i18next.language === "ja" && jaJP}>
					<RangePicker
						allowClear={allowClear}
						className={className}
						size={size === "default" ? null : size}
						bordered={bordered}
						format={format}
						showTime={showTime}
						name={name}
						clearIcon={clearIcon}
						superPrevIcon={prefixIcon}
						suffixIcon={suffixIcon}
						value={value}
						onChange={handleDateChange}
						id={props.id}
						onOpenChange={props.onOpenChange}
						placeholder={[t("Start Date"), t("End Date")]}
						separator={separator}
						defaultValue={defaultPickerValue}
					/>
				</ConfigProvider>
			)}
			<ErrorCounterWrapper className={errorClassName ?? ""}>
				{props.error && <ErrorStyled>{props.error}</ErrorStyled>}
			</ErrorCounterWrapper>
		</DatePickerWrapperStyled>
	);
};

export type { DatePickerProps };

export { DatePicker };
