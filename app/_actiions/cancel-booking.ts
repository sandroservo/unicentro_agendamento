"use server"

import { revalidatePath } from "next/cache"
import { db } from "../_lib/primas"

export const cancelBooking = async (bookingId: string) => {
    await db.booking.delete({
        where:{
            id: bookingId,
        }
    })

    revalidatePath("/");
    revalidatePath("/bookings");
}