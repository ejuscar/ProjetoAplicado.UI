import EnumTipoFluxo from "../../models/enums/enumTipoFluxo";
import { Form, Field } from "react-final-form";
import { SelectModel } from "../../models/components/select.model";
import {
	getDateFromInputString,
	getInputStringFromDate,
} from "../../helpers/dateHelper";
import {
	FluxoCaixaBase,
	FluxoCaixaForm,
} from "../../models/entities/fluxoCaixa";
import { useNavigate, useParams } from "react-router-dom";
import FluxoCaixaService from "../../services/fluxo-de-caixa.service";
import { useEffect, useState } from "react";
import AlertMessage from "../../helpers/alertMessages";

export default function FluxoDeCaixaFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const [form, setForm] = useState<FluxoCaixaForm>({
		categoria: undefined,
		data: getInputStringFromDate(new Date()),
		descricao: undefined,
		numeroParcela: 1,
		observacao: undefined,
		tipo: undefined,
		valor: undefined,
	});

	useEffect(() => {
		if (params.id) {
			const id = params!.id;

			FluxoCaixaService.getById(id).then(
				(response) => {
					if (response.success) {
						const formData: FluxoCaixaForm = {
							...response.data!,
							data: getInputStringFromDate(
								new Date(response.data!.data)
							),
							tipo: response.data!.tipo!.toString(),
						};
						setForm(formData);
					} else AlertMessage.showError(response.errorMessage);
				},
				(error) => {
					AlertMessage.showError(error);
				}
			);
		}
	}, [params]);

	const formTitle = `${params.id ? "Edição" : "Inclusão"} de Fluxo de Caixa`;
	const searchUrlBase = "/fluxo-de-caixa";

	const tiposFluxo: SelectModel[] = [
		{
			description: "Entrada",
			value: EnumTipoFluxo.Entrada,
		},
		{
			description: "Saída",
			value: EnumTipoFluxo.Saida,
		},
	];

	const onSubmit = function (values: FluxoCaixaForm) {
		const { data, tipo } = values;
		const newValues: FluxoCaixaBase = {
			...values,
			data: getDateFromInputString(data)!,
			tipo: +tipo!,
		};

		if (params.id) {
			FluxoCaixaService.put(params.id, newValues).then(
				(response) => {
					if (response.success) {
						navigate(searchUrlBase);
						AlertMessage.showEditSuccess();
					} else AlertMessage.showError(response.errorMessage);
				},
				(error) => {
					AlertMessage.showError(error);
				}
			);
		} else {
			FluxoCaixaService.post(newValues).then(
				(response) => {
					if (response.success) {
						navigate(searchUrlBase);
						AlertMessage.showInsertSuccess();
					} else AlertMessage.showError(response.errorMessage);
				},
				(error) => {
					AlertMessage.showError(error);
				}
			);
		}
	};

	const required = (value: any) =>
		value ? undefined : "* Campo Obrigatório";

	return (
		<>
			<h2 className="title">{formTitle}</h2>
			<div className="container">
				<Form
					initialValues={form}
					onSubmit={onSubmit}
					render={({ handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<div className="row">
								<Field name="tipo" validate={required}>
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<label
												htmlFor="inTipo"
												className="form-label"
											>
												Tipo
											</label>
											<select
												{...input}
												id="inTipo"
												className={`form-select ${
													meta.error && meta.touched
														? "field-error"
														: null
												}`}
											>
												<option value="">
													Selecione
												</option>
												{tiposFluxo.map(
													({
														description,
														value,
													}) => {
														return (
															<option
																key={value}
																value={value}
															>
																{description}
															</option>
														);
													}
												)}
											</select>
											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="categoria">
									{({ input }) => (
										<div className="col-12 col-md-4">
											<label
												htmlFor="inCategoria"
												className="form-label"
											>
												Categoria
											</label>
											<input
												{...input}
												placeholder="Categoria"
												id="inCategoria"
												className="form-control"
											/>
										</div>
									)}
								</Field>

								<Field name="descricao" validate={required}>
									{({ input, meta }) => (
										<div className="col-12 col-md-4">
											<label
												htmlFor="inDescricao"
												className="form-label"
											>
												Descrição
											</label>
											<input
												{...input}
												placeholder="Descrição"
												id="inDescricao"
												className={`form-control ${
													meta.error && meta.touched
														? "field-error"
														: null
												}`}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="valor" validate={required}>
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<label
												htmlFor="inValor"
												className="form-label"
											>
												Valor
											</label>
											<input
												{...input}
												placeholder="Valor"
												id="inValor"
												type="number"
												className={`form-control ${
													meta.error && meta.touched
														? "field-error"
														: null
												}`}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>
							</div>

							<div className="row mt-2">
								<Field name="numeroParcela" validate={required}>
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<label
												htmlFor="inNumeroParcela"
												className="form-label"
											>
												Nº Parcela
											</label>
											<input
												{...input}
												placeholder="Número parcela"
												id="inNumeroParcela"
												type="number"
												className={`form-control ${
													meta.error && meta.touched
														? "field-error"
														: null
												}`}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="data" validate={required}>
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<label
												htmlFor="inData"
												className="form-label"
											>
												Data
											</label>
											<input
												{...input}
												id="inData"
												type="date"
												className={`form-control ${
													meta.error && meta.touched
														? "field-error"
														: null
												}`}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>
							</div>

							<div className="row mt-2">
								<Field name="observacao">
									{({ input }) => (
										<div className="col-12 ">
											<label
												htmlFor="inObservacao"
												className="form-label"
											>
												Observação
											</label>
											<textarea
												{...input}
												placeholder="Observação"
												id="inObservacao"
												className="form-control"
											/>
										</div>
									)}
								</Field>
							</div>

							<div className="w-100 mt-4 d-flex justify-content-center">
								<button
									type="button"
									className="btn btn-secondary w-25 me-4"
									onClick={() => navigate(searchUrlBase)}
								>
									Cancelar
								</button>
								<button
									type="submit"
									className="btn btn-success w-25"
								>
									Salvar
								</button>
							</div>
						</form>
					)}
				/>
			</div>
		</>
	);
}
