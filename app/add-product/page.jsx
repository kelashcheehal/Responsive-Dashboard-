"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";
import PageTitle from "@/components/pageTitle";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";

export default function AddProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      category: "",
      sku: "",
      stock: "0",
      images: [],
    },
  });

  // Handle image upload with validation
  const handleImageUpload = useCallback(
    (e) => {
      const files = Array.from(e.target.files || []);

      // Validate total count (max 4)
      if (imagePreviews.length + files.length > 4) {
        toast.error("Maximum 4 images allowed");
        return;
      }

      // Process each file
      const newPreviews = [];
      const validFiles = files.filter((file) => {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} is not an image file`);
          return false;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} exceeds 5MB limit`);
          return false;
        }

        return true;
      });

      // Create previews for valid files
      validFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push(reader.result);
          if (newPreviews.length === validFiles.length) {
            setImagePreviews((prev) => [...prev, ...newPreviews]);
          }
        };
        reader.readAsDataURL(file);
      });

      // Update form data
      const currentFiles = form.getValues("images") || [];
      form.setValue("images", [...currentFiles, ...validFiles]);
    },
    [form, imagePreviews.length]
  );

  // Remove image by index
  const removeImage = useCallback(
    (index) => {
      setImagePreviews((prev) => prev.filter((_, i) => i !== index));
      const currentFiles = form.getValues("images");
      form.setValue(
        "images",
        currentFiles.filter((_, i) => i !== index)
      );
    },
    [form]
  );

  // Form submission
  const onSubmit = async (data) => {
    // Validate at least 2 images
    if (imagePreviews.length < 2) {
      toast.error("Please upload at least 2 images");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Log form data including images info
      console.log("Product Data:", {
        ...data,
        images: data.images.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type,
        })),
      });

      toast.success(`${data.name} has been added successfully!`);

      // Reset form
      form.reset();
      setImagePreviews([]);
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <PageTitle title="Add Product" />
      <Toaster />
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Name and Price */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                          autoFocus
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="price"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price ($)*</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          min="0.01"
                          placeholder="0.00"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Description */}
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter detailed product description"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category and SKU */}
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="electronics">
                            Electronics
                          </SelectItem>
                          <SelectItem value="clothing">Clothing</SelectItem>
                          <SelectItem value="home">Home & Kitchen</SelectItem>
                          <SelectItem value="books">Books</SelectItem>
                          <SelectItem value="toys">Toys & Games</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="sku"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU*</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter SKU" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Stock Quantity */}
              <FormField
                name="stock"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity*</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Images */}
              <FormField
                name="images"
                control={form.control}
                render={() => (
                  <FormItem>
                    <FormLabel>Product Images* (2-4 required)</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Upload area */}
                        <div className="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                            onChange={handleImageUpload}
                          />
                          <ImagePlus className="h-10 w-10 text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600 text-center">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            (2-4 images required, 5MB max each)
                          </p>
                        </div>

                        {/* Image previews grid */}
                        {imagePreviews.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {imagePreviews.map((preview, index) => (
                              <div
                                key={index}
                                className="relative aspect-square rounded-md overflow-hidden border group"
                              >
                                <img
                                  src={preview}
                                  alt={`Preview ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-2 right-2 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-label="Remove image"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                {index === 0 && (
                                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                                    Main Image
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Form actions */}
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding Product...
                    </>
                  ) : (
                    "Add Product"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
