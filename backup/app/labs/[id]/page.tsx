import { db } from "@/app/_lib/primas";
import LabsInfo from "./_components/labs-info";
import ServiceItem from "./_components/services.items";


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
        },
        include :{
            services:true
        }
    });

    if (!laboratory) {
        // TODO: redirecionar pra home page
        return null;
    }

    return (
        <div >
            <LabsInfo laboratory={laboratory} />

            <div className="px-5 flex flex-col gap-4 py-6">
                {laboratory.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
            ))}
            </div>
            
        </div>
    )
}

export default LabsDatailPage;