import { z, ZodError } from "zod";

export const artworkSchema = z.object({
	artName: z.string().min(3).max(50),
	description: z.string().min(10).max(500),
	category: z
		.string()
		.refine((value) => ["Nature", "Portrait", "Landscape", "Ancient", "Modern", "Oil on Canvas", "Pen and Ink", "Digital Paint"].includes(value), {
			message: "Invalid Category",
		}),
	artClass: z.string().refine((value) => ["Sale", "Auction"].includes(value), {
		message: "Invalid Category",
	}),

	price: z
		.string()
		.refine((value) => parseFloat(value) > 0, { message: "Price must be greater than 0" })
		.refine((value) => !isNaN(parseFloat(value)), { message: "Price must be a number" })
		.transform((value) => parseFloat(value)),
	imageUrl: z.string().url(),
});

export type ArtworkFormData = z.infer<typeof artworkSchema>;
export type ArtworkError = ZodError<ArtworkFormData>;
