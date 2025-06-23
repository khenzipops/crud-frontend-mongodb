"use client";
import { useEffect, useState } from "react";
import { fetchPeople } from "@/lib/api/people";
import { User } from "@/lib/types";

export default function CrudPage() {
  // State to hold the list of people fetched from the backend
  const [people, setPeople] = useState<User[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState(true);
  // State to track if there was an error during fetch
  const [error, setError] = useState(false);

  // useEffect runs once when the component mounts
  useEffect(() => {
    // Fetch people from the backend API
    fetchPeople()
      .then((data) => {
        // The backend returns { status, count, data: { users: [...] } }
        setPeople(data.data.users); // Set the people state with the users array
        setError(false); // No error occurred
      })
      .catch(() => setError(true)) // If fetch fails, set error to true
      .finally(() => setLoading(false)); // Loading is done
  }, []);

  // Show loading message while fetching data
  if (loading) return <div>Loading...</div>;
  // Show error message if fetch failed
  if (error) return <div>Failed to fetch data from backend.</div>;
  // Show message if no people are found
  if (!people.length) return <div>No data found.</div>;

  // Render the list of people
  return (
    <div>
      <h1>People</h1>
      <ul>
        {people.map((person) => (
          // Display each person's name in a list item
          <li key={person._id}>{person.name}</li>
        ))}
      </ul>
    </div>
  );
}
