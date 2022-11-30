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
	const required = (value: any) => (value ? undefined : "Required");

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
								<div className="col-12 col-md-2">
									<label
										htmlFor="inTipo"
										className="form-label"
									>
										Tipo
									</label>
									<Field
										name="tipo"
										component="select"
										id="inTipo"
										className="form-select"
										validate={required}
										defaultValue={undefined}
									>
										<option value={undefined}>
											Selecione
										</option>
										{tiposFluxo.map(
											({ description, value }) => {
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
									</Field>
								</div>
								<div className="col-12 col-md-4">
									<label
										htmlFor="inCategoria"
										className="form-label"
									>
										Categoria
									</label>
									<Field
										name="categoria"
										component="input"
										placeholder="Categoria"
										id="inCategoria"
										className="form-control"
									/>
								</div>
								<div className="col-12 col-md-4">
									<label
										htmlFor="inDescricao"
										className="form-label"
									>
										Descrição
									</label>
									<Field
										name="descricao"
										component="input"
										placeholder="Descrição"
										id="inDescricao"
										className="form-control"
									/>
								</div>
								<div className="col-12 col-md-2">
									<label
										htmlFor="inValor"
										className="form-label"
									>
										Valor
									</label>
									<Field
										name="valor"
										component="input"
										placeholder="Valor"
										id="inValor"
										className="form-control"
										type="number"
									/>
								</div>
							</div>

							<div className="row mt-2">
								<div className="col-12 col-md-2">
									<label
										htmlFor="inNumeroParcela"
										className="form-label"
									>
										Nº Parcela
									</label>
									<Field
										name="numeroParcela"
										component="input"
										placeholder="Número parcela"
										id="inNumeroParcela"
										className="form-control"
										type="number"
									/>
								</div>
								<div className="col-12 col-md-2">
									<label
										htmlFor="inData"
										className="form-label"
									>
										Data
									</label>
									<Field
										name="data"
										component="input"
										id="inData"
										className="form-control"
										type="date"
									/>
								</div>
							</div>

							<div className="row mt-2">
								<div className="col-12">
									<label
										htmlFor="inObservacao"
										className="form-label"
									>
										Observação
									</label>
									<Field
										name="observacao"
										component="textarea"
										placeholder="Observação"
										id="inObservacao"
										className="form-control"
									/>
								</div>
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
