import { useEffect, useState } from "react";
import AtividadeMembrosDashboard from "../components/dashboards/atividade-membros.dashboard.component";
import EvolucaoDashboard from "../components/dashboards/evolucao.dashboard.component";
import TimelineSaldoDashboard from "../components/dashboards/timeline-saldo.dasboard.component";
import AlertMessage from "../helpers/alertMessages";
import {
	AtividadeMembrosDashboardModel,
	EvolucaoMembrosDashboardModel,
	TimelineSaldoDashboardModel,
} from "../models/components/dashboard.model";
import DashboardService from "../services/dashboard.service";

function HomePage() {
	const currentYear = new Date().getFullYear();
	const [year, setYear] = useState(currentYear);
	const lastYears = Array.from({ length: 10 }, (_, i) => currentYear - i);

	//prettier-ignore
	const [atividadeMembros, setAtividadeMembros] = useState<AtividadeMembrosDashboardModel>({
		membrosAtivos: 0,
		membrosInativos: 0,
		total: 0
	});

	//prettier-ignore
	const [evolucaoMembros, setEvolucaoMembros] = useState<EvolucaoMembrosDashboardModel>({
		novosMembros: [],
		novosVisitantes: [],
	});

	//prettier-ignore
	const [timelineSaldo, setTimelineSaldo] = useState<TimelineSaldoDashboardModel>({
		arrecadacoes: [],
		gastos: [],
		saldos: []
	});

	const getAtividadeMembros = () => {
		DashboardService.getAtividadeMembros().then((response) => {
			if (response.success) setAtividadeMembros(response.data!);
			else {
				AlertMessage.showError(response.errorMessage);
			}
		}, AlertMessage.showError);
	};

	const getEvolucaoMembros = (year: number) => {
		DashboardService.getEvolucaoMembrosByYear(year).then((response) => {
			if (response.success) setEvolucaoMembros(response.data!);
			else {
				AlertMessage.showError(response.errorMessage);
			}
		}, AlertMessage.showError);
	};

	const getTimelineSaldo = (year: number) => {
		DashboardService.getTimelineSaldoByYear(year).then((response) => {
			if (response.success) setTimelineSaldo(response.data!);
			else {
				AlertMessage.showError(response.errorMessage);
			}
		}, AlertMessage.showError);
	};

	useEffect(() => {
		getAtividadeMembros();
	}, []);

	useEffect(() => {
		getEvolucaoMembros(year);
		getTimelineSaldo(year);
	}, [year]);

	return (
		<div>
			<div className="row justify-content-md-center">
				<div className="col-12 col-md-2 mb-4 mt-0">
					<label htmlFor="inAno" className="form-label">
						Ano
					</label>
					<select
						id="inAno"
						className="form-select"
						onChange={(e) => setYear(+e.currentTarget.value)}
					>
						{lastYears.map((year) => {
							return (
								<option key={year} value={year}>
									{year}
								</option>
							);
						})}
					</select>
				</div>
			</div>
			<div className="row justify-content-md-around">
				<div className="col-12 col-md-3 app-card text-center">
					<AtividadeMembrosDashboard {...atividadeMembros} />
				</div>
				<div className="col-12 col-md-6 app-card">
					<EvolucaoDashboard {...evolucaoMembros} year={year} />
				</div>
			</div>
			<div className="row justify-content-md-around mt-4 ">
				<div className="col-12 col-md-9 app-card">
					<TimelineSaldoDashboard {...timelineSaldo} year={year} />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
