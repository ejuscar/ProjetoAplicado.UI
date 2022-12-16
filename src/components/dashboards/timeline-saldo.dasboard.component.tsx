import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { MONTHS } from "../../helpers/consts";
import { TimelineSaldoDashboardModel } from "../../models/components/dashboard.model";

export interface ITimelineSaldoDashboardProps
	extends TimelineSaldoDashboardModel {
	year: number;
}

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

export default function TimelineSaldoDashboard({
	arrecadacoes,
	gastos,
	saldos,
	year,
}: ITimelineSaldoDashboardProps) {
	const options: ChartOptions<"bar"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: `Fluxo de caixa em ${year}`,
			},
			tooltip: {
				callbacks: {
					label: function (tooltipItem) {
						const label = tooltipItem.dataset.label;

						const value = tooltipItem.dataset.data[
							tooltipItem.dataIndex
						] as number;

						return `${label}: ${new Intl.NumberFormat("pt-BR", {
							style: "currency",
							currency: "BRL",
						}).format(value)}`;
					},
				},
			},
		},
	};

	const data = {
		labels: MONTHS,
		datasets: [
			{
				label: "Entradas",
				data: arrecadacoes,
				backgroundColor: "rgba(119, 209, 84, 1)",
			},
			{
				label: "Saídas",
				data: gastos,
				backgroundColor: "rgba(255, 99, 132, 1)",
			},
			{
				label: "Saldo",
				data: saldos,
				backgroundColor: "rgba(53, 162, 235, 1)",
			},
		],
	};
	return <Bar options={options} data={data} />;
}
