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
import { useNavigate } from "react-router-dom";
import FluxoCaixaService from "../../services/fluxo-de-caixa.service";

export default function FluxoDeCaixaFormPage() {
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

	const navigate = useNavigate();

	const onSubmit = function (values: FluxoCaixaForm) {
		const { data, tipo } = values;
		const newValues: FluxoCaixaBase = {
			...values,
			data: getDateFromInputString(data),
			tipo: +tipo,
		};

		FluxoCaixaService.post(newValues).then((response) => {
			if (response.success) {
				console.log("Deu bom. Id criado: " + response.data);
				navigate(searchUrlBase);
			}
		});
	};
	const required = (value: any) =>
		value ? undefined : "* Campo Obrigatório";

	return (
		<>
			<h2 className="title">Inclusão de Fluxo de Caixa</h2>
			<div className="container">
				<Form
					initialValues={{
						data: getInputStringFromDate(new Date()),
					}}
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
												defaultValue=""
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
