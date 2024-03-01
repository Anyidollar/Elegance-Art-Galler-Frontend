import React, { useRef, useState, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { z, ZodError } from "zod";
import axios from "../../Service/axios";
import { Link } from "react-router-dom";
import { arrowLeft, fileupload } from "../../assets/dashboard";
import { toast } from "react-toastify";
import BeatLoader from "react-spinners/BeatLoader";
import { categories } from "./data";

// const categories = ["Nature", "Portrait", "Landscape", "Ancient", "Modern", "Oil on Canvas", "Pen and Ink", "Digital Paint"];

const artworkSchema = z.object({
	artName: z.string().min(1, { message: "Art Name is required" }),
	category: z.string().min(1, { message: "Category is required" }),
	artClass: z.string().min(1, { message: "Art Class is required" }),
	description: z.string().min(1, { message: "Description is required" }),
	price: z
		.number()
		.refine((value) => value > 0, { message: "Price must be greater than 0" })
		.refine((value) => !isNaN(value), { message: "Price must be a number" }),
	imageUrl: z.string().url({ message: "Artwork image is required" }),
});

type ArtworkFormData = z.infer<typeof artworkSchema>;

const UploadArtwork = () => {
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const [myFile, setMyFile] = useState<File | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [data, setData] = useState<ArtworkFormData>({
		artName: "",
		price: 0,
		category: "",
		artClass: "",
		description: "",
		imageUrl: "http://localhost:5000/users/image",
	});
	const [formErrors, setFormErrors] = useState<Record<string, string>>({});

	const handleImageUpload = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			setImage(reader.result as string);
		};
		reader.readAsDataURL(file);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		if (file) {
			handleImageUpload(file);
			setMyFile(file);
		}
	};

	const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			handleImageUpload(file);
			setMyFile(file);
		}
	};

	const preventDefault = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const openFileInput = () => {
		fileInputRef.current?.click();
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			data.price = parseFloat(data.price.toString());

			// Validate using Zod
			artworkSchema.parse(data);

			if (myFile) {
				// Create a FormData object
				const formData = new FormData();
				formData.append("image", myFile);
				const config = {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				};

				// Make a POST request to Cloudinary
				const response = await axios.post(`/users/image`, formData, config);
				console.log("Image upload ", response.data);

				if (response.status === 200) {
					// Extract the Cloudinary URL from the response
					const imageUrl = response.data.imageUrl;
					console.log("imageUrl", imageUrl);

					// Update the imageUrl in the form data
					data.imageUrl = imageUrl;

					const res = await axios.post(`/art/create-Art`, data);
					console.log("artwork Res", res);
					if (res.status == 201) {
						setLoading(false);

						// Clear errors if any
						setFormErrors({});
						if (fileInputRef.current) {
							fileInputRef.current.value = "";
						}
						setData({
							artName: "",
							category: "",
							artClass: "",
							description: "",
							price: 0,
							imageUrl: "",
						});

						toast.success("Artwork Created Successfully");
					} else {
						setLoading(false);
						toast.error("Error Creating Artwork");
					}
				} else {
					setLoading(false);
					// Handle error if the Cloudinary upload fails
					console.error("Error uploading image to Cloudinary");
					setFormErrors({ message: "Error uploading image to Cloudinary" });
				}
			} else {
				// Handle case where there's no image to upload
				setLoading(false);
				console.error("No image selected");
				setFormErrors({ message: "Error uploading image to Cloudinary" });
			}
		
		} catch (error) {
			if (error instanceof ZodError) {
				setLoading(false);

				// Handle Zod validation errors
				const errors: Record<string, string> = {};
				error.errors.forEach((err) => {
					const field = err.path.join(".");
					errors[field] = err.message;
				});
				setFormErrors(errors);
			}
		}
	};


	return (
		<>
			<Link to="/dashboard/showroom">
				<GoBack src={arrowLeft} alt="" />
			</Link>

			<FormContainer onSubmit={handleSubmit}>
				<div>
					<ImageUploadContainer onDrop={handleDrop} onDragOver={preventDefault} onClick={openFileInput}>
						<StyledInput type="file" accept="image/*" onChange={handleFileInputChange} ref={fileInputRef} />
						{image ? (
							<PreviewImage src={image} alt="Uploaded" />
						) : (
							<div>
								<img src={fileupload} alt="" />
								<UploadText>Drop your file here to upload or select from storage </UploadText>
							</div>
						)}
					</ImageUploadContainer>
					{formErrors.message && <ErrorMessage>{formErrors.message}</ErrorMessage>}
				</div>

				<div>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "60px" }}>
						<div>
							<label>
								Art Name:
								<FormInput type="text" name="artName" value={data.artName} onChange={handleChange} placeholder="Name" />
							</label>
							{formErrors.artName && <ErrorMessage>{formErrors.artName}</ErrorMessage>}
						</div>
						<div>
							<label>
								Price:
								<FormInput type="number" name="price" value={data.price} onChange={handleChange} placeholder="100,000.00" />
							</label>
							{formErrors.price && <ErrorMessage>{formErrors.price}</ErrorMessage>}
						</div>
					</div>

					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
						<div>
							<label>
								Category:
								<FormSelect name="category" value={data.category} onChange={handleChange}>
									<option value="" style={{ fontFamily: "monospace", fontSize: "12px", fontWeight: "lighter" }}>
										Select your Category
									</option>
									{categories.map((option, index) => (
										<option key={index} value={option}>
											{option}
										</option>
									))}
								</FormSelect>
							</label>
							{formErrors.category && <ErrorMessage>{formErrors.category}</ErrorMessage>}
						</div>

						<div>
							<label>
								Art Class:
								<FormSelect name="artClass" value={data.artClass} onChange={handleChange}>
									<option value="">Select your Class</option>
									<option value="Auction">Auction</option>
									<option value="Sale">Sale</option>
								</FormSelect>
							</label>
							{formErrors.artClass && <ErrorMessage>{formErrors.artClass}</ErrorMessage>}
						</div>
					</div>

					<div>
						<label>
							Description:
							<FormTextArea
								name="description"
								value={data.description}
								onChange={handleChange}
								rows={7}
								placeholder="Brief description of the Artwork"
							/>
						</label>
						{formErrors.description && <ErrorMessage>{formErrors.description}</ErrorMessage>}
					</div>
					<SubmitButton type="submit" disabled={loading}>
						{loading ? (
							<BeatLoader color="#0000cd" loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader" />
						) : (
							"Upload Artwork"
						)}
					</SubmitButton>
				</div>
			</FormContainer>
		</>
	);
};

