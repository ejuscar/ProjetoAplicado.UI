import { Form, Field } from "react-final-form";
import {
	getDateFromInputString,
	getInputStringFromDate,
} from "../../helpers/dateHelper";
import { useNavigate, useParams } from "react-router-dom";
import PessoaService from "../../services/pessoa.service";
import { useEffect, useState } from "react";
import { PessoaForm, PessoaBase } from "../../models/entities/pessoa";
import {
	CheckboxInput,
	DateInput,
	MaskInput,
	SelectInput,
	TextAreaInput,
	TextInput,
} from "../../components/inputs/input";
import {
	estadoCivilSelect,
	funcaoSelect,
	generoSelect,
	tiposPessoaSelect,
	ufSelect,
} from "../../helpers/selectList";
import { cellphoneMask, cepMask, phoneMask } from "../../helpers/masks";
import { Divider } from "@mui/material";

export default function PessoaFormPage() {
	const params = useParams();
	const navigate = useNavigate();
	const [form, setForm] = useState<PessoaForm>({
		nome: "",
		dataNascimento: undefined,
		genero: undefined,
		estadoCivil: undefined,
		telefone: undefined,
		celular: undefined,
		email: undefined,
		nacionalidade: undefined,
		naturalidade: undefined,
		logradouro: undefined,
		numero: undefined,
		complemento: undefined,
		cidade: undefined,
		uF: undefined,
		cep: undefined,
		tipo: undefined,
		ativo: false,
		motivoInatividade: undefined,
		dataBatismo: undefined,
		funcao: undefined,
		dataComparecimento: undefined,
	});

	useEffect(() => {
		if (params.id) {
			const id = params!.id;

			PessoaService.getById(id).then((response) => {
				if (response.success) {
					//prettier-ignore
					let { dataNascimento, dataBatismo, dataComparecimento } = response.data!;

					const formData: PessoaForm = {
						...response.data!,
						dataNascimento:
							dataNascimento !== undefined
								? getInputStringFromDate(
										new Date(dataNascimento)
								  )
								: dataNascimento,
						dataBatismo:
							dataBatismo !== undefined
								? getInputStringFromDate(new Date(dataBatismo))
								: dataBatismo,

						dataComparecimento:
							dataComparecimento !== undefined
								? getInputStringFromDate(
										new Date(dataComparecimento)
								  )
								: dataComparecimento,
						tipo: response.data!.tipo?.toString(),
					};
					setForm(formData);
				}
			});
		}
	}, [params]);

	const formTitle = `${params.id ? "Edição" : "Inclusão"} de Pessoa`;
	const searchUrlBase = "/pessoa";

	const onSubmit = function (values: PessoaForm) {
		const { dataBatismo, dataComparecimento, dataNascimento, tipo } =
			values;
		const newValues: PessoaBase = {
			...values,
			dataBatismo: getDateFromInputString(dataBatismo),
			dataComparecimento: getDateFromInputString(dataComparecimento),
			dataNascimento: getDateFromInputString(dataNascimento),
			tipo: +tipo!,
		};

		if (params.id) {
			PessoaService.put(params.id, newValues).then((response) => {
				if (response.success) {
					navigate(searchUrlBase);
				}
			});
		} else {
			PessoaService.post(newValues).then((response) => {
				if (response.success) {
					navigate(searchUrlBase);
				}
			});
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
							<Divider className="mb-4">
								Informações Pessoais
							</Divider>

							<div className="row">
								<Field name="nome">
									{({ input, meta }) => (
										<div className="col-12 col-md-4">
											<TextInput
												label="Nome"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="dataNascimento">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<DateInput
												label="Data Nascimento"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="genero">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<SelectInput
												label="Gênero"
												name={input.name}
												options={generoSelect}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="estadoCivil">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<SelectInput
												label="Estado Civil"
												name={input.name}
												options={estadoCivilSelect}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="telefone">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<MaskInput
												label="Telefone"
												name={input.name}
												mask={phoneMask}
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

							<div className="row">
								<Field name="celular">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<MaskInput
												label="Celular"
												name={input.name}
												mask={cellphoneMask}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="email">
									{({ input, meta }) => (
										<div className="col-12 col-md-4">
											<TextInput
												label="Email"
												name={input.name}
												type="email"
												placeholder="email@exemplo.com"
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="nacionalidade">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<TextInput
												label="Nacionalidade"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="naturalidade">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<TextInput
												label="Naturalidade"
												name={input.name}
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

							<Divider className="my-4">Endereço</Divider>

							<div className="row">
								<Field name="logradouro">
									{({ input, meta }) => (
										<div className="col-12 col-md-4">
											<TextInput
												label="Logradouro"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="numero">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<TextInput
												label="Número"
												name={input.name}
												type="number"
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="complemento">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<TextInput
												label="Complemento"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="cidade">
									{({ input, meta }) => (
										<div className="col-12 col-md-4">
											<TextInput
												label="Cidade"
												name={input.name}
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

							<div className="row">
								<Field name="uf">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<SelectInput
												label="UF"
												name={input.name}
												options={ufSelect}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="cep">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<MaskInput
												label="CEP"
												name={input.name}
												mask={cepMask}
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

							<Divider className="my-4">
								Dados Eclesiásticos
							</Divider>

							<div className="row">
								<Field name="tipo">
									{({ input, meta }) => {
										return (
											<div className="col-12 col-md-2">
												<SelectInput
													label="Tipo"
													name={input.name}
													options={tiposPessoaSelect}
												/>

												{meta.error && meta.touched && (
													<span className="field-validation-error">
														{meta.error}
													</span>
												)}
											</div>
										);
									}}
								</Field>

								<Field name="funcao">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<SelectInput
												label="Função"
												name={input.name}
												options={funcaoSelect}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="dataBatismo">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<DateInput
												label="Data Batismo"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="dataComparecimento">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<DateInput
												label="Data Comparecimento"
												name={input.name}
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
								<Field name="ativo">
									{({ input, meta }) => (
										<div className="col-12 col-md-2">
											<CheckboxInput
												label="Ativo"
												name={input.name}
											/>

											{meta.error && meta.touched && (
												<span className="field-validation-error">
													{meta.error}
												</span>
											)}
										</div>
									)}
								</Field>

								<Field name="motivoInatividade">
									{({ input, meta }) => (
										<div className="col-12 col-md-12">
											<TextAreaInput
												label="Motivo Inatividade"
												name={input.name}
												hideLabel={true}
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
