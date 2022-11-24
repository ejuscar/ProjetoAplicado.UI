import EnumTipoFluxo from "../enums/enumTipoFluxo";
import BaseEntity from "./baseEntity";

export default interface FluxoCaixa extends BaseEntity {
	Descricao: string;
	Tipo: EnumTipoFluxo;
	Valor: number;
	Categoria: string;
	NumeroParcela: number;
	Data: Date;
	Observacao: string;
}
