"use client";
import { useState, useEffect } from "react";
import {
  fetchPeople,
  createOrUpdatePerson,
  deletePerson,
} from "@/lib/api/people";
import { User } from "@/lib/types";

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

export default function Home() {
  const [person, setPerson] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<User, "_id" | "Created">>({
    name: "",
    email: "",
    religion: "",
    height: "",
    weight: "",
    location: "",
    age: 0,
    gender: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      religion: "",
      height: "",
      weight: "",
      location: "",
      age: 0,
      gender: "",
    });
    setEditingId(null);
  };

  const loadPeople = async () => {
    try {
      const data = await fetchPeople();
      setPerson(data.data.users);
    } catch (err) {
      toast.error("Failed to fetch people");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { status, data } = await createOrUpdatePerson(
        form,
        editingId || undefined
      );

      if (status === 200 || status === 201) {
        toast.success(
          `Person ${editingId ? "updated" : "added"} successfully!`
        );
        resetForm();
        setDialogOpen(false);
        loadPeople();
      } else {
        toast.error(data?.message || "Failed to save person");
      }
    } catch (err) {
      toast.error("Error submitting form");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await deletePerson(id);
      toast.success("Person deleted!");
      loadPeople();
    } catch (err: any) {
      toast.error(err.message || "Error deleting person");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!person.length) return <div>No data found or failed to fetch.</div>;

  return (
    <div className="justify-center w-full h-screen bg-white p-1">
      <h1 className="text-xl font-bold text-center">CRUD WITH MONGODB</h1>

      {/* Add Person Dialog */}
      <div className="flex justify-end">
        <Dialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}
        >
          <DialogTrigger asChild>
            <button className="bg-blue-500 text-white hover:bg-blue-600 border cursor-pointer p-2 rounded-md m-2">
              Add Person
            </button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[750px] sm:max-h-[800px]">
            <form onSubmit={handleSubmit}>
              <DialogTitle className="text-lg font-bold uppercase text-center">
                {editingId ? "Edit Person" : "Add Person"}
              </DialogTitle>

              <div className="flex flex-row gap-2">
                {["name", "email", "religion"].map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-black p-1"
                      value={form[field as keyof typeof form] as string}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-row gap-2">
                {["height", "weight"].map((field) => (
                  <div key={field} className="flex-1">
                    <label className="text-sm font-medium capitalize">
                      {field}
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-md border border-black p-1"
                      value={form[field as keyof typeof form] as string}
                      onChange={(e) =>
                        setForm({ ...form, [field]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>

              {["location", "age", "gender"].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border border-black p-1"
                    value={String(form[field as keyof typeof form])}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                  />
                </div>
              ))}

              <DialogFooter className="space-x-2 items-center justify-center mt-2">
                <DialogClose className="border p-1 rounded-md bg-red-600 text-white hover:bg-red-800 px-2">
                  Cancel
                </DialogClose>
                <Button
                  type="submit"
                  className="border-2 rounded-md bg-blue-600 text-white hover:bg-blue-800"
                >
                  {editingId ? "Update" : "Add"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Table className="border border-black rounded-md shadow-md">
        <TableHeader className="bg-yellow-500">
          <TableRow>
            {[
              "name",
              "email",
              "location",
              "religion",
              "age",
              "height",
              "weight",
              "gender",
              "action",
            ].map((header) => (
              <TableHead
                key={header}
                className="text-white font-bold uppercase"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {person.map((details) => (
            <TableRow className="bg-white" key={details._id}>
              <TableCell>{details.name}</TableCell>
              <TableCell>{details.email}</TableCell>
              <TableCell>{details.location}</TableCell>
              <TableCell>{details.religion}</TableCell>
              <TableCell>{details.age}</TableCell>
              <TableCell>{details.height}</TableCell>
              <TableCell>{details.weight}</TableCell>
              <TableCell>{details.gender}</TableCell>
              <TableCell className="space-x-2">
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-600"
                  onClick={() => {
                    setForm({
                      name: details.name,
                      email: details.email,
                      religion: details.religion,
                      height: details.height,
                      weight: details.weight,
                      location: details.location,
                      age: details.age,
                      gender: details.gender,
                    });
                    setEditingId(details._id ?? null);
                    setDialogOpen(true);
                  }}
                >
                  <Pencil />
                </Button>
                <Button
                  className="bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleDelete(details._id)}
                >
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Toaster />
    </div>
  );
}
