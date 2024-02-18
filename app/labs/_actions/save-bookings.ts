"use server"

import { db } from "@/app/_lib/primas";

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
}