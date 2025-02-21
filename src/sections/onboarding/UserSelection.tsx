import { API_ROUTES } from "@/constants/apiRoutes";
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
interface UserProps {
  id: number;
  name: string;
  email: string;
}

const fetchUsersBySearch = async (query: string) => {
  try {
    const response = await fetch(`${API_ROUTES.USERS.GET}?search=${query}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_ROUTES.USERS.GET}?page=1&per_page=5`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

const UserSelection = ({ field }: { field: any }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    fetchUserHelper();
  }, []);

  const fetchUserHelper = () => {
    setLoading(true);
    fetchUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    if (searchQuery.length > 2) {
      setLoading(true);
      fetchUsersBySearch(searchQuery).then((data) => {
        setUsers(data);
        setLoading(false);
      });
    } else {
      fetchUserHelper();
    }
  }, [searchQuery]);
  return (
    <>
      <Autocomplete
        {...field}
        options={users}
        getOptionLabel={(option: UserProps) => option.name || ""}
        isOptionEqualToValue={(option: UserProps, value) =>
          option.id === value.id
        }
        loading={loading}
        onInputChange={(_, value) => setSearchQuery(value)}
        onChange={(_, selectedUser) => {
          field.onChange(selectedUser);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
};

export default UserSelection;
