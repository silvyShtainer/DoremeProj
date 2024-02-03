import React from 'react';
import classes from './AddContent.module.css';
import { utils } from '../../../general/utils';
import { useForm } from 'react-hook-form';
import { addContent } from '../../../fetchCalls/contentCalls';
import { uploadService } from '../../../general/upload';

export const AddContent = () => {
	const { handleSubmit, register, setValue } = useForm();

	const onSaveContent = async (data, e) => {
		e.preventDefault();
		data.contentCreatedAt = new Date();

		try {
			let file = data.file[0];
			let FileType = file.type.split('/')[1];

			let blob = file.slice(0, file.size, file.type);
			let newFile = new File([blob], `${data.contentName}.${FileType}`);

			data.fileLink = await uploadService.uploadImg(newFile);
			await addContent(data);
		} catch (err) {
			console.log('error! did not add content');
		}
	};

	const onUploadingFile = ({ target }) => {
		setValue('contentSize', `${(target.files[0].size / 1024).toFixed(0)} KB`);
	};

	return (
		<div className={classes.addContent}>
			<form onSubmit={handleSubmit(onSaveContent)} encType='multipart/form-data'>
				<h1>העלאת תכנים</h1>
				<div className={classes.formBody}>
					<div>
						<label>מספר תוכן</label>
						<input disabled {...register('_id')} />
					</div>
					<div>
						<label>סוג תוכן</label>
						<select {...register('contentKind')}>
							<option>תמונה</option>
							<option>סרטון</option>
							<option>מסמך</option>
						</select>
					</div>
					<div>
						<label>גודל תוכן</label>
						<input disabled {...register('contentSize')} />
					</div>
					<div>
						<label>שם תוכן</label>
						<input {...register('contentName')} />
					</div>
					<div>
						<label>תגיות</label>
						<select {...register('contentTag')}>
							{utils.contentKinds().map((kind, index) => {
								return <option key={index}>{kind}</option>;
							})}
						</select>
					</div>
					<div>
						<label>תאריך/זמן יצירה</label>
						<input disabled {...register('contentCreatedAt')} />
					</div>
					<div>
						<label>העלאת קובץ</label>
						<input type='file' {...register('file')} onChange={onUploadingFile} />

						{/* <button className={classes.btnSearch} type='button'>
							חיפוש במחשב
						</button> */}
					</div>
					<button className={classes.btnSave}>שמירה</button>
				</div>
			</form>
		</div>
	);
};
