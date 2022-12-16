export function getInputStringFromDate(date: Date | undefined) {
	if (date) {
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		return `${date.getFullYear()}-${month}-${day}`;
	}

	return "";
}

export function getDateFromInputString(date: string | undefined) {
	if (date) {
		const dateParts: string[] = date.split("-");
		return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
	}

	return undefined;
}
