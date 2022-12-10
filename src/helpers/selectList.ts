import { SelectModel } from "../models/components/select.model";
import EnumEstadoCivil from "../models/enums/enumEstadoCivil";
import EnumFuncao from "../models/enums/enumFuncao";
import EnumTipoPessoa from "../models/enums/enumTipoPessoa";

export const generoSelect: SelectModel[] = [
	{
		description: "Masculino",
		value: 0,
	},
	{
		description: "Feminino",
		value: 1,
	},
];

export const tiposPessoaSelect: SelectModel[] = [
	{
		description: "Membro",
		value: EnumTipoPessoa.Membro,
	},
	{
		description: "Visitante",
		value: EnumTipoPessoa.Visitante,
	},
];

export const estadoCivilSelect: SelectModel[] = [
	{
		description: "Casado",
		value: EnumEstadoCivil.Casado,
	},
	{
		description: "Divorciado",
		value: EnumEstadoCivil.Divorciado,
	},
	{
		description: "Separado",
		value: EnumEstadoCivil.Separado,
	},
	{
		description: "Solteiro",
		value: EnumEstadoCivil.Solteiro,
	},
	{
		description: "Viúvo",
		value: EnumEstadoCivil.Viuvo,
	},
];

export const ufSelect: SelectModel[] = [
	{ value: "AC" },
	{ value: "AL" },
	{ value: "AP" },
	{ value: "AM" },
	{ value: "BA" },
	{ value: "CE" },
	{ value: "DF" },
	{ value: "ES" },
	{ value: "GO" },
	{ value: "MA" },
	{ value: "MT" },
	{ value: "MS" },
	{ value: "MG" },
	{ value: "PA" },
	{ value: "PB" },
	{ value: "PR" },
	{ value: "PE" },
	{ value: "PI" },
	{ value: "RJ" },
	{ value: "RN" },
	{ value: "RS" },
	{ value: "RO" },
	{ value: "RR" },
	{ value: "SC" },
	{ value: "SP" },
	{ value: "SE" },
	{ value: "TO" },
];

export const funcaoSelect: SelectModel[] = [
	{
		description: "Bispo",
		value: EnumFuncao.Bispo,
	},
	{
		description: "Diácono",
		value: EnumFuncao.Diacono,
	},
	{
		description: "Evangelista",
		value: EnumFuncao.Evangelista,
	},
	{
		description: "Líder",
		value: EnumFuncao.Lider,
	},
	{
		description: "Membro",
		value: EnumFuncao.Membro,
	},
	{
		description: "Missionário",
		value: EnumFuncao.Missionario,
	},
	{
		description: "Pastor",
		value: EnumFuncao.Pastor,
	},
	{
		description: "Presbítero",
		value: EnumFuncao.Presbitero,
	},
];
