"use client";

import { useState, useEffect } from "react";
import { useVisitor } from "./VisitorContext";

const EMPTY_FORM = {
  visit_date: "",
  name: "",
  email: "",
  phone: "",
  whom_to_meet: "",
  department_id: "",
  has_appointment: false,
};

export default function VisitorForm() {
  const { editing, setEditing, triggerRefresh } = useVisitor();

  const [form, setForm] = useState(EMPTY_FORM);
  const [departments, setDepartments] = useState([]);
  const [status, setStatus] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/departments"
      ).then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch(() => setStatus({ type: "error", message: "Failed to load departments" }));
  }, []);

  
  useEffect(() => {
    if (editing) {
      setForm({
        visit_date: editing.visit_date.slice(0, 10) ?? "",
        name: editing.name ?? "",
        email: editing.email ?? "",
        phone: editing.phone ?? "",
        whom_to_meet: editing.whom_to_meet ?? "",
        department_id: editing.department_id ?? "",
        has_appointment: editing.has_appointment ?? false,
      });

      setStatus(null);
      console.debug(form);

    }
  }, [editing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const clearForm = () => {
    setForm(EMPTY_FORM);
    setEditing(null);
    setStatus(null);
  }

  const handleAdd = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add visitor");
      setStatus({ type: "success", message: "Visitor added successfully" });
      clearForm();
      triggerRefresh();
    } catch (error) {
      setStatus({ type: "error", message: "Failed to add visitor" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    setStatus(null);
    try {
      const res = await fetch(`/api/visitors/${editing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update visitor");
      setStatus({ type: "success", message: "Visitor updated successfully" });
      clearForm();
      triggerRefresh();
    } catch (error) {
      setStatus({ type: "error", message: "Failed to update visitor" });
    } finally {
      setLoading(false);
    }
  }

  const isEditing = Boolean(editing);

  return (
    <div className="p-4 w-full min-w">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {isEditing ? "Edit Visitor" : "Add Visitor"}
      </h2>

      {status && (
        <div
          className={`mb-4 p-3 rounded ${
            status.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Visit Date</label>
          <input
            type="date"
            name="visit_date"
            value={form.visit_date}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Visitor name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="555-555-5555"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Whom to Meet</label>
          <input
            type="text"
            name="whom_to_meet"
            value={form.whom_to_meet}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Department</label>
          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2"
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="has_appointment"
            checked={form.has_appointment}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-sm font-medium text-gray-700">Has Appointment</label>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleAdd}
          disabled={loading || isEditing}
          className="flex-1 bg-gray-900 hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          Add
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading || !isEditing}
          className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          Update
        </button>
        <button
          onClick={clearForm}
          disabled={loading}
          className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:opacity-40 disabled:cursor-not-allowed text-gray-800 font-medium py-2.5 rounded-lg text-sm transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}