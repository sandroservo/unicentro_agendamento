import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation"
import { db } from "../_lib/primas";
import BookingItem from "../_components/booking-item";

const BookingsPage = async () => {

    const session = await getServerSession(authOptions)

    if (!session?.user) {
        //return signIn("google")
        return redirect("/")
    }

    // const confirmedBookings = await db.booking.findMany({
    //     where: {
    //         userId: (session.user as any).id,
    //         date:{
    //             gte:new Date()
    //         }

    //     },
    //     include: {
    //         service: true,
    //         laboratory: true,
    //     },
    // });
    // const fineshedBookings = await db.booking.findMany({
    //     where: {
    //         userId: (session.user as any).id,
    //         date:{
    //             lt:new Date()
    //         }

    //     },
    //     include: {
    //         service: true,
    //         laboratory: true,
    //     },
    // });

    const [confirmedBookings, fineshedBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }

            },
            include: {
                service: true,
                laboratory: true,
            },
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }

            },
            include: {
                service: true,
                laboratory: true,
            },
        })
    ])

    //const confirmedBookings = bookings.filter(booking => isFuture(booking.date))
    //const fineshedBookings = bookings.filter(booking => isPast(booking.date))


    return (
        <>
            <Header />
            <div className="px-5 py-6">
                <h1 className="text-xl font-bold mb-6">Agendamentos</h1>

                {confirmedBookings.length === 0 && (
                    <>
                        <h2 className="text-gray-400 uppercase font-bold text-sm  mb-3" >Confimados</h2>

                        <div className="flex flex-col gap-3">
                            {confirmedBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} />

                            ))}
                        </div>
                    </>

                )}

                {fineshedBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 uppercase font-bold text-sm mt-6 mb-3" >Finalizados</h2>
                        <div className="flex flex-col gap-3">
                            {fineshedBookings.map((booking) => (
                                <BookingItem key={booking.id} booking={booking} />

                            ))}
                        </div>
                    </>
                )}

            </div>
        </>
    );
}

export default BookingsPage;