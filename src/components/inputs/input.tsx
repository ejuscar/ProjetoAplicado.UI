import { FieldValidator } from "final-form";
import { Field } from "react-final-form";
import { MaskProps, useMask } from "react-mask-field";
import { SelectModel } from "../../models/components/select.model";

interface InputProps {
	name: string;
	id?: string;
	label: string;
	placeholder?: string;
	type?: string;
	hideLabel?: boolean;
	validate?: FieldValidator<any>;
}

interface SelectInputProps extends InputProps {
	options: SelectModel[];
}

interface MaskInputProps extends InputProps {
	mask: MaskProps;
}

export function TextInput({
	name,
	id,
	label,
	placeholder,
	type,
	validate,
}: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;
	const typeText = type !== undefined ? type : "text";

	return (
		<Field name={name} id={idText} type={typeText} validate={validate}>
			{({ input, meta }) => (
				<>
					<label htmlFor={idText} className="form-label">
						{label}
					</label>
					<input
						{...input}
						placeholder={placeholderText}
						className={`form-control ${
							meta.error && meta.touched ? "field-error" : null
						}`}
					/>

					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}

export function MaskInput({
	name,
	id,
	label,
	placeholder,
	mask,
	validate,
}: MaskInputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;

	const ref = useMask(mask);

	return (
		<Field name={name} id={idText} validate={validate}>
			{({ input, meta }) => (
				<>
					<label htmlFor={idText} className="form-label">
						{label}
					</label>
					<input
						{...input}
						className={`form-control ${
							meta.error && meta.touched ? "field-error" : null
						}`}
						placeholder={placeholderText}
						ref={ref}
					/>

					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}

export function TextAreaInput({
	name,
	id,
	label,
	placeholder,
	hideLabel,
	validate,
}: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;
	const placeholderText = placeholder !== undefined ? placeholder : label;

	return (
		<Field name={name} id={idText} validate={validate}>
			{({ input, meta }) => (
				<>
					{!hideLabel ? (
						<label htmlFor={idText} className="form-label">
							{label}
						</label>
					) : null}
					<textarea
						{...input}
						placeholder={placeholderText}
						className={`form-control ${
							meta.error && meta.touched ? "field-error" : null
						}`}
					></textarea>

					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}

export function SelectInput({
	name,
	id,
	label,
	options,
	validate,
}: SelectInputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<Field name={name} id={idText} validate={validate}>
			{({ input, meta }) => (
				<>
					<label htmlFor={idText} className="form-label">
						{label}
					</label>
					<select
						{...input}
						className={`form-select ${
							meta.error && meta.touched ? "field-error" : null
						}`}
					>
						<option value="">Selecione</option>
						{options.map(({ description, value }) => {
							return (
								<option key={value} value={value}>
									{description !== undefined
										? description
										: value}
								</option>
							);
						})}
					</select>
					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}

export function CheckboxInput({ name, id, label, validate }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<Field name={name} id={idText} type="checkbox" validate={validate}>
			{({ input, meta }) => (
				<>
					<input
						{...input}
						className={`form-check-input ${
							meta.error && meta.touched ? "field-error" : null
						}`}
					/>
					<label htmlFor={idText} className="form-check-label ms-1">
						{label}
					</label>

					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}

export function DateInput({ name, id, label, validate }: InputProps) {
	const idText = id !== undefined ? id : `in${name}`;

	return (
		<Field name={name} id={idText} type="date" validate={validate}>
			{({ input, meta }) => (
				<>
					<label htmlFor={idText} className="form-label">
						{label}
					</label>
					<input
						{...input}
						className={`form-control ${
							meta.error && meta.touched ? "field-error" : null
						}`}
					/>

					{meta.error && meta.touched && (
						<span className="field-validation-error">
							{meta.error}
						</span>
					)}
				</>
			)}
		</Field>
	);
}
