const easterEgg = ({ methods, guest }) => {
	if (guest?.Nom === "Auriane Fischer") {
		methods.setValue("other", "Je mange pas les trucs mignons")
	}
	if (guest?.Nom === "Ambre Fischer") {
		methods.setValue("other", "Je ne mange pas les carottes cuites")
	}
	if (guest?.Nom === "Sandrine Fischer") {
		methods.setValue("other", "Je suis allergique aux andives cuites")
	}
}

export default easterEgg
