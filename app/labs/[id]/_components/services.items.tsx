"use client"
import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/app/_components/ui/sheet";
import { generateDayTimeList } from "@/app/_helpers/hours";
import { Booking, Laboratory, Service } from "@prisma/client"
import { ptBR } from "date-fns/locale";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { format, setMinutes, setHours } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { saveBooking } from "../../_actions/save-bookings";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../../_actions/get-day-bookings";


interface ServiceItemProps {
    laboratory: Laboratory
    service: Service
    isAuthenticated: boolean
}

const ServiceItem = ({ service, isAuthenticated, laboratory }: ServiceItemProps) => {
    const router = useRouter()
    const { data } = useSession();

    const [date, setDate] = useState<Date | undefined>(undefined)
    const [thour, setTHours] = useState<string | undefined>()
    const [loading, setLoading] = useState(false)
    const [sheetIsOpen, setSheetIsOpen] = useState(false)
    const [dayBookings, setDayBookings] = useState<Booking[]>([])

    useEffect(() => {
        if (!date) {
            return
        }

        const refreshAvailableHours = async () => {
            const _dayBookings = await getDayBookings(date)

            setDayBookings(_dayBookings)
        };
        refreshAvailableHours();
    }, [date])


    function handleDateClick(date: Date | undefined) {
        setDate(date);
        setTHours(undefined)
    }


    function handleHoursClick(time: string) {
        setTHours(time)
    }

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google")

        }
        //TODO: Abri  modal de agendamento
    }

    const handleBookingSubmit = async () => {
        setLoading(true)

        try {
            if (!thour || !date || !data?.user) {
                return
            }

            const dateHour = Number(thour.split(':')[0])
            const dateMinutes = Number(thour.split(':')[1])

            const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

            await saveBooking({
                serviceId: service.id,
                laboratoryId: laboratory.id,
                date: newDate,
                userId: (data.user as any).id,
            });
            setSheetIsOpen(false)

            ///não deixa data marcada
            setTHours(undefined)
            setDate(undefined)

            toast("Agendamento realizado com suscesso", {
                description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
                    locale: ptBR
                }),
                action: {
                    label: "Visualizar",
                    onClick: () => router.push('/bookings')
                }
            })
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    }

    const timeList = useMemo(() => {
        //return date ? generateDayTimeList(date) : []
        if (!date) {
            return []
        }
        return generateDayTimeList(date).filter(time => {

            const timeHours = Number(time.split(':')[0])
            const timeMinutes = Number(time.split(':')[1])

            const booking = dayBookings.find(booking => {
                const bookingHours = booking.date.getHours()
                const bookingMInutes = booking.date.getMinutes()

                return bookingHours === timeHours && bookingMInutes === timeMinutes

            })
            if (!booking) {
                return true
            }

            return false
        })
        }, [date,  dayBookings])
    
        return (
            <Card>
                <CardContent className="p-3 w-full">
                    <div className="flex gap-4 items-center w-full">
                        <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                            <Image
                                className="rounded-lg"
                                src={service.imageUrl}
                                fill
                                style={{
                                    objectFit: "contain"
                                }}
                                alt={service.name}
                            />
                        </div>
                        <div className="flex flex-col w-full ">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm text-gray-400">{service.description}</p>

                            <div className="flex items-center justify-end mt-3 ">
                                <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="secondary" onClick={handleBookingClick}  >
                                            Agendar
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="p-0">
                                        <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secundary">
                                            <SheetTitle>Fazer Reserva</SheetTitle>
                                        </SheetHeader>

                                        <div className="py-6">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={handleDateClick}
                                                fromDate={new Date()}
                                                locale={ptBR}
                                                styles={{
                                                    head_cell: {
                                                        width: "100%",
                                                        textTransform: "capitalize"
                                                    },
                                                    cell: {
                                                        width: "100%",
                                                    },
                                                    button: {
                                                        width: "100%",
                                                    },
                                                    nav_button_previous: {
                                                        width: "fit-content",
                                                    },
                                                    nav_button_next: {
                                                        width: "32",
                                                        height: "32p"
                                                    },
                                                    caption: {
                                                        textTransform: "capitalize"
                                                    }
                                                }}
                                            />

                                        </div>
                                        {date && (
                                            <div className="flex gap-3 overflow-x-auto py-6 px-5 border-t border-solid border-secundary [&::-webkit-scrollbar]:hidden">
                                                {timeList.map((time) => (
                                                    <Button
                                                        onClick={() => handleHoursClick(time)}
                                                        key={time}
                                                        variant={thour === time ? "default" : "outline"}
                                                        className="rounded-full">
                                                        {time}
                                                    </Button>
                                                ))}
                                            </div>
                                        )}
                                        <div className="py-6 px-5 border-t border-solid border-secondary">
                                            <Card>
                                                <CardContent className="p-3 gap-3 flex flex-col">
                                                    <div className=" flex items-center justify-center">
                                                        <h2 className="font-bold">{service.name}</h2>

                                                    </div>
                                                    {date && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400 text-sm">Data</h3>
                                                            <h4 className="text-sm ">{format(date, "dd 'de' MMMM", {
                                                                locale: ptBR
                                                            })}</h4>
                                                        </div>
                                                    )}
                                                    {thour && (
                                                        <div className="flex justify-between">
                                                            <h3 className="text-gray-400 text-sm">Horário</h3>
                                                            <h4 className="text-sm " >{thour}</h4>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between">
                                                        <h3 className="text-gray-400 text-sm">Laboratorio</h3>
                                                        <h4 className="text-sm ">{laboratory.name}</h4>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                        <SheetFooter className="px-5">
                                            <Button onClick={handleBookingSubmit} disabled={!thour || !date || loading}>
                                                {loading && <Loader2 className=" mr-2 h-4 w-4 animate-spin" />}
                                                Confirma reserva
                                            </Button>
                                        </SheetFooter>

                                    </SheetContent>
                                </Sheet>

                            </div>

                        </div>

                    </div>
                </CardContent>
            </Card>
        );
    }

export default ServiceItem;