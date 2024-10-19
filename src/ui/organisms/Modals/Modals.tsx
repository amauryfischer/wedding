import ModalAsteroid from "./specific/ModalAsteroid";
import ModalFight from "./specific/ModalFight"
import ModalFleet from "./specific/ModalFleet/ModalFLeet"
import ModalPirate from "./specific/ModalPirate";
import ModalPlanet from "./specific/ModalPlanet";
import ModalSendPosition from "./specific/ModalSendPosition";
import ModalShip from "./specific/ModalShip";
import ModalUpgradeBuilding from "./specific/ModalUpgradeBuilding"
import ModalPseudo from "./specific/ModalPseudo"

const Modals = () => {
	return (
		<>
			<ModalPlanet />
			<ModalFleet />
			<ModalSendPosition />
			<ModalAsteroid />
			<ModalPirate />
			<ModalShip />
			<ModalFight />
			<ModalUpgradeBuilding />
			<ModalPseudo />
		</>
	)
};

export default Modals;
