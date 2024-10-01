import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"

export const UserWorkspaceRoutesWrapper = () => {
	return (
		<Box
			overflow={"hidden"}
			height={"100vh"}
			sx={{ display: "flex", flexDirection: "column" }}
		>
			<Outlet />
		</Box>
	)
}
