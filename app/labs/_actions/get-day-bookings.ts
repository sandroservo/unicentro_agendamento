"use server"
import {db} from "@/app/_lib/primas"
import { endOfDay, startOfDay } from "date-fns"



export const getDayBookings =  async (laboratoryId: string, date: Date) => {
    const bookings =  await db.booking.findMany({
        where: {
            laboratoryId,
            date: {
                lte:endOfDay(date),
                gte: startOfDay(date),

            },
        },
    })
    return bookings;
}