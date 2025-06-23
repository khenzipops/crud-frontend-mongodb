export async function fetchPeople() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/user`);
  const json = await res.json();
  return json.data?.users || [];
}
