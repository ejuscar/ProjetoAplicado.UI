import EnumEstadoCivil from "../enums/enumEstadoCivil";
import EnumFuncao from "../enums/enumFuncao";
import EnumGenero from "../enums/enumGenero";
import EnumTipoPessoa from "../enums/enumTipoPessoa";
import BaseEntity from "./baseEntity";

export default interface Pessoa extends BaseEntity {
	Nome: string;
	DataNascimento: Date | null;
	Genero: EnumGenero;
	EstadoCivil: EnumEstadoCivil | null;
	Telefone: string | null;
	Celular: string | null;
	Email: string | null;
	Nacionalidade: string | null;
	Naturalidade: string | null;
	Logradouro: string | null;
	Numero: number | null;
	Complemento: string | null;
	Cidade: string | null;
	UF: string | null;
	Cep: number | null;
	Tipo: EnumTipoPessoa;
	Ativo: boolean;
	MotivoInatividade: string | null;
	DataBatismo: Date | null;
	Funcao: EnumFuncao;
	DataComparecimento: Date | null;
}
