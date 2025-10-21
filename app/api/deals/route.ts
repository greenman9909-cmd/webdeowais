import axios from "axios";
import { NextResponse } from "next/server";
import { calculateOriginalPrice } from "@/lib/format";

export const revalidate = 60 * 60 * 6;

export async function GET() {
  try {
    const { data } = await axios.get("https://store.steampowered.com/api/featuredcategories");
    const deals = (data?.specials?.items ?? []).map((item: any) => {
      const price = (item.final_price ?? 0) / 100;
      const discount = item.discount_percent ?? 0;
      const originalPrice = calculateOriginalPrice(price, discount);
      return {
        id: item.id,
        name: item.name,
        price,
        discount,
        originalPrice,
        image: item.header_image,
        url: `https://store.steampowered.com/app/${item.id}`,
      };
    });

    return NextResponse.json(deals.filter((deal: any) => deal.discount >= 30));
  } catch (error) {
    console.error("Failed to fetch deals", error);
    return NextResponse.json({ error: "Failed to fetch deals" }, { status: 500 });
  }
}
