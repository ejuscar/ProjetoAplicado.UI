import {
	ArcElement,
	Chart,
	ChartData,
	ChartOptions,
	Legend,
	Tooltip,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { AtividadeMembrosDashboardModel } from "../../models/components/dashboard.model";

interface IAtividadeMembrosDashboardProps
	extends AtividadeMembrosDashboardModel {}
Chart.register(ArcElement, Tooltip, Legend);

export default function AtividadeMembrosDashboard({
	membrosAtivos,
	membrosInativos,
}: IAtividadeMembrosDashboardProps) {
	const options: ChartOptions<"pie"> = {
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: `Atividade dos membros`,
			},
		},
	};

	const data: ChartData<"pie", number[], unknown> = {
		labels: ["Membros ativos", "Membros inativos"],
		datasets: [
			{
				data: [membrosAtivos, membrosInativos],
				backgroundColor: [
					"rgba(75, 192, 192, 1)",
					"rgba(255, 99, 132, 1)",
				],
			},
		],
	};
	return <Pie data={data} options={options} />;
}
