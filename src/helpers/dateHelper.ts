export function getInputStringFromDate(date: Date) {
	return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function getDateFromInputString(date: string) {
	const dateParts: string[] = date.split("-");
	return new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]);
}
