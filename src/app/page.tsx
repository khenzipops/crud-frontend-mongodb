"use client";
import { useState, useEffect } from "react";
import { fetchPeople } from "@/lib/api";
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
import toast, { Toaster } from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

// User type definition for TypeScript
// Represents the structure of a user/person in the database
type User = {
  _id?: string;
  name: string;
  email: string;
  location: string;
  religion: string;
  age: number;
  height: string;
  weight: string;
  gender: string;
  Created?: string;
};

export default function Home() {
  // State to store the list of people from the database
  const [person, setPerson] = useState<User[]>([]);
  // State to show loading indicator
  const [loading, setLoading] = useState(true);
  // API URL from environment variable
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  // State for the form fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    religion: "",
    height: "",
    weight: "",
    location: "",
    age: "",
    gender: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      religion: "",
      height: "",
      weight: "",
      location: "",
      age: "",
      gender: "",
    });
    setEditingId(null);
  };

  // Fetch people from the API when the component mounts
  useEffect(() => {
    fetchPeople().then((data) => {
      setPerson(data);
      setLoading(false);
    });
  }, []);

  // Handle form submission to add a new person (POST request)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the body with correct types
    const body = {
      ...form,
      age: Number(form.age),
      height: Number(form.height),
      weight: Number(form.weight),
    };
    try {
      // Send POST request to create a new user
      const res = await fetch(
        `${apiUrl}/api/user${editingId ? `/${editingId}` : ""}`,
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        if (res.status === 200 || res.status === 201) {
          // Refresh the list and reset the form
          fetchPeople().then((data) => setPerson(data));
          setForm({
            name: "",
            email: "",
            religion: "",
            height: "",
            weight: "",
            location: "",
            age: "",
            gender: "",
          });
          setEditingId(null);
          setDialogOpen(false); // <-- This closes the dialog
          toast.success("Person successfully added!");
        } else {
          toast.error(data.message || "Failed to add person");
        }
      } else {
        const text = await res.text();
        console.error("Non-JSON response:", text);
        toast.error("Unexpected server response");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form");
    }
  };

  // Handle deleting a person (DELETE request)
  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      // Send DELETE request to remove the user
      const res = await fetch(`${apiUrl}/api/user/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Person deleted!");
        // Refresh the list after deletion
        fetchPeople().then((data) => setPerson(data));
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete person");
      }
    } catch (error) {
      toast.error("Error deleting person");
    }
  };

  // Show loading or no data messages
  if (loading) return <div>Loading...</div>;
  if (!person.length) return <div>No data found or failed to fetch.</div>;

  // Main UI rendering
  return (
    <div className="justify-center w-full h-screen bg-white p-1">
      <h1 className="text-xl font-bold text-center ">CRUD WITH MONGODB</h1>
      {/* Dialog for adding a new person */}
      <div className="flex justify-end">
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              resetForm();
            }
          }}
        >
          {/* Form for adding a new person */}
          <DialogTrigger asChild>
            <button className="bg-blue-500 text-white  hover:bg-blue-600 border cursor-pointer p-2 rounded-md m-2">
              Add Person
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[750px] sm:max-h-[800px]">
            <form onSubmit={handleSubmit}>
              <DialogTitle className="text-lg font-bold uppercase text-center">
                Add Person
              </DialogTitle>
              {/* Form fields for user details */}
              <div className="flex flex-row gap-2 max-w-">
                <div>
                  <label className="text-sm font-medium ">Name</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1 hover:border-blue-500"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Religion</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1
                    "
                    value={form.religion}
                    onChange={(e) =>
                      setForm({ ...form, religion: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2 w-full">
                <div className="flex-1">
                  <label className="text-sm font-medium">Height</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1"
                    value={form.height}
                    onChange={(e) =>
                      setForm({ ...form, height: e.target.value })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium">Weight</label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1"
                    value={form.weight}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Location</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-black p-1"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium">Age</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-black p-1
                    "
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Gender</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-black p-1
                    "
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                />
              </div>
              {/* Dialog footer with Cancel and Add buttons */}
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
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* Table displaying all people from the database */}
      <Table className="border border-black rounded-md shadow-md">
        <TableHeader className="bg-yellow-500">
          <TableRow>
            <TableHead className="text-white font-bold uppercase">
              name
            </TableHead>
            <TableHead className="text-white font-bold uppercase">
              email
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
          {/* Render each person as a table row */}
          {Array.isArray(person) &&
            person.map((details) => (
              <TableRow className="bg-white" key={details._id || details.name}>
                <TableCell>{details.name}</TableCell>
                <TableCell>{details.email}</TableCell>
                <TableCell>{details.location}</TableCell>
                <TableCell>{details.religion}</TableCell>
                <TableCell>{details.age}</TableCell>
                <TableCell>
                  {details.height ? details.height + " " : ""}
                </TableCell>
                <TableCell>
                  {details.weight ? details.weight + " " : ""}
                </TableCell>
                <TableCell>{details.gender}</TableCell>
                <TableCell className=" space-x-2">
                  {/* Edit button (not yet implemented) */}
                  <Button
                    className="bg-blue-500 text-white  hover:bg-blue-600 border cursor-pointer"
                    onClick={() => {
                      setForm({
                        name: details.name,
                        email: details.email,
                        religion: details.religion,
                        height: details.height.toString(),
                        weight: details.weight.toString(),
                        location: details.location,
                        age: details.age.toString(),
                        gender: details.gender,
                      });
                      setEditingId(details._id || null);
                      setDialogOpen(true);
                    }}
                  >
                    <Pencil />
                  </Button>
                  {/* Delete button */}
                  <Button
                    className="bg-red-500  text-white  hover:bg-red-600 border cursor-pointer"
                    onClick={() => handleDelete(details._id)}
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* Toast notifications container */}
      <Toaster />
    </div>
  );
}
