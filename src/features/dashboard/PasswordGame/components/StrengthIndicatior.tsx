import { Typography } from "@mui/material"

import { appTheme } from "../../../../theme/style"

interface StrengthIndicatorProps {
	strength: string
}

export const StrengthIndicator = (props: StrengthIndicatorProps) => {
	const { strength } = props
	return (
		<Typography
			variant='h6'
			sx={{
				color: appTheme.colors.text,
				marginTop: "8px",
			}}
		>
			Estimated time to crack: {strength}
		</Typography>
	)
}
