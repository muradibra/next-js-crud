import { products } from "@/data";
import { TProduct } from "@/types";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export function GET() {
  return Response.json({ products });
}

export async function POST(req: NextRequest) {
  const data = await req.json();

  const product: TProduct = {
    id: uuidv4(),
    title: data.title,
    description: data.description,
    price: data.price,
    imageUrl: data.imageUrl,
  };

  // console.log(data);

  products.push(product);
  // console.log(products);

  return Response.json(
    { message: "Product created successfully.", product },
    { status: 201 }
  );
}
