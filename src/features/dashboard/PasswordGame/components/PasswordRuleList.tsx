import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import ListItemIcon from "@mui/material/ListItemIcon"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import { Fade } from "@mui/material"
import { useTheme } from "@mui/material/styles"
import { Rule } from "../constants"

interface RuleListProps {
	rules: Rule[]
}

const RuleList: React.FC<RuleListProps> = ({ rules }) => {
	const theme = useTheme() // Access the theme

	// Sort rules: incomplete rules first (red), completed rules later (green)
	const sortedRules = [...rules].sort((a, b) => Number(a.met) - Number(b.met))

	return (
		<List
			sx={{
				width: "100%",
				maxWidth: "calc(100% - 20px)", // Adjust width
				ml: theme.spacing(-3), // Adjust left margin based on theme spacing
				paddingLeft: 0, // Remove default padding
			}}
		>
			{sortedRules.map((rule) => {
				if (!rule.revealed) return null // Only render revealed rules

				// Use the darker green for met rules and red for unmet rules
				const bgColor = rule.met
					? theme.palette.success.dark
					: theme.palette.error.light

				return (
					<Fade in={true} timeout={1200} key={rule.id}>
						<Box sx={{ width: "100%" }}>
							<ListItem sx={{ mb: theme.spacing(2), padding: 0 }}>
								<Box
									sx={{
										backgroundColor: bgColor, // Use dark green or red depending on the rule's status
										padding: theme.spacing(2),
										borderRadius: theme.shape.borderRadius, // Rounded corners from theme
										width: "100%",
										boxShadow: theme.shadows[2], // Use theme shadow
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
											sx={{ color: theme.palette.text.primary }}
										>
											{`Rule ${rule.id}`}
										</Typography>
									</Box>

									{/* Instructions or the body of the rule */}
									<Typography
										variant='body1'
										sx={{
											color: theme.palette.text.primary,
											mt: theme.spacing(1),
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
