import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Profile() {

  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [editing, setEditing] =
    useState(false);

  const [form, setForm] = useState({
    phone: "",
    address: "",
  });

  useEffect(() => {

    if (!user) return;

    fetch(
      `/api/employees/${user.id}`
    )
      .then((response) => response.json())
      .then((data) => {

        setProfile(data);

        setForm({
          phone: data.phone || "",
          address: data.address || "",
        });

      })
      .catch(console.error);

  }, [user]);

  const handleSave = async () => {

    const response = await fetch(
      `/api/employees/${user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data =
      await response.json();

    setProfile(data);
    setEditing(false);
  };

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (

    <div className="profile-page">

      <h1>My Profile</h1>

      <div className="profile-card">

        <h2>{profile.name}</h2>

        <p>
          Employee ID:{" "}
          {profile.employeeId}
        </p>

        <p>
          Email: {profile.email}
        </p>

        <p>
          Department:{" "}
          {profile.department}
        </p>

        <p>
          Designation:{" "}
          {profile.designation}
        </p>

        <p>
          Joining Date:{" "}
          {profile.joiningDate}
        </p>

        <hr />

        <label>Phone</label>

        {editing ? (
          <input
            value={form.phone}
            onChange={(event) =>
              setForm({
                ...form,
                phone: event.target.value,
              })
            }
          />
        ) : (
          <p>{profile.phone}</p>
        )}

        <label>Address</label>

        {editing ? (
          <textarea
            value={form.address}
            onChange={(event) =>
              setForm({
                ...form,
                address: event.target.value,
              })
            }
          />
        ) : (
          <p>{profile.address}</p>
        )}

        {editing ? (
          <button onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button
            onClick={() =>
              setEditing(true)
            }
          >
            Edit Profile
          </button>
        )}

      </div>

    </div>
  );
}
