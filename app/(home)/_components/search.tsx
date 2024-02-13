"use client"
import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";


const Search = () => {
    return ( 
        <div className="flex items-center gap-4" >
            <Input placeholder="Busque por um Laboratorio" />
            <Button variant="default" >
                <SearchIcon  size={20}/>
            </Button>
        </div>
     );
}
 
export default Search ;

