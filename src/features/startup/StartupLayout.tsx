import { ReactNode } from "react"
import { Container, useTheme } from "@mui/material"

import { LogoTitle } from "../../common/components/branding/LogoTitle"

/**
 * Wrapper for all startup pages to maintain consistent styling and provide logo, title, and copyright
 */

interface Props {
	title: string
	children: ReactNode
	hideProgressBar?: boolean
}

export const StartupLayout = ({ children, title }: Props) => {
	const theme = useTheme()

	return (
		<Container
			maxWidth='md'
			component='main'
			sx={{
				marginTop: theme.spacing(4),
				marginLeft: 4,
				overflow: "hidden",
			}}
		>
			<LogoTitle title={title} />
			{children}
		</Container>
	)
}
