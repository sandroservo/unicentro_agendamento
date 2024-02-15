"use client"

import { Button } from "@/app/_components/ui/button";
import { Laboratory } from "@prisma/client";
import { ChevronLeftIcon, MenuIcon, Ratio } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface LaboratoryInfoProps {
    laboratory: Laboratory
}

const LabsInfo = ({ laboratory}: LaboratoryInfoProps) => {

    const router = useRouter()

    function handleBackClick() {
        router.back()
    }

    return (
        <div>
            <div className="h-[250px] w-full relative">
                <Button size="icon" variant="outline" className="z-50 absolute top-4 left-4" onClick={handleBackClick}>
                    <ChevronLeftIcon />
                </Button>

                <Button size="icon" variant="outline" className="z-50 absolute top-4 right-4">
                    <MenuIcon />
                </Button>
                <Image
                    src={laboratory.imageUrl}
                    fill
                    style={{
                        objectFit: "cover"
                    }}
                    alt={laboratory.name}
                    className="opacity-75"
                />
            </div>
            <div className=" px-5 pt-3 pb-6 border-b border-solid border-secondary">
                <div className="flex items-center gap-1">
                    <Ratio size={18} />
                    <h1 className="text-xl font-bold px-5 py-3">{laboratory.name}</h1>
                </div>

            </div>
        </div>
    );
}

export default LabsInfo;