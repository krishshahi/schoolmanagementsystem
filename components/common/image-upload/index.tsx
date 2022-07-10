import {
	CloseCircleOutlined,
	DeleteOutlined,
	LoadingOutlined,
	SearchOutlined,
	PaperClipOutlined,
	CameraOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { message, notification, Spin, Upload, Image } from "antd";
import styled from "styled-components";
import { theme } from "../../../theme";
import { useTranslation } from "react-i18next";
import { TextField } from "../text-field";
import { Button } from "../../common";

interface UploadProps {
	height?: string;
	width?: string;
	isDefaultImage?: boolean;
	onChange?: (val: string, fileName: string) => void;
	fileName?: string;
	loading?: boolean;
	hidedelete?: boolean;
	value?: string;
	error?: string;
	required?: boolean;
	label?: string;
	uploadPath?: string;
	wrapperClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	type?: "pdf" | "image";
}

interface IFileProps {
	path?: string;
	name?: string;
}

const ImageContainer = styled.div`
	border: solid 1px #cecece;
	width: 200px;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 250px;
	outline: solid 1px #cecece;
	outline-offset: 2px;
	place-items: center;
	background: #f9f9f9;
	& .circle {
		display: grid;
		height: 40%;
		width: 50%;
		border: dotted 1px #cecece;
		outline: dotted 1px #cecece;
		outline-offset: 2px;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		cursor: pointer;
	}
	& .items {
		display: grid;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		color: #cecece;
	}
	& .camera {
		display: grid;
	}
`;

const UploadWrapper = styled.div``;
const UploadContainer = styled.div`
	.ant-upload.ant-upload-select {
		width: 100%;
	}
	.ant-upload-list {
		display: none;
	}
`;

const FileWrapper = styled.div`
	position: relative;
	margin-top: 3px;
	border: 1px solid ${theme.gray3};
	& .option-wrapper {
		display: flex;
		border-radius: 5px;
		height: 30px;
		align-items: center;
		& .file-upload-input {
			display: flex;
			& input {
				height: 27px;
				background: white;
				border: none;
			}
		}

		& .cmn-btn {
			width: 30px;
			background-color: white;
			color: #444;
			border: 1px solid ${theme.gray3};
			display: flex;
			justify-content: center;
			align-items: center;
			height: 30px;

			& :hover {
				cursor: pointer;
			}

			& > svg {
				height: 16px;
				width: 16px;
				color: ${theme.gray7};
			}
		}

		& .close-button:hover {
			cursor: pointer;
		}
	}

	& .ant-upload-list {
		display: none;
	}
`;

const ImageWrapper = styled.div`
	position: relative;
	margin-top: 3px;
	width: ${({ width }: UploadProps) => {
		return width;
	}};
	height: ${({ height }: UploadProps) => {
		return height;
	}};
	border: 1px solid ${theme.gray3};

	& .option-wrapper {
		display: flex;
		border-radius: 5px;
		height: 30px;

		& .image-upload-input {
			flex: 1;

			& input {
				width: 100%;
				background: ${theme.gray2};
			}
		}

		& .cmn-btn {
			padding: 2px 10px;
			width: 70px;
			font-size: 16px;
			background-color: ${theme.gray2};
			color: #444;
			border: 1px solid ${theme.gray3};

			& :hover {
				cursor: pointer;
			}
		}
	}
	@media (max-width: 768px) {
		width: 100%;
	}

	& .ant-upload-list {
		display: none;
	}

	& .image-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100% - 30px);

		& img {
			width: 550px;
			height: 160px;
		}
	}
`;

const Error = styled.span`
	font-size: 12px;
	color: ${theme.alert};
	margin-top: 2px;
	margin-left: 2px;
`;

const RequiredLabel = styled.div`
	line-height: 20px;
	color: #f5222d;
	min-width: 40px;
	display: flex;
	justify-content: center;
	height: 22px;
	background: #fff1f0;
	border: 1px solid #ffa39e;
	border-radius: 2px;
`;
const LabelContainer = styled.div`
	display: flex;
	margin-bottom: 5px;

	& .label {
		${theme.typography.PackDesc};
		margin-right: 10px;
		color: #5e5c5c;
	}
`;

function getBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const ImageUpload: React.FC<UploadProps> = (props) => {
	const {
		label,
		required,
		value,
		onChange,
		loading = false,
		wrapperClassName,
		labelClassName,
		errorClassName,
		height = "200px",
		width,
		type,
		uploadPath,
		fileName,
	} = props;
	const [file, setFile] = useState<IFileProps | null>(null);
	const [image, setImage] = useState(null);
	const { t } = useTranslation();

	useEffect(() => {
		if (value !== undefined && fileName !== undefined) {
			setFile({
				path:
					value.indexOf("https://") === 0
						? value
						: `${process.env.NEXT_PUBLIC_BUCKET_URL}${value}`,
				name: fileName,
			});
		}
	}, [value, fileName]);
	const handleDeleteClick = () => {
		setFile(null);
	};
	const beforeUpload = (file) => {
		if (type === "pdf") {
			const isPdf = file.type == "application/pdf";
			if (!isPdf) {
				message.error(t("You can only upload PDF file!"));
			}
			const isLt5M = file.size / 1024 / 1024 < 50;
			if (!isLt5M) {
				message.error(t("File must smaller than 50 MB"));
			}
			return isPdf && isLt5M;
		}
		const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
		if (!isJpgOrPng) {
			message.error(t("You can only upload JPG/PNG file!"));
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error(t("Image must smaller than 2MB!"));
		}
		return isJpgOrPng && isLt2M;
	};

	const handleChange = async (info) => {
		if (info.file.status === "done") {
			const bodyFormData = new FormData();
			bodyFormData.append("file", info?.file?.originFileObj);
			bodyFormData.append("path", uploadPath || "allUpload");
			setFile({ path: "", name: info?.file?.name });
			const img = await getBase64(info.file.originFileObj);
			setImage(img);
			// mutate(bodyFormData)
		}
	};

	const onImageChange = (event) => {
		if (event.target.files && event.target.files[0]) {
			let img = event.target.files[0];
			setImage(URL.createObjectURL(img));
		}
	};

	if (type === "pdf") {
		return (
			<UploadWrapper className={wrapperClassName ?? ""}>
				{label && (
					<LabelContainer className={labelClassName ?? ""}>
						<span className={"label"}>{label}</span>
						{required && <RequiredLabel>{t("Required")}</RequiredLabel>}
					</LabelContainer>
				)}

				<FileWrapper className={wrapperClassName ? wrapperClassName : ""}>
					<div className={"option-wrapper"}>
						<Upload
							onChange={handleChange}
							beforeUpload={beforeUpload}
							accept={"application/pdf"}
						>
							<div className={"cmn-btn"}>
								<PaperClipOutlined />
							</div>
						</Upload>

						<TextField
							name={"url"}
							className={"file-upload-input"}
							placeholder={"Browse..."}
							value={file?.name || ""}
						/>
						{
							<Spin
								delay={800}
								// spinning={loading}
								size={"small"}
								indicator={<LoadingOutlined />}
							>
								{file?.path ? (
									<div onClick={handleDeleteClick}>
										<CloseCircleOutlined
											style={{
												fontSize: 16,
												marginRight: 4,
												color: theme.gray5,
											}}
											className={"close-button"}
										/>
									</div>
								) : (
									<></>
								)}
							</Spin>
						}
					</div>
				</FileWrapper>
				{props.error && (
					<Error className={errorClassName ?? ""}>{props.error}</Error>
				)}
			</UploadWrapper>
		);
	}

	return (
		<>
			{type === "image" ? (
				<>
					{image !== null ? (
						<ImageContainer>
							<Image src={image} height="250px" width="195px"></Image>
						</ImageContainer>
					) : (
						<Upload
							onChange={handleChange}
							beforeUpload={beforeUpload}
							accept={"image/png"}
						>
							<ImageContainer>
								<div className="circle">
									<div className="items">
										<div className="camera">
											<CameraOutlined style={{ fontSize: "30px" }} />
										</div>
										<div>{t("Upload")}</div>
									</div>
								</div>
							</ImageContainer>
						</Upload>
					)}
					<UploadContainer>
						<Upload
							onChange={handleChange}
							beforeUpload={beforeUpload}
							accept={"image/png"}
						>
							<Button
								type="primary"
								width="100%"
								background="#d2bc4b"
								margin="10px 0px"
								height="35px"
								bordercolor="transparent"
							>
								{t("Change")}
							</Button>
						</Upload>
					</UploadContainer>
				</>
			) : (
				<UploadWrapper className={wrapperClassName ?? ""}>
					{label && (
						<LabelContainer className={labelClassName ?? ""}>
							<span className={"label"}>{label}</span>
							{required && <RequiredLabel>{t("Required")}</RequiredLabel>}
						</LabelContainer>
					)}

					<ImageWrapper height={height} width={width}>
						<div className={"option-wrapper"}>
							<TextField
								name={"url"}
								className={"image-upload-input"}
								height={"35px"}
								placeholder={"Browse..."}
								value={file?.name || file?.path}
							/>
							<Upload
								onChange={handleChange}
								accept={"image/png, image/jpeg, image/jpg"}
							>
								<div className={"cmn-btn"}>
									<SearchOutlined style={{ fontSize: 16 }} />
									<span>{"Reference"}</span>
								</div>
							</Upload>
							<div className={"cmn-btn"} onClick={handleDeleteClick}>
								<DeleteOutlined style={{ fontSize: 16 }} />
								<span>{"Delete"}</span>
							</div>
						</div>

						<div className={"image-wrapper"}>
							<Spin delay={800}>
								{file?.path ? (
									<img src={file.path} alt={"upload-image"} />
								) : null}
							</Spin>
						</div>
					</ImageWrapper>

					{props.error && (
						<Error className={errorClassName ?? ""}>{props.error}</Error>
					)}
				</UploadWrapper>
			)}
		</>
	);
};

export { ImageUpload };
