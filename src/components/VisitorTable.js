"use client";

import { useState, useEffect } from "react";
import { useVisitor } from "./VisitorContext";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";

export default function VisitorTable() {
  const { setEditing, refresh, triggerRefresh } = useVisitor();
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState();

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: 30px 80px 10rem 15rem 8rem 12rem 10rem 90px 80px 90px;
      `,
        BaseCell: `
        padding: 0.5rem 0;
        border-bottom: 1px solid #e5e7eb;
      `,
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/visitors")
      .then((res) => res.json())
      .then((data) => setVisitors(data))
      .catch((error) => setStatus({ type: "error", message: error.message }))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this visitor?")) return;

    try {
      const res = await fetch(`/api/visitors/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete visitor");
      triggerRefresh();
    } catch (error) {
      setStatus({ type: "error", message: "Failed to delete visitor" });
    }
  };

  if (loading) return <p>Loading...</p>;
  if (status?.type === "error") return <p className="text-red-500">{status.message}</p>;
  if (visitors.length === 0) return <p>No visitors found.</p>;

  const data = { nodes: visitors.map((v) => ({ ...v, id: String(v.id) })) };

  return (
    <Table data={data} theme={theme} layout={{ custom: true, horizontalScroll: true }}>
      {(tableList) => (
        <>
          <Header>
            <HeaderRow>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Visit Date</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Email</HeaderCell>
              <HeaderCell>Phone</HeaderCell>
              <HeaderCell>Who?</HeaderCell>
              <HeaderCell>Dept</HeaderCell>
              <HeaderCell>Has Appt?</HeaderCell>
              <HeaderCell>Actions</HeaderCell>
              <HeaderCell></HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.id} item={item}>
                <Cell>{item.id}</Cell>
                <Cell>{new Date(item.visit_date).toLocaleDateString()}</Cell>
                <Cell>{item.name}</Cell>
                <Cell>{item.email}</Cell>
                <Cell>{item.phone}</Cell>
                <Cell>{item.whom_to_meet}</Cell>
                <Cell>{item.department_name}</Cell>
                <Cell>{item.has_appointment ? "Yes" : "No"}</Cell>
                <Cell>
                  <button
                    onClick={() => setEditing(item)}
                    className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                  >
                    Edit
                  </button>
                </Cell>
                    
                <Cell>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </Cell>
              </Row>
            ))}
          </Body>
        </>
      )}
    </Table>
  );
}
