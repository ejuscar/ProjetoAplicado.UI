import EnumEstadoCivil from "../enums/enumEstadoCivil";
import EnumFuncao from "../enums/enumFuncao";
import EnumGenero from "../enums/enumGenero";
import EnumTipoPessoa from "../enums/enumTipoPessoa";
import BaseEntity from "./baseEntity";

export interface PessoaBase {
	nome: string;
	dataNascimento: Date | undefined;
	genero: EnumGenero | string | undefined;
	estadoCivil: EnumEstadoCivil | string | undefined;
	telefone: string | undefined;
	celular: string | undefined;
	email: string | undefined;
	nacionalidade: string | undefined;
	naturalidade: string | undefined;
	logradouro: string | undefined;
	numero: number | undefined;
	complemento: string | undefined;
	cidade: string | undefined;
	uF: string | undefined;
	cep: number | undefined;
	tipo: EnumTipoPessoa | string | undefined;
	ativo: boolean;
	motivoInatividade: string | undefined;
	dataBatismo: Date | undefined;
	funcao: EnumFuncao | string | undefined;
	dataComparecimento: Date | undefined;
}

//prettier-ignore
export interface PessoaForm extends Omit<PessoaBase, "dataNascimento" | "dataBatismo"| "dataComparecimento"> {
	dataNascimento: string | undefined;
	dataBatismo: string | undefined;
	dataComparecimento: string | undefined;
}

export default interface Pessoa extends BaseEntity, PessoaBase {}
