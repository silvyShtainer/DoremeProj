import React from 'react';
import classes from './ContentPreview.module.css';
import pdfImg from '../../Icons/pdfImg.jpeg';
import { Link } from 'react-router-dom';

export const ContentPreview = ({ files }) => {
	const RenderContent = ({ file }) => {
		switch (file.contentKind) {
			case 'תמונה':
				return (
					<>
						<img src={file.fileLink} alt={file.contentName} />
						<Link to={file.fileLink} target='_blank' download>
							Download Image
						</Link>
					</>
				);

			case 'סרטון':
				return (
					<video controls width='100%' height='auto'>
						<source src={file.fileLink} type='video/mp4' />
					</video>
				);
			case 'מסמך':
				return (
					<div>
						<img src={pdfImg} alt={file.contentName} />

						<Link to={file.fileLink} target='_blank' download>
							Download PDF
						</Link>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div className={classes.contentPreview}>
			{files.map(file => (
				<div className={classes.contentItem}>
					<h2> {file.contentName} </h2>
					<RenderContent file={file} />
				</div>
			))}
		</div>
	);
};
