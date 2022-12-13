import { Form } from "react-final-form";
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
import { formatCep, formatTelefone } from "../../helpers/formatHelper";
import EnumTipoPessoa from "../../models/enums/enumTipoPessoa";
import AlertMessage from "../../helpers/alertMessages";

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
		uf: undefined,
		cep: undefined,
		tipo: undefined,
		ativo: true,
		motivoInatividade: undefined,
		dataBatismo: undefined,
		funcao: undefined,
		dataComparecimento: undefined,
	});

	useEffect(() => {
		if (params.id) {
			const id = params!.id;

			PessoaService.getById(id).then(
				(response) => {
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
									? getInputStringFromDate(
											new Date(dataBatismo)
									  )
									: dataBatismo,

							dataComparecimento:
								dataComparecimento !== undefined
									? getInputStringFromDate(
											new Date(dataComparecimento)
									  )
									: dataComparecimento,
							tipo: response.data!.tipo?.toString(),
							genero: response.data!.genero?.toString(),
							estadoCivil: response.data!.estadoCivil?.toString(),
							funcao: response.data!.funcao?.toString(),
							cep: formatCep(response.data!.cep),
							telefone: formatTelefone(
								response.data!.telefone,
								"telefone"
							),
							celular: formatTelefone(
								response.data!.celular,
								"celular"
							),
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

	const formTitle = `${params.id ? "Edição" : "Inclusão"} de Pessoa`;
	const searchUrlBase = "/pessoas";

	const onSubmit = function (values: PessoaForm) {
		const {
			dataBatismo,
			dataComparecimento,
			dataNascimento,
			tipo,
			genero,
			estadoCivil,
			funcao,
			cep,
			telefone,
			celular,
		} = values;
		const newValues: PessoaBase = {
			...values,
			dataBatismo: getDateFromInputString(dataBatismo),
			dataComparecimento: getDateFromInputString(dataComparecimento),
			dataNascimento: getDateFromInputString(dataNascimento),
			tipo: tipo !== undefined ? +tipo : undefined,
			genero: genero !== undefined ? +genero : undefined,
			estadoCivil: estadoCivil !== undefined ? +estadoCivil : undefined,
			funcao: funcao !== undefined ? +funcao : undefined,
			cep: cep !== undefined ? parseInt(cep.replace("-", "")) : undefined,
			telefone: telefone?.replace(/\D/g, ""),
			celular: celular?.replace(/\D/g, ""),
		};

		if (newValues.tipo === EnumTipoPessoa.Membro)
			newValues.dataComparecimento = undefined;
		else {
			newValues.dataBatismo = undefined;
			newValues.funcao = undefined;
		}

		if (params.id) {
			PessoaService.put(params.id, newValues).then(
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
			PessoaService.post(newValues).then(
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

	const required = (value: string | undefined) =>
		value !== undefined && value?.trim() !== ""
			? undefined
			: "* Campo Obrigatório";

	return (
		<>
			<h2 className="title">{formTitle}</h2>
			<div className="container">
				<Form
					initialValues={form}
					onSubmit={onSubmit}
					render={({ handleSubmit, values }) => (
						<form onSubmit={handleSubmit}>
							<Divider className="mb-4">
								Informações Pessoais
							</Divider>

							<div className="row">
								<div className="col-12 col-md-4">
									<TextInput
										label="Nome"
										name="nome"
										validate={required}
									/>
								</div>

								<div className="col-12 col-md-2">
									<DateInput
										label="Data Nascimento"
										name="dataNascimento"
									/>
								</div>

								<div className="col-12 col-md-2">
									<SelectInput
										label="Gênero"
										name="genero"
										options={generoSelect}
									/>
								</div>

								<div className="col-12 col-md-2">
									<SelectInput
										label="Estado Civil"
										name="estadoCivil"
										options={estadoCivilSelect}
									/>
								</div>

								<div className="col-12 col-md-2">
									<MaskInput
										label="Telefone"
										name="telefone"
										mask={phoneMask}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-12 col-md-2">
									<MaskInput
										label="Celular"
										name="celular"
										mask={cellphoneMask}
									/>
								</div>

								<div className="col-12 col-md-4">
									<TextInput
										label="Email"
										name="email"
										type="email"
										placeholder="email@exemplo.com"
									/>
								</div>

								<div className="col-12 col-md-2">
									<TextInput
										label="Nacionalidade"
										name="nacionalidade"
									/>
								</div>

								<div className="col-12 col-md-2">
									<TextInput
										label="Naturalidade"
										name="naturalidade"
									/>
								</div>
							</div>

							<Divider className="my-4">Endereço</Divider>

							<div className="row">
								<div className="col-12 col-md-4">
									<TextInput
										label="Logradouro"
										name="logradouro"
									/>
								</div>

								<div className="col-12 col-md-2">
									<TextInput
										label="Número"
										name="numero"
										type="number"
									/>
								</div>

								<div className="col-12 col-md-2">
									<TextInput
										label="Complemento"
										name="complemento"
									/>
								</div>

								<div className="col-12 col-md-4">
									<TextInput label="Cidade" name="cidade" />
								</div>
							</div>

							<div className="row">
								<div className="col-12 col-md-2">
									<SelectInput
										label="UF"
										name="uf"
										options={ufSelect}
									/>
								</div>

								<div className="col-12 col-md-2">
									<MaskInput
										label="CEP"
										name="cep"
										mask={cepMask}
									/>
								</div>
							</div>

							<Divider className="my-4">
								Dados Eclesiásticos
							</Divider>

							<div className="row">
								<div className="col-12 col-md-2">
									<SelectInput
										label="Tipo"
										name="tipo"
										options={tiposPessoaSelect}
										validate={required}
									/>
								</div>

								{values.tipo ===
								EnumTipoPessoa.Membro.toString() ? (
									<>
										<div className="col-12 col-md-2">
											<SelectInput
												label="Função"
												name="funcao"
												options={funcaoSelect}
												validate={required}
											/>
										</div>

										<div className="col-12 col-md-2">
											<DateInput
												label="Data Batismo"
												name="dataBatismo"
											/>
										</div>
									</>
								) : null}

								{values.tipo ===
								EnumTipoPessoa.Visitante.toString() ? (
									<div className="col-12 col-md-2">
										<DateInput
											label="Data Comparecimento"
											name="dataComparecimento"
										/>
									</div>
								) : null}
							</div>

							<div className="row mt-2">
								<div className="col-12 col-md-2">
									<CheckboxInput label="Ativo" name="ativo" />
								</div>
							</div>

							{!values.ativo ? (
								<div className="row">
									<div className="col-12 col-md-12">
										<TextAreaInput
											label="Motivo Inatividade"
											name="motivoInatividade"
											hideLabel={true}
										/>
									</div>
								</div>
							) : null}

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
