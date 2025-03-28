"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const FormComponent = ({ schema, fields, buttonText, onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] =
        field.defaultValue || (field.type === "multi-select" ? [] : "");
      return acc;
    }, {}),
  });

  const handleImageChange = useCallback(
    (fieldName, files) => {
      form.setValue(fieldName, files);

      if (files && files.length > 0) {
        const previews = Array.from(files).map((file) => ({
          name: file.name,
          url: URL.createObjectURL(file),
        }));
        setImagePreviews((prev) => ({ ...prev, [fieldName]: previews }));
      } else {
        setImagePreviews((prev) => {
          const newPreviews = { ...prev };
          delete newPreviews[fieldName];
          return newPreviews;
        });
      }
    },
    [form]
  );

  const removeImage = useCallback(
    (fieldName, index) => {
      const currentFiles = form.getValues(fieldName);
      const newFiles = Array.from(currentFiles).filter((_, i) => i !== index);
      form.setValue(fieldName, newFiles);
      handleImageChange(fieldName, newFiles);
    },
    [form, handleImageChange]
  );

  const toggleSize = useCallback((size, field) => {
    const currentSizes = Array.isArray(field.value) ? field.value : [];
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    field.onChange(newSizes);
  }, []);

  async function handleSubmit(data) {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);
      await onSubmit(data);
      // router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">
                          $
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          placeholder="0.00"
                          className="pl-7"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* SKU and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter SKU" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category and Sizes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="home">Home & Kitchen</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sizes</FormLabel>
                    <Popover
                      open={sizeDropdownOpen}
                      onOpenChange={setSizeDropdownOpen}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {field.value?.length > 0
                            ? `${field.value.length} sizes selected`
                            : "Select sizes"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <div className="grid grid-cols-2 gap-2 p-2">
                          {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                            <div
                              key={size}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox
                                id={`size-${size}`}
                                checked={
                                  Array.isArray(field.value) &&
                                  field.value.includes(size)
                                }
                                onCheckedChange={() => toggleSize(size, field)}
                              />
                              <label
                                htmlFor={`size-${size}`}
                                className="text-sm font-medium leading-none"
                              >
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    {Array.isArray(field.value) && field.value.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {field.value.map((size) => (
                          <Badge key={size} variant="secondary">
                            {size}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Image Uploads with Previews - Now in one line */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <FormField
                control={form.control}
                name="primaryImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer p-2 bg-muted/50 hover:bg-muted">
                          <label
                            htmlFor="primaryImage"
                            className="w-full h-full flex flex-col items-center justify-center"
                          >
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, WEBP (MAX. 5MB)
                            </p>
                            <Input
                              id="primaryImage"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleImageChange(
                                  "primaryImage",
                                  e.target.files
                                )
                              }
                            />
                          </label>
                        </div>
                        {imagePreviews.primaryImage && (
                          <div className="grid grid-cols-2 gap-2">
                            {imagePreviews.primaryImage.map(
                              (preview, index) => (
                                <div
                                  key={index}
                                  className="relative aspect-square"
                                >
                                  <img
                                    src={preview.url}
                                    alt={preview.name}
                                    className="h-full w-full object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() =>
                                      removeImage("primaryImage", index)
                                    }
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryImages"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Images</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg p-2 cursor-pointer bg-muted/50 hover:bg-muted">
                          <label
                            htmlFor="secondaryImages"
                            className="w-full h-full flex flex-col items-center justify-center"
                          >
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PNG, JPG, WEBP (MAX. 5MB each)
                            </p>
                            <Input
                              id="secondaryImages"
                              type="file"
                              accept="image/*"
                              multiple
                              className="hidden"
                              onChange={(e) =>
                                handleImageChange(
                                  "secondaryImages",
                                  e.target.files
                                )
                              }
                            />
                          </label>
                        </div>
                        {imagePreviews.secondaryImages && (
                          <div className="grid grid-cols-2 gap-2">
                            {imagePreviews.secondaryImages.map(
                              (preview, index) => (
                                <div
                                  key={index}
                                  className="relative aspect-square"
                                >
                                  <img
                                    src={preview.url}
                                    alt={preview.name}
                                    className="h-full w-full object-cover rounded-md"
                                  />
                                  <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={() =>
                                      removeImage("secondaryImages", index)
                                    }
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Submitting...
                </>
              ) : (
                buttonText
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FormComponent;
