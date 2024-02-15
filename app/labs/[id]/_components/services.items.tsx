"use client"
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client"
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
    service: Service
    isAuthenticated?: boolean
}

const ServiceItem = ({ service, isAuthenticated }: ServiceItemProps) => {

    function handleBookingClick () {
        if (!isAuthenticated) {
            signIn("google")
        }

        //TODO: Abri  modal de agendamento
    }
   
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
                            <Button variant="secondary" onClick={handleBookingClick}  >
                                Agendar
                            </Button>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;