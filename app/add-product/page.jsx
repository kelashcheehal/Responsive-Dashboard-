"use client";

import FormComponent from "@/components/FormComponent";
import PageTitle from "@/components/pageTitle";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters." }),
  price: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  sku: z.string().min(3, { message: "SKU must be at least 3 characters." }),
  stock: z.coerce
    .number()
    .int()
    .nonnegative({ message: "Stock must be a non-negative integer." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  category: z.string({ required_error: "Please select a category." }),
  size: z.string().optional(),
  primaryImage: z
    .any()
    .refine((files) => files?.length > 0, "Primary image is required")
    .refine((files) => files?.[0]?.size <= 5_000_000, "Max file size is 5MB"),
  secondaryImage: z
    .any()
    .optional()
    .refine(
      (files) => !files || files?.[0]?.size <= 5_000_000,
      "Max file size is 5MB"
    ),
});

const productFields = [
  // ... (keep your existing field definitions)
];

export default function AddProductPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      // Upload images to Supabase Storage first
      const primaryImageUrl = await uploadImage(formData.primaryImage[0]);
      const secondaryImageUrl = formData.secondaryImage?.[0]
        ? await uploadImage(formData.secondaryImage[0])
        : null;

      // Insert product data into Supabase
      const { data, error } = await supabase
        .from("products")
        .insert([
          {
            name: formData.name,
            price: formData.price,
            sku: formData.sku,
            stock: formData.stock,
            description: formData.description,
            category: formData.category,
            size: formData.size,
            primary_image_url: primaryImageUrl,
            secondary_image_url: secondaryImageUrl,
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      console.log("Product created:", data);
      router.push("/products"); // Redirect to products page
      router.refresh();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const uploadImage = async (file) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { data, error } = await supabase.storage
      .from("product-images") // Your bucket name
      .upload(filePath, file);

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("product-images").getPublicUrl(filePath);

    return publicUrl;
  };

  return (
    <div className="container">
      <PageTitle title="Add Product" />
      <FormComponent
        schema={productSchema}
        fields={productFields}
        buttonText="Add Product"
        onSubmit={handleSubmit}
      />
    </div>
  );
}
