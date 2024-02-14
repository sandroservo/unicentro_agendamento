import { AvatarFallback } from "./ui/avatar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
    return (
        <Card>
            <CardContent className="p-5 py-0 flex  justify-between">
                <div className="flex flex-col gap-2 py-5">
                    <Badge className="bg-[#221C3D] text-primary hover:bg-[#221C3D] w-fit">Confirmado</Badge>
                    <h2 className="font-bold">Aula de importação de dados</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6" >
                            <AvatarImage src="https://utfs.io/f/ce13915d-37ba-4b4f-8107-b3f203f09cd0-1i.jpg" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <h3 className="text-sm"> Laboratorio de informática</h3>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center px-3 border-l border-solid border-secondary">
                    <p className="text-sm">Fevereiro</p>
                    <p className="text-2xl">14</p>
                    <p className="text-sm">09:45</p>
                </div>
            </CardContent>
        </Card>
    );
}

export default BookingItem;