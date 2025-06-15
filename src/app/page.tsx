import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
export default function Home() {
  const person = [
    {
      name: "Apple",
      location: "Philippines",
      religion: "Hindu",
      age: 20,
      Height: 170,
      Weight: 60,
      Gender: "Male",
    },
    {
      name: "Orange",
      location: "Philippines",
      religion: "Hindu",
      age: 20,
      Height: 180,
      Weight: 60,
      Gender: "Male",
    },
  ];
  return (
    <div className="justify-center w-full h-screen bg-white p-1">
      <h1 className="text-xl font-bold text-center ">CRUD WITH MONGODB</h1>
      <div className="flex justify-end">
        <Dialog>
          <ScrollArea className="sm:max-w-[500px] sm:max-h-[600px]">
            <form>
              <DialogTrigger asChild>
                <button className="bg-blue-500 text-white  hover:bg-blue-600 border cursor-pointer p-2 rounded-md m-2">
                  Add Person
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] sm:max-h-[700px]">
                <DialogTitle className="text-lg font-bold uppercase text-center">
                  Add Person
                </DialogTitle>
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Location</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Religion</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Age</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Height</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Weight</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Gender</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                  />
                </div>
                <DialogFooter className="space-x-2 items-center justify-center ">
                  <DialogClose className=" border p-1 rounded-md bg-red-600 text-white hover:bg-red-800 px-2">
                    cancel
                  </DialogClose>
                  <Button
                    className="border-2  rounded-md bg-blue-600 text-white hover:bg-blue-800 "
                    type="submit"
                  >
                    Add
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </ScrollArea>
        </Dialog>
      </div>
      <Table className="border border-black rounded-md shadow-md">
        <TableHeader className="bg-yellow-500">
          <TableRow>
            <TableHead className="text-white font-bold uppercase">
              name
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              location
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              religion
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              age
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              Height
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              Weight
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              Gender
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {person.map((item) => (
            <TableRow className="bg-white" key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.location}</TableCell>
              <TableCell>{item.religion}</TableCell>
              <TableCell>{item.age}</TableCell>
              <TableCell>{item.Height}</TableCell>
              <TableCell>{item.Weight}</TableCell>
              <TableCell>{item.Gender}</TableCell>
              <TableCell className=" space-x-2">
                <Button className="bg-blue-500 text-white  hover:bg-blue-600 border cursor-pointer">
                  <Pencil />
                </Button>
                <Button className="bg-red-500  text-white  hover:bg-red-600 border cursor-pointer">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
