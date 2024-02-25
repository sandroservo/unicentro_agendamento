"use server"

import { db } from "@/app/_lib/primas";
import { revalidatePath } from "next/cache";

interface SaveBookingParams{
    laboratoryId: string;
    serviceId: string;
    userId: string
    date: Date;

}

export const saveBooking = async (params:SaveBookingParams) => {
    await db.booking.create({
        data:{
            serviceId: params.serviceId,
            userId: params.userId,
            date: params.date,
            laboratoryId: params.laboratoryId
        }

    })

    revalidatePath("/")
    revalidatePath("/bookings")
}