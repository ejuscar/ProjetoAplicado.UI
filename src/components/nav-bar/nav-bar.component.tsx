import { MENUS } from "../../routes/menus";
import "./nav-bar.style.css";

function NavBar() {
	return (
		<nav>
			<div id="nav-title">
				<h1>Sistema de Gestão</h1>
			</div>
			<div id="nav-menu">
				<ul id="menu">
					{MENUS.map(({ nomeMenu, linkMenu }, index) => {
						return (
							<li key={index}>
								<a href={linkMenu}>{nomeMenu}</a>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
