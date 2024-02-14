import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Laboratory } from "@prisma/client";
import Image from "next/image";



interface LaboratoryProps {
    laboratory: Laboratory
}


const LabItems = ({ laboratory }: LaboratoryProps) => {
    return (
        <Card className="min-w-[167px] max-w-[167px] rounded-2xl" >
            <CardContent className="p-1 pb-2 ">
                <div className="px-1 h-[159px] relative">
                    <Image
                        alt={laboratory.name}
                        src={laboratory.imageUrl}
                        fill
                        style={{
                                objectFit: "cover"
                            }}
                       className="rounded-2xl"
                    />
                </div>

                <div className="px-3">
                    <h2 className=" mt-2  font-bold overflow-hidden text-ellipsis text-nowrap">{laboratory.name}</h2>
                    <Button className="w-full mt-3" variant="secondary">Agendar</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default LabItems;