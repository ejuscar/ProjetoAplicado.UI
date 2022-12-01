import EnumTipoFluxo from "../enums/enumTipoFluxo";
import BaseEntity from "./baseEntity";

export interface FluxoCaixaBase {
	descricao: string | undefined;
	tipo: EnumTipoFluxo | string | undefined;
	valor: number | undefined;
	categoria: string | undefined;
	numeroParcela: number | undefined;
	data: Date;
	observacao: string | undefined;
}

export interface FluxoCaixaForm extends Omit<FluxoCaixaBase, "data"> {
	data: string;
}

export default interface FluxoCaixa extends BaseEntity, FluxoCaixaBase {}
