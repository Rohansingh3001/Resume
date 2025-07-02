// src/components/ResumePreview.jsx
import React, { forwardRef } from "react";

const sectionTitleStyle =
  "uppercase text-[14px] font-semibold tracking-wide text-[#333] mb-1 border-b border-gray-300 pb-1";

const ResumePreview = forwardRef(({ formData }, ref) => {
  return (
    <div
      ref={ref}
      className="w-[794px] min-h-[1123px] p-10 bg-white text-[#222] font-sans text-[12px] leading-[1.6]"
      style={{ fontFamily: "Calibri, sans-serif" }}
    >
      {/* === HEADER === */}
      <div className="mb-4">
        <h1 className="text-[22px] font-bold">{formData.name || "FIRSTNAME LASTNAME"}</h1>
        <p className="text-[14px] text-[#444] font-medium">
          {formData.title || "Your Job Title"}
        </p>
        <p className="text-sm text-[#555]">
  {formData.location} | {formData.phone} | {formData.email}
  {formData.link && <> | <a href={formData.link} className="text-blue-700 underline">{formData.link}</a></>}
</p>
      </div>

      {/* === SUMMARY === */}
      {formData.summary && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Summary</h2>
          <p className="whitespace-pre-line">{formData.summary}</p>
        </div>
      )}

      {/* === EDUCATION === */}
      {formData.education?.length > 0 && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Education</h2>
          {formData.education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{edu.institution}</p>
              <p className="text-sm">
                {edu.location} | {edu.gradDate}
              </p>
              <p className="text-sm">{edu.degree}</p>
            </div>
          ))}
        </div>
      )}

      {/* === EXPERIENCE === */}
      {formData.experience?.length > 0 && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Experience</h2>
          {formData.experience.map((exp, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{exp.organization} | {exp.role}</p>
              <p className="text-sm">{exp.location} | {exp.duration}</p>
              {exp.bullets && (
                <ul className="list-disc list-inside text-sm mt-1">
                  {exp.bullets.split("\n").map((line, i) => (
                    <li key={i}>{line.trim()}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* === PROJECTS === */}
      {formData.projects?.length > 0 && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Projects</h2>
          {formData.projects.map((proj, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-semibold">{proj.title}</p>
              <p className="text-sm whitespace-pre-line">{proj.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* === SKILLS === */}
      {formData.skills && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Skills</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.skills.split(",").map((skill, i) => (
              <li key={i}>{skill.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* === TOOLS === */}
      {formData.tools && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Tools & Technologies</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.tools.split(",").map((tool, i) => (
              <li key={i}>{tool.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* === LANGUAGES === */}
      {formData.languages && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Languages</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.languages.split(",").map((lang, i) => (
              <li key={i}>{lang.trim()}</li>
            ))}
          </ul>
        </div>
      )}

      {/* === CERTIFICATIONS === */}
      {formData.certifications && (
        <div className="mb-4">
          <h2 className={sectionTitleStyle}>Certifications</h2>
          <ul className="list-disc list-inside text-sm">
            {formData.certifications.split(",").map((cert, i) => (
              <li key={i}>{cert.trim()}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default ResumePreview;
