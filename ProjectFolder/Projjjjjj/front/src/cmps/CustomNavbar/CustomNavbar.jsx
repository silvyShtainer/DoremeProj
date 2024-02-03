import React from 'react';
import classes from './CustomNavbar.module.css';
import { NavLink } from 'react-router-dom';

export const CustomNavbar = () => {
	return (
		<div className={classes.navbarContainer}>
			<ul className={classes.mainNavbar}>
				<li>
					<NavLink to='/home/parent-panel'> הורים </NavLink>
				</li>
				<li>
					משימות
					<ul className={classes.nestedBar}>
						<li>
							<NavLink to='/home/add-task'> יצירת משימה </NavLink>
						</li>
						<li>
							<NavLink to='/home/view-task'> צפייה במשימות שלי</NavLink>
						</li>
					</ul>
				</li>
				<li>
					תכנים
					<ul className={classes.nestedBar}>
						<li>
							<NavLink to='/home/add-content'> העלאת תכנים </NavLink>
						</li>
						<li>
							<NavLink to='/home/search-content'> צפייה בתכנים </NavLink>
						</li>
					</ul>
				</li>
				<li>
					<NavLink to='/home/work-plan'> תוכנית עבודה</NavLink>
				</li>
			</ul>
		</div>
	);
};
