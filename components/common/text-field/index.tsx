import React, { useCallback } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { theme } from "../../../theme";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

export interface TextFieldProps {
	placeholder?: string;
	type?: string;
	onChange?: any;
	className?: any;
	value?: any;
	disabled?: boolean;
	prefix?: React.ReactNode;
	rows?: number;
	fullWidth?: boolean;
	width?: string;
	height?: string;
	showCounting?: boolean;
	maxLength?: number;
	borderColor?: string;
	bgcolor?: string;
	color?: string;
	error?: any;
	name?: string;
	placeholdercolor?: string;
	label?: string;
	labelClassName?: string;
	addonBefore?: string;
	required?: boolean;
	onBlur?: (
		event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
}

const InputStyled = styled(Input)`
	height: ${({ height }: TextFieldProps) => height || "35px"};
	background-color: ${({ bgcolor }) => bgcolor || "white"};
	border: ${({ borderColor }: TextFieldProps) =>
		`1px solid ${borderColor || theme.grey}`};
	width: ${({ width, fullWidth }: TextFieldProps) =>
		fullWidth ? "100%" : width || "auto"};
	border-radius: 3px;
	::placeholder {
		color: ${({ placeholdercolor }) => placeholdercolor && placeholdercolor};
	}
	position: relative;
`;
const PasswordStyled = styled(Input.Password)`
	height: ${({ height }: TextFieldProps) => height || "35px"};
	background-color: ${({ bgcolor }: TextFieldProps) =>
		bgcolor || "#f6f6f9 !important"};
	border: ${({ borderColor }: TextFieldProps) =>
		`1px solid ${borderColor || theme.grey}`};
	width: ${({ width, fullWidth }: TextFieldProps) =>
		fullWidth ? "100%" : width || "auto"};
	border-radius: 3px;
	::placeholder {
		color: ${({ placeholdercolor }) => placeholdercolor && placeholdercolor};
	}
	position: relative;
`;

const ErrorStyled = styled.span`
	font-size: 12px;
	color: ${theme.alert};
	margin-top: 2px;
	margin-left: 2px;
`;

const CountingStyled = styled.div<{ isRed: boolean }>`
	font-size: 12px;
	color: ${({ isRed }) => isRed && theme.alert};
`;

const ErrorCounterWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 2px;
`;

const TextFieldWrapperStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: ${({ width, fullWidth }: TextFieldProps) =>
		fullWidth ? "100%" : width || "100%"};
`;

const LabelContainer = styled.div`
	display: flex;
	margin-bottom: ${({ required }: TextFieldProps) =>
		required ? "0px" : "5px"};
`;

const Label = styled.div`
	${theme.typography.PackDesc};
	margin-right: 5px;
	color: #5e5c5c;
`;

const RequiredLabel = styled.div`
	color: #f5222d;
	border-radius: 2px;
`;

const TextField: React.FC<TextFieldProps> = (props) => {
	const {
		showCounting,
		value,
		maxLength,
		type,
		rows,
		className,
		label,
		required,
		prefix,
		labelClassName,
		...rest
	} = props;
	const { TextArea } = Input;
	const countingUI = useCallback(() => {
		return (
			showCounting && (
				<CountingStyled isRed={value?.length >= (maxLength ? maxLength : 0)}>
					{`${value ? Number(value.length).toLocaleString() : 0}/${
						maxLength && maxLength.toLocaleString()
					}`}
				</CountingStyled>
			)
		);
	}, [value, maxLength]);

	const textFieldUI = () => {
		switch (type) {
			case "password":
				return (
					<TextFieldWrapperStyled className={className} width={props.width}>
						{label && (
							<LabelContainer className={labelClassName ?? ""}>
								<Label>{label}</Label>
								{required && <RequiredLabel>{"*"}</RequiredLabel>}
							</LabelContainer>
						)}
						<PasswordStyled
							{...rest}
							prefix={prefix}
							iconRender={(visible) =>
								visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
							}
							type="password"
						/>
						<ErrorCounterWrapper>
							{countingUI()}
							{props.error ? <ErrorStyled>{props.error}</ErrorStyled> : <div />}
						</ErrorCounterWrapper>
					</TextFieldWrapperStyled>
				);
			case "textarea":
				return (
					<TextFieldWrapperStyled className={className} width={props.width}>
						{label && (
							<LabelContainer className={labelClassName ?? ""}>
								<Label>{label}</Label>
								{required && <RequiredLabel>{"*"}</RequiredLabel>}
							</LabelContainer>
						)}
						<InputStyled
							as={TextArea}
							value={value}
							autoSize={{ minRows: rows }}
							placeholder={props.placeholder}
							maxLength={maxLength}
							{...rest}
						/>
						<ErrorCounterWrapper>
							{props.error ? <ErrorStyled>{props.error}</ErrorStyled> : <div />}
							{countingUI()}
						</ErrorCounterWrapper>
					</TextFieldWrapperStyled>
				);
			case "number":
				return (
					<TextFieldWrapperStyled className={className} width={props.width}>
						{label && (
							<LabelContainer className={labelClassName ?? ""}>
								<Label>{label}</Label>
								{required && <RequiredLabel>{"*"}</RequiredLabel>}
							</LabelContainer>
						)}
						<InputStyled
							prefix={prefix}
							value={value}
							maxLength={maxLength}
							{...rest}
						/>
						<ErrorCounterWrapper>
							{props.error ? <ErrorStyled>{props.error}</ErrorStyled> : <div />}
							{countingUI()}
						</ErrorCounterWrapper>
					</TextFieldWrapperStyled>
				);

			default:
				return (
					<TextFieldWrapperStyled className={className} width={props.width}>
						{label && (
							<LabelContainer className={labelClassName ?? ""}>
								<Label>{label}</Label>
								{required && <RequiredLabel>{"*"}</RequiredLabel>}
							</LabelContainer>
						)}
						<InputStyled
							prefix={prefix}
							value={value}
							maxLength={maxLength}
							{...rest}
						/>
						<ErrorCounterWrapper>
							{props.error ? <ErrorStyled>{props.error}</ErrorStyled> : <div />}
							{countingUI()}
						</ErrorCounterWrapper>
					</TextFieldWrapperStyled>
				);
		}
	};
	return textFieldUI();
};

export { TextField };
