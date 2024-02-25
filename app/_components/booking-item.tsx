"use client"

import { Prisma } from "@prisma/client";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog"

import Image from "next/image";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { cancelBooking } from "../_actiions/cancel-booking";
import { toast } from "sonner";
import { useState } from "react";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true;
            laboratory: true;

        };
    }>;
}



const BookingItem = ({ booking }: BookingItemProps) => {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false)

    const isBookingConfirmed = isFuture(booking.date)

    const handleCancelClick = async () => {
        setIsDeleteLoading(true)

        try {
            await cancelBooking(booking.id)
            toast.success("Reserva cancelada com  sucesso!")
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleteLoading(false)
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Card className="min-w-full">
                    <CardContent className=" py-0 px-0 flex  ">
                        <div className="flex flex-col gap-2 py-5 flex-[3] px-5 pl-5">
                            <Badge
                                variant={
                                    isBookingConfirmed ? "default" : "secondary"
                                }
                                className="w-fit">
                                {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                            </Badge>
                            <h2 className="font-bold">{booking.service.name}</h2>
                            <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6" >
                                    <AvatarImage src={booking.laboratory.imageUrl} />
                                </Avatar>
                                <h3 className="text-sm">{booking.laboratory.name}</h3>
                            </div>
                        </div>

                        <div className="flex  flex-col flex-1 items-center justify-center  border-l border-solid border-secondary">
                            <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                                locale: ptBR
                            })}</p>
                            <p className="text-2xl">{format(booking.date, "dd")}</p>
                            <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className="px-0">
                <SheetHeader className=" px-5 text-left pb-6 border-b border-solid border-secondary">
                    <SheetTitle>Informações do agendamento</SheetTitle>
                </SheetHeader>

                <div className="px-5">
                    <div className="relative h-[180px] w-full mt-6">
                        <Image
                            src="/labs-fundo.png"
                            fill
                            alt="fundo"
                        />
                        <div className="w-full absolute  bottom-4 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex items-center gap-2">
                                    <Avatar asChild>
                                        <AvatarImage
                                            src={booking.laboratory.imageUrl}
                                        />
                                    </Avatar>

                                    <div>
                                        <h2 className="">{booking.laboratory.name}</h2>
                                        {/* <h3 className="tex-xs overflow-hidden text-nowrap text-ellipsis"> ==============</h3> */}
                                    </div>

                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <Badge
                        variant={
                            isBookingConfirmed ? "default" : "secondary"
                        }
                        className="w-fit my-3">
                        {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                    </Badge>

                    <Card>
                        <CardContent className="p-3 gap-3 flex flex-col">
                            <div className=" flex items-center justify-center">
                                <h2 className="font-bold">{booking.service.name}</h2>

                            </div>

                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Data</h3>
                                <h4 className="text-sm ">{format(booking.date, "dd 'de' MMMM", {
                                    locale: ptBR
                                })}</h4>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Horário</h3>
                                <h4 className="text-sm " >{format(booking.date, 'hh:mm')}</h4>
                            </div>


                            <div className="flex justify-between">
                                <h3 className="text-gray-400 text-sm">Laboratorio</h3>
                                <h4 className="text-sm ">{booking.laboratory.name}</h4>
                            </div>
                        </CardContent>
                    </Card>
                    <SheetFooter className="flex-row gap-3 mt-6">
                        <SheetClose asChild>
                            <Button variant="secondary" className="w-full">
                                Voltar
                            </Button >
                        </SheetClose>

                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    disabled={!isBookingConfirmed || isDeleteLoading}
                                    variant="destructive"
                                    className="w-full"
                                >

                                    Cancelar reserva
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="w-[90%">
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Deseja mesmo cancelar o agendamento?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Depois de Cancelada, não será posivel reverter essa ação.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="flex-row gap-3">
                                    <AlertDialogCancel className="w-full mt-0">Voltar</AlertDialogCancel>
                                    <AlertDialogAction disabled={isDeleteLoading} onClick={handleCancelClick} className="w-full">
                                        {isDeleteLoading && (
                                            <Loader2 className=" mr-2 h-4 w-4 animate-spin" />
                                        )}
                                        Confirmar
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>

                    </SheetFooter>

                </div>
            </SheetContent>
        </Sheet>
    );
}

export default BookingItem;