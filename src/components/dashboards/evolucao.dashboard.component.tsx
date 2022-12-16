import { Line } from "react-chartjs-2";
import {
	Chart,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from "chart.js";
import { EvolucaoMembrosDashboardModel } from "../../models/components/dashboard.model";
import { MONTHS } from "../../helpers/consts";

interface IEvolucaoDashboardProps extends EvolucaoMembrosDashboardModel {
	year: number;
}

Chart.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

export default function EvolucaoDashboard({
	novosMembros,
	novosVisitantes,
	year,
}: IEvolucaoDashboardProps) {
	const options: ChartOptions<"line"> = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: `Evolução de membros e visitantes em ${year}`,
			},
		},
	};

	const data = {
		labels: MONTHS,
		datasets: [
			{
				label: "Novos Membros",
				data: novosMembros,
				backgroundColor: "rgba(119, 209, 84)",
			},
			{
				label: "Novos Visitantes",
				data: novosVisitantes,
				backgroundColor: "rgba(53, 162, 235)",
			},
		],
	};

	return <Line options={options} data={data} />;
}
