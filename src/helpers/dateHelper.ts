export function getInputStringFromDate(date: Date) {
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	return `${date.getFullYear()}-${month}-${day}`;
}

export function getDateFromInputString(date: string) {
	const dateParts: string[] = date.split("-");
	return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
}
