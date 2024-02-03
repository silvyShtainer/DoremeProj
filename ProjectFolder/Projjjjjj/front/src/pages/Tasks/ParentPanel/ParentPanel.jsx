import React, { useContext } from 'react';
import { userContext } from '../../../general/userContext';
import { useEffect } from 'react';

import alex from '../../../Icons/alex.png';
import michaela from '../../../Icons/michaela.png';
import ligal from '../../../Icons/ligal.png';
import noa from '../../../Icons/noa.png';
import noam from '../../../Icons/noam.png';
import roy from '../../../Icons/roy.png';
import { redirect } from 'react-router-dom';

export const ParentPanel = () => {
	const { user } = useContext(userContext);

	// useEffect(() => {
	// 	if (user.job !== 'הורה') redirect('/home')
	// }, [user])

	const getPic = () => {
		switch (user.kindergartenName) {
			case 'הגן של נועם':
				return <img src={noam} alt={user.kindergartenName} />;
			case 'הגן של רוי':
				return <img src={roy} alt={user.kindergartenName} />;
			case 'הגן של נועה':
				return <img src={noa} alt={user.kindergartenName} />;
			case 'הגן של ליגל':
				return <img src={ligal} alt={user.kindergartenName} />;
			case 'הגן של אלכס':
				return <img src={alex} alt={user.kindergartenName} />;
			case 'הגן של מיכאלה':
				return <img src={michaela} alt={user.kindergartenName} />;
			default:
				break;
		}
	};

	return <div>{getPic()}</div>;
};
