import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TProduct } from "@/types";
import { ProductModal } from "../modal";
import { ProductDeleteAction } from "../delete-action";
import Image from "next/image";

type Props = {
  products: TProduct[];
};

export const ProductTable = ({ products }: Props) => {
  return (
    <Table>
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Product ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="w-[120px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.id}</TableCell>
            <TableCell>
              {product.imageUrl && (
                <div className="w-10 h-10 relative">
                  <Image src={product.imageUrl} alt="Product" fill={true} />
                </div>
              )}
            </TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">${product.price}</TableCell>
            <TableCell className="flex gap-3">
              <ProductModal type="update" editedProduct={product} />
              <ProductDeleteAction id={product.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
