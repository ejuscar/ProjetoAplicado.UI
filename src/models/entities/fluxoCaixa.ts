import EnumTipoFluxo from "../enums/enumTipoFluxo";
import BaseEntity from "./baseEntity";

export interface FluxoCaixaBase {
	descricao: string;
	tipo: EnumTipoFluxo;
	valor: number;
	categoria: string;
	numeroParcela: number;
	data: Date;
	observacao: string;
}

export interface FluxoCaixaForm extends Omit<FluxoCaixaBase, "data"> {
	data: string;
}

export default interface FluxoCaixa extends BaseEntity, FluxoCaixaBase {}
