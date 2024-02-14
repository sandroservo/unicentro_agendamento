
import Header from "../_components/header";
import { format } from "date-fns"
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/primas";
import LabItems from "./_components/lab-itens";



export default async function Home() {

  const laboratorys = await db.laboratory.findMany({})

  return (
    <div>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá, Sandro!</h2>
        <p className="capitalize">{format(new Date(), "EEEE',' dd 'de' MMMM", {
          locale: ptBR
        })}</p>
      </div>
      <div className="p-5 mt-6">
        <Search />
      </div>
      <div className="px-5 mt-6">
        <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">agendamento</h2>
        <BookingItem />
      </div>

      <div className="mt-6">
        <h2 className=" px-5 text-xs mb-3 uppercase text-gray-400 font-bold"> Disponiveis </h2>
        
        <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {laboratorys.map((laboratory)=>
            <LabItems key={laboratory.id}laboratory={laboratory} />
          )}
        </div>
      </div>

    </div>

  );
}
