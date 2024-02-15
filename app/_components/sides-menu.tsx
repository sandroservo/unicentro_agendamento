"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { CalendarCheck2Icon, HomeIcon, LogInIcon, UserCheck } from "lucide-react";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import Link from "next/link";

const SidesMenu = () => {
    const { data } = useSession()
    const handlerLogoutClick = () => signOut()
    const handlerLoginClick = () => signIn("google")

    return (
        <>
            <SheetHeader className="text-left border-b border-solid border-secundary p-5">
                <SheetTitle>
                    Menu
                </SheetTitle>
            </SheetHeader>

            {data?.user ? (
                <div className="flex justify-between px-5 py-6 items-center">
                    <div className="flex items-center gap-3 ">
                        <Avatar>
                            <AvatarImage src={data.user?.image ?? ""} />
                        </Avatar>

                        <h2 className="font-bold">{data.user.name}</h2>
                    </div>

                    <Button onClick={handlerLogoutClick} variant="secondary" size="icon">
                        <LogInIcon />
                    </Button>
                </div>
            ) : (

                <div className="flex flex-col px-5 py-6 gap-3">
                    <div className="flex items-center gap-3">
                        <UserCheck size={32} />
                        <h2 className="focnt-bold">Olá, faça seu login!</h2>
                    </div>
                    <Button onClick={handlerLoginClick} variant="secondary" className="w-full" >
                        <LogInIcon className="mr-2" size={18} />
                        Fazer Login
                    </Button>
                </div>
            )}

            <div className="flex flex-col gap-3 px-5">
                <Button variant="outline" className="justify-start" asChild>
                    <Link href="/">
                        <HomeIcon size={18} className=" mr-2 " />
                        Início
                    </Link>
                </Button>
                {data?.user && (
                    <Button variant="outline" className="justify-start" asChild>
                        <Link href="/bookings">
                            <CalendarCheck2Icon size={18} className=" mr-2 " />
                            Agendamentos
                        </Link>
                    </Button>
                )}
            </div>
        </>
    );
}

export default SidesMenu;