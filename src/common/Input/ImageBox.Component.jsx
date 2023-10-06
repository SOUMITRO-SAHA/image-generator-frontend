import React, { useState } from "react";

const ImageBox = ({ state, setState, className }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setSelectedImage(e.target.result);
				setState(file);
			};
			reader.readAsDataURL(file);
		} else {
			setSelectedImage(null);
		}
	};

	return (
		<div className={`${className} w-full h-full flex justify-center rounded`}>
			<input
				type='file'
				accept='images/*'
				onChange={handleImageChange}
				style={{ display: "none" }}
				id='imageInput'
			/>
			<label htmlFor='imageInput' className='cursor-pointer'>
				{/* After Selection the Image, Image Will display */}
				{selectedImage ? (
					<>
						<img
							src={selectedImage}
							alt='Uploaded'
							className='max-w-full min-w-full object-contain h-auto border-l border-r border-t rounded-t max-h-[600px]'
						/>
						<div className='flex justify-between items-center p-1 border rounded-b'>
							<span className='text-theme2 underline'>{state?.name}</span>
							<span className='bg-slate-400  p-2 rounded text-slate-950 hover:drop-shadow-secondary'>
								Change Image
							</span>
						</div>
					</>
				) : (
					<div className='border-dashed border-2 border-gray-300 p-4 text-center'>
						<p className='text-gray-400'>Click to upload an image</p>
					</div>
				)}
			</label>
		</div>
	);
};

export default ImageBox;
