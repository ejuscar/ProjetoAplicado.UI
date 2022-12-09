import { MaskProps } from "react-mask-field";

export const phoneMask: MaskProps = {
	mask: "(__) ____-____",
	replacement: { _: /\d/ },
	showMask: true,
};

export const cellphoneMask: MaskProps = {
	mask: "(__) _____-____",
	replacement: { _: /\d/ },
	showMask: true,
};

export const cepMask: MaskProps = {
	mask: "_____-___",
	replacement: { _: /\d/ },
	showMask: true,
};
