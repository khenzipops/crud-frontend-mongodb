const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const fetchPeople = async () => {
  const res = await fetch(`${apiUrl}/api/user`);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
};

export const createOrUpdatePerson = async (form: any, editingId?: string) => {
  const body = {
    ...form,
    age: Number(form.age),
    height: Number(form.height),
    weight: Number(form.weight),
  };

  const res = await fetch(
    `${apiUrl}/api/user${editingId ? `/${editingId}` : ""}`,
    {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const contentType = res.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const data = await res.json();
    return { status: res.status, data };
  } else {
    throw new Error("Unexpected response format");
  }
};

export const deletePerson = async (id: string) => {
  const res = await fetch(`${apiUrl}/api/user/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message || "Failed to delete person");
  }
};
