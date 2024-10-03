import { Sidebar } from "../../common/components/sidebar/sidebar.tsx"
import { TopBar } from "../../common/components/header/header.tsx"
import React from "react"

const Dashboard: React.FC = () => {
	return (
		<div className='dashboard'>
			<TopBar />
			<div className='dashboard-content'>
				<Sidebar />
				<div className='content'>
					<h1>Dashboard Content</h1>
					{/*  insert the rest of the games here i suppose. */}
				</div>
			</div>
		</div>
	)
}

export default Dashboard
