import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ListItemIcon from "@mui/material/ListItemIcon"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { Fade } from "@mui/material"

import { Rule } from "../constants"
import { appTheme } from "../../../../theme/style"

interface RuleListProps {
	rules: Rule[]
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
	const sortedRules = [...rules].sort((a, b) => Number(a.met) - Number(b.met))
	const PADDING = "16px"

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: "calc(100% - 20px)",
				ml: "-24px",
				paddingLeft: 0,
			}}
		>
			{sortedRules.map((rule) => {
				if (!rule.revealed) return null

				const bgColor = rule.met
					? appTheme.colors.success.dark
					: appTheme.colors.error

				return (
					<Fade in={true} timeout={1200} key={rule.id}>
						<Box sx={{ width: "100%" }}>
							<ListItem sx={{ mb: PADDING, padding: 0 }}>
								<Box
									sx={{
										backgroundColor: bgColor,
										padding: PADDING,
										borderRadius: "4px",
										width: "100%",
										boxShadow:
											"0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)",
										transition: "background-color 0.3s",
									}}
								>
									{/* Title: X Rule 1 or ✓ Rule 1 */}
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<ListItemIcon>
											{rule.met ? (
												<CheckIcon color='success' />
											) : (
												<CloseIcon color='error' />
											)}
										</ListItemIcon>
										<Typography
											variant='h6'
											sx={{ color: appTheme.colors.primary }}
										>
											{`Rule ${rule.id}`}
										</Typography>
									</Box>

									{/* Instructions or the body of the rule */}
									<Typography
										variant='body1'
										sx={{
											color: appTheme.colors.primary,
											mt: "8px",
										}}
									>
										{rule.text}
									</Typography>
								</Box>
							</ListItem>
						</Box>
					</Fade>
				)
			})}
		</List>
	)
}

export default RuleList
