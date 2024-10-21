import { products } from "@/data";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description, price } = await req.json();
    if (!title || !description || !price) {
      return Response.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const updatedProduct = products.find((product) => product.id === params.id);

    if (!updatedProduct) {
      return Response.json({ error: "Product not found." }, { status: 404 });
    }

    updatedProduct.title = title;
    updatedProduct.description = description;
    updatedProduct.price = price;

    return Response.json({
      message: "Product updated successfully.",
      updatedProduct,
    });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const productIdx = products.findIndex((product) => product.id === id);
  if (productIdx === -1) {
    return Response.json({ error: "Product not found." }, { status: 404 });
  }

  const product = products.splice(productIdx, 1)[0];
  return Response.json({ message: "Product deleted successfully.", product });
}
