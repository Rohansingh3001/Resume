import React from "react";

export default function ResumeForm({ formData, setFormData }) {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleListChange = (section, index, key, value) => {
    const updated = [...formData[section]];
    updated[index][key] = value;
    setFormData({ ...formData, [section]: updated });
  };

  const addSectionItem = (section, defaultObj) => {
    setFormData({ ...formData, [section]: [...formData[section], defaultObj] });
  };

  const sectionInput = (section, index, fields) => (
    <div key={index} className="border border-gray-300 p-3 mb-3 space-y-2">
      {fields.map(({ label, key }) => (
        <input
          key={key}
          className="w-full border-b border-gray-400 focus:outline-none py-1 px-2"
          placeholder={label}
          value={formData[section][index][key]}
          onChange={(e) => handleListChange(section, index, key, e.target.value)}
        />
      ))}
    </div>
  );

  const bulletInput = (section, index) => (
    <textarea
      key={"bullets"}
      className="w-full border border-gray-300 focus:outline-none p-2"
      placeholder="• Begin each line with an action verb"
      rows={3}
      value={formData[section][index].bullets}
      onChange={(e) => handleListChange(section, index, "bullets", e.target.value)}
    />
  );

  return (
    <div className="p-6 bg-white space-y-6 font-sans text-[13px] text-[#222] leading-tight overflow-y-auto max-h-[90vh]">
      <h2 className="text-[16px] font-semibold tracking-wide text-[#111] mb-2">Fill Resume Details</h2>

      {/* === Basic Info === */}
      <input
        className="w-full border-b border-gray-400 py-1 px-2"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />

      <input
        className="w-full border-b border-gray-400 py-1 px-2"
        placeholder="Job Title"
        value={formData.title}
        onChange={(e) => handleChange("title", e.target.value)}
      />

      <textarea
        className="w-full border border-gray-300 focus:outline-none p-2"
        placeholder="Professional Summary"
        rows={4}
        value={formData.summary}
        onChange={(e) => handleChange("summary", e.target.value)}
      />
     {/* === Contact Information === */}
<input
  className="w-full border-b border-gray-400 py-1 px-2"
  placeholder="City, State"
  value={formData.location}
  onChange={(e) => handleChange("location", e.target.value)}
/>

<input
  className="w-full border-b border-gray-400 py-1 px-2"
  placeholder="Phone Number (e.g. 000-000-0000)"
  value={formData.phone}
  onChange={(e) => handleChange("phone", e.target.value)}
/>

<input
  className="w-full border-b border-gray-400 py-1 px-2"
  placeholder="Email Address"
  value={formData.email}
  onChange={(e) => handleChange("email", e.target.value)}
/>

<input
  className="w-full border-b border-gray-400 py-1 px-2"
  placeholder="LinkedIn / Portfolio URL (optional)"
  value={formData.link}
  onChange={(e) => handleChange("link", e.target.value)}
/>

      {/* === Experience Section === */}
      <div>
        <label className="text-[13px] text-gray-700">Work Experience</label>
        {formData.experience.map((item, idx) => (
          <div key={idx} className="space-y-2">
            {sectionInput("experience", idx, [
              { label: "Role", key: "role" },
              { label: "Organization", key: "organization" },
              { label: "Location (City, State or Remote)", key: "location" },
              { label: "Duration (e.g. Jan 2023 – Dec 2023)", key: "duration" },
            ])}
            {bulletInput("experience", idx)}
          </div>
        ))}
        <button
          onClick={() =>
            addSectionItem("experience", {
              role: "",
              organization: "",
              location: "",
              duration: "",
              bullets: "",
            })
          }
          className="text-blue-600 text-sm"
        >
          + Add Experience
        </button>
      </div>

      {/* === Education Section === */}
      <div>
        <label className="text-[13px] text-gray-700">Education</label>
        {formData.education.map((item, idx) =>
          sectionInput("education", idx, [
            { label: "Institution", key: "institution" },
            { label: "Degree / Field", key: "degree" },
            { label: "City, State", key: "location" },
            { label: "Graduation Date (e.g. May 2025)", key: "gradDate" },
          ])
        )}
        <button
          onClick={() =>
            addSectionItem("education", {
              institution: "",
              degree: "",
              location: "",
              gradDate: "",
            })
          }
          className="text-blue-600 text-sm"
        >
          + Add Education
        </button>
      </div>

      {/* === Projects Section === */}
      <div>
        <label className="text-[13px] text-gray-700">Projects</label>
        {formData.projects.map((item, idx) =>
          sectionInput("projects", idx, [
            { label: "Project Title", key: "title" },
            { label: "Description", key: "desc" },
          ])
        )}
        <button
          onClick={() => addSectionItem("projects", { title: "", desc: "" })}
          className="text-blue-600 text-sm"
        >
          + Add Project
        </button>
      </div>

      {/* === Other Sections === */}
      <div>
        <label className="text-[13px] text-gray-700">Skills (comma-separated)</label>
        <input
          className="w-full border-b border-gray-400 py-1 px-2"
          placeholder="e.g. JavaScript, Python, React"
          value={formData.skills}
          onChange={(e) => handleChange("skills", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[13px] text-gray-700">Tools & Technologies</label>
        <input
          className="w-full border-b border-gray-400 py-1 px-2"
          placeholder="e.g. Git, Docker, VSCode"
          value={formData.tools}
          onChange={(e) => handleChange("tools", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[13px] text-gray-700">Languages</label>
        <input
          className="w-full border-b border-gray-400 py-1 px-2"
          placeholder="e.g. English, Hindi"
          value={formData.languages}
          onChange={(e) => handleChange("languages", e.target.value)}
        />
      </div>

      <div>
        <label className="text-[13px] text-gray-700">Certifications</label>
        <input
          className="w-full border-b border-gray-400 py-1 px-2"
          placeholder="e.g. AWS Certified, Google UX"
          value={formData.certifications}
          onChange={(e) => handleChange("certifications", e.target.value)}
        />
      </div>
    </div>
  );
}