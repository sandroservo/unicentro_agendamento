import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/primas";
import { ChevronLeftIcon, MenuIcon, Ratio } from "lucide-react";
import Image from "next/image";
import LabsInfo from "../_components/labs-info";

interface LabsDatailPageProps {
    params: {
        id?: string
    }
}
const LabsDatailPage = async ({ params }: LabsDatailPageProps) => {

    if (!params.id) {
        // TODO: redirecionar pra home page
        return null;
    }

    const laboratory = await db.laboratory.findUnique({
        where: {
            id: params.id,
        }
    });

    if (!laboratory) {
        // TODO: redirecionar pra home page
        return null;
    }

    return (
        <LabsInfo laboratory={laboratory}  />
    )
}

export default LabsDatailPage;