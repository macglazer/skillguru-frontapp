// Libraries
import React from 'react';
import classNames from 'classnames';
// Icons
import Pen from '../../assets/icons/Pen';
// Styles
import styles from './ImageUpload.module.scss';
// Types
import { Common } from 'src/types/main';

interface ImageUploadProps extends Common{
	src: string;
	changeHandler: (url: string) => any;
}

const ImageUpload = (props: ImageUploadProps) => {
	const {src, changeHandler, classes} = props;

	return (
		<div className={classNames(styles.profileImage, classes)}>
			<div className={classNames(styles.profileImageImage, 'profile-image__preview')}>
				<img src={src} alt='Zdjęcie profilowe' />
			</div>
			<label className={styles.profileImageInput}>
				<span className={styles.profileImageInputLabel}>
					<Pen />
				</span>
				<input
					type='file'
					name='profile-image'
					id='profile-image'
					accept='.jpg, .jpeg, .png, .webp, .svg'
					onChange={(e) => {
						const file = e.target.files?.[0]; // Null check added here
						if (file) {
							changeHandler(URL.createObjectURL(file));
						}
					}}
				/>
			</label>
		</div>
	);
};

export default ImageUpload;
