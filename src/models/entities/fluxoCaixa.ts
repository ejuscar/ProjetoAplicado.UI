import EnumTipoFluxo from "../enums/enumTipoFluxo";
import BaseEntity from "./baseEntity";

export default interface FluxoCaixa extends BaseEntity {
	descricao: string;
	tipo: EnumTipoFluxo;
	valor: number;
	categoria: string;
	numeroParcela: number;
	data: Date;
	observacao: string;
}
