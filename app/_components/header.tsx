"use client"

import Image from "next/image"
import { Card, CardContent, } from "./ui/card"
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SidesMenu from "./sides-menu";
import Link from "next/link";



const Header = () => {

    return (
        <Card>
            <CardContent className="p-5  justify-between items-center flex flex-row">
                <Link href="/">
                    <Image src="/logo.png" alt="logo agendlabs" height={22} width={180} />
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="h-8 w-8" >
                            <MenuIcon size={18} />
                        </Button >
                    </SheetTrigger>

                    <SheetContent className="p-0">
                        <SidesMenu />
                    </SheetContent>
                </Sheet>

            </CardContent>
        </Card>
    )
}

export default Header;