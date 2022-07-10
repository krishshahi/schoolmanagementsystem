import React from "react";
import styled from "styled-components";

interface CheckboxProps {
	name?: string;
	label?: string;
	value?: number;
	onChanges?: any;
	classname?: string;
	icon?: "download" | "add" | "none";
}

const Container = styled.div`
	&.btn-default.active,
	.btn-default.active.focus {
		background-color: lightskyblue;
	}

	.btn-group,
	.btn-group-vertical {
		position: relative;
		display: inline-block;
		vertical-align: middle;
	}

	.btn {
		display: inline-block;
		padding: 6px 12px;
		margin-bottom: 0;
		font-size: 14px;
		font-weight: 400;
		line-height: 1.42857143;
		text-align: center;
		white-space: nowrap;
		vertical-align: middle;
		touch-action: manipulation;
		cursor: pointer;
		user-select: none;
		background-image: none;
		border: 1px solid transparent;
		border-radius: 4px;
	}

	.btn-group-sm > .btn {
		padding: 5px 10px;
		font-size: 12px;
		line-height: 1.5;
		border-radius: 3px;
		border: solid 1px #ddd;
	}

	.btn-group > .btn:first-child {
		margin-left: 0;
		border: solid 1px #ddd;
	}

	.btn-default {
		background-color: #f4f4f4;
		color: #444;
		border-color: #ddd;
	}

	[data-toggle="buttons"] > .btn input[type="checkbox"],
	[data-toggle="buttons"] > .btn-group > .btn input[type="checkbox"] {
		visibility: hidden;
		clip: rect(0, 0, 0, 0);
		pointer-events: none;
	}

	.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.set_margin {
		margin-right: 15px;
	}

	.border {
		border-right: unset !important;
	}
`;

const CheckboxButton: React.FC<CheckboxProps> = (props) => {
	const { name, label, value, classname, onChanges } = props;
	const onChange = (checkedValues) => {
		console.log("checked = ", checkedValues);
	};
	return (
		<Container>
			<div
				className={`btn-group btn-group-sm ${classname}`}
				data-toggle={"buttons"}
			>
				{label ? (
					<label className={"btn btn-default"}>
						<input type={"checkbox"} name={name} value={value} />
						{label}
					</label>
				) : (
					<input
						type={"checkbox"}
						name={name}
						value={value}
						onChange={onChange}
					/>
				)}
			</div>
		</Container>
	);
};

export { CheckboxButton };
