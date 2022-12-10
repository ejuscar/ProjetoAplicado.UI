export function formatTelefone(
	number: string | undefined,
	type: "telefone" | "celular"
): string | undefined {
	if (number !== undefined) {
		const maxSize = type === "telefone" ? 10 : 11;
		const newFone = number.padEnd(maxSize, "0");

		const ddd = newFone.substring(0, 2);
		const firstPart = newFone.substring(2, maxSize - 4);
		const secondPart = newFone.substring(maxSize - 4, maxSize);

		return `(${ddd})${firstPart}-${secondPart}`;
	}

	return undefined;
}

export function formatCep(number: number | undefined): string | undefined {
	if (number !== undefined) {
		const newCep = number.toString().padEnd(8, "0");

		const firstPart = newCep.substring(0, 5);
		const secondPart = newCep.substring(5, 8);

		return `${firstPart}-${secondPart}`;
	}

	return undefined;
}
