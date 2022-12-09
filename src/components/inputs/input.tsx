import { MaskProps, useMask } from "react-mask-field";
import { SelectModel } from "../../models/components/select.model";

interface InputProps {
	name: string;
	id?: string;
	label: string;
	placeholder?: string;
	type?: string;
	hideLabel?: boolean;
}

interface SelectInputProps extends InputProps {
	options: SelectModel[];
}

interface MaskInputProps extends InputProps {
	mask: MaskProps;
}

export function TextInput({ name, id, label, placeholder, type }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;
	const typeText = type !== undefined ? type : "text";

	return (
		<>
			<label htmlFor={idText} className="form-label">
				{label}
			</label>
			<input
				id={idText}
				name={name}
				placeholder={placeholderText}
				className="form-control"
				type={typeText}
			/>
		</>
	);
}

export function MaskInput({
	name,
	id,
	label,
	placeholder,
	mask,
}: MaskInputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;

	const ref = useMask(mask);

	return (
		<>
			<label htmlFor={idText} className="form-label">
				{label}
			</label>
			<input
				id={idText}
				name={name}
				placeholder={placeholderText}
				className="form-control"
				ref={ref}
			/>
		</>
	);
}

//prettier-ignore
export function TextAreaInput({ name, id, label, placeholder, hideLabel }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;

	return (
		<>
		{ !hideLabel ? (<label htmlFor={idText} className="form-label">
				{label}
			</label>) : null }
			
			<textarea
				id={idText}
				name={name}
				placeholder={placeholderText}
				className="form-control"
			></textarea>
		</>
	);
}

export function SelectInput({ name, id, label, options }: SelectInputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<>
			<label htmlFor={idText} className="form-label">
				{label}
			</label>
			<select id={idText} className="form-select" name={name}>
				<option value="">Selecione</option>
				{options.map(({ description, value }) => {
					return (
						<option key={value} value={value}>
							{description !== undefined ? description : value}
						</option>
					);
				})}
			</select>
		</>
	);
}

export function CheckboxInput({ name, id, label }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<>
			<input
				id={idText}
				name={name}
				type="checkbox"
				className="form-check-input"
			/>
			<label htmlFor={idText} className="form-check-label ms-1">
				{label}
			</label>
		</>
	);
}

export function DateInput({ name, id, label }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<>
			<label htmlFor={idText} className="form-label">
				{label}
			</label>
			<input
				id={idText}
				name={name}
				type="date"
				className="form-control"
			/>
		</>
	);
}