export default UploadArtwork;

const GoBack = styled.img`
	margin: 60px 20px 0 60px;
	cursor: pointer;

	@media (max-width: 768px) {
		margin-left: 20px;
	margin-top: 30px;
 	}
 `;

 const FormContainer = styled.form`
	margin: 40px auto;
 	max-width: 90%;
 	display: grid;
 	grid-template-columns: 1fr 1fr;
 	gap: 30px;
 	position: relative;

 	@media (max-width: 768px) {
 		grid-template-columns: 1fr;
 	}
 `;

 const FormInput = styled.input`
 	padding: 10px;
 	border: 1px solid #ddd;
 	border-radius: 5px;
 	width: 100%;
 	margin: 10px 0;
 `;

 const FormTextArea = styled.textarea`
 	padding: 10px;
 	border: 1px solid #ddd;
 	border-radius: 5px;
 	width: 100%;
 	margin: 10px 0;
 `;

 const FormSelect = styled.select`
 	width: 100%;
 	padding: 10px;
 	font-size: 16px;
 	border: 1px solid #ccc;
 	border-radius: 5px;
 	background-color: #fff;
 	cursor: pointer;
 	margin: 10px 0;

	&:hover {
 		border-color: #555;
 	}

 	&:focus {
 		outline: none;
 		border-color: #007bff;
 	}
 `;

 const ErrorMessage = styled.span`
 	color: red;
 	font-size: 12px;
 	margin-bottom: 10px;
 	display: block;
 `;

 const SubmitButton = styled.button`
 	padding: 8px 24px;
 	background-color: #0000cd;
 	color: #fff;
 	border: none;
 	border-radius: 16px;
 	cursor: pointer;
 	position: absolute;
 	right: 0;
 	top: 0;
 	margin-bottom: 20px;

 	&:disabled {
 		background-color: #aaaaaa;
 		cursor: not-allowed;
 	}

 	@media (max-width: 768px) {
 		top: 100%;
 	}
 `;

 const ImageUploadContainer = styled.div`
 	display: flex;
 	flex-direction: column;
 	justify-content: center;
 	align-items: center;
 	border: 2px dashed #aaa;
 	padding: 20px;
 	text-align: center;
 	cursor: pointer;
 	position: relative;
 	overflow: hidden;
 	background-color: #fcfcfd;
 	height: 400px;
 `;

 const StyledInput = styled.input`
 	display: none;
 `;

 const UploadText = styled.p`
 	font-size: 16px;
	color: #555;
 `;

const PreviewImage = styled.img`
	max-width: 100%;
	max-height: 100%;
`;
