import { serverFetchAPI } from './apiUtils';

export const getContent = credentials => {
	return serverFetchAPI('content/getContent', 'GET');
};

export const addContent = content => {
	return serverFetchAPI('content/addContent', 'POST', JSON.stringify(content));
};
