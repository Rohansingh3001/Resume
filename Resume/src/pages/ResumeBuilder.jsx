import React, { useState } from 'react';
import { Plus, Minus, Download, Eye, Save, User, GraduationCap, Briefcase, Award, Phone, Mail, MapPin, Globe } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState({
    // Personal Info
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    linkedin: '',
    portfolio: '',
    
    // Education
    education: [{
      institution: '',
      degree: '',
      field: '',
      graduationMonth: '',
      graduationYear: '',
      location: '',
      gpa: '',
      honors: '',
      coursework: '',
      awards: ''
    }],
    
    // Experience
    experience: [{
      organization: '',
      position: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      current: false,
      bullets: ['', '', '']
    }],
    
    // Skills
    technical: '',
    languages: '',
    laboratory: ''
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (section, index, field, value) => {
    if (section === 'personal') {
      setResumeData(prev => ({ ...prev, [field]: value }));
    } else if (Array.isArray(resumeData[section])) {
      const updated = [...resumeData[section]];
      if (field === 'bullets') {
        updated[index].bullets[value.bulletIndex] = value.bulletValue;
      } else {
        updated[index][field] = value;
      }
      setResumeData(prev => ({ ...prev, [section]: updated }));
    } else {
      setResumeData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addSection = (section) => {
    if (section === 'education') {
      setResumeData(prev => ({
        ...prev,
        education: [...prev.education, {
          institution: '', degree: '', field: '', graduationMonth: '', graduationYear: '',
          location: '', gpa: '', honors: '', coursework: '', awards: ''
        }]
      }));
    } else if (section === 'experience') {
      setResumeData(prev => ({
        ...prev,
        experience: [...prev.experience, {
          organization: '', position: '', location: '', startMonth: '', startYear: '',
          endMonth: '', endYear: '', current: false, bullets: ['', '', '']
        }]
      }));
    }
  };

  const removeSection = (section, index) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const addBullet = (expIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].bullets.push('');
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const removeBullet = (expIndex, bulletIndex) => {
    const updated = [...resumeData.experience];
    updated[expIndex].bullets = updated[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    setResumeData(prev => ({ ...prev, experience: updated }));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const componentRef = React.useRef();

const handlePrint = useReactToPrint({
  contentRef: componentRef,
  documentTitle: `${resumeData.firstName}_${resumeData.lastName}_Resume`,
});

const ResumePreview = React.forwardRef((props, ref) => (
  <div ref={ref} className="bg-white text-black p-8 font-serif text-sm leading-relaxed max-w-4xl mx-auto shadow-2xl">
    {/* Header */}
    <div className="text-center mb-6">
      <h1 className="text-lg font-bold uppercase tracking-wider">
        {resumeData.firstName} {resumeData.lastName}
      </h1>
      <div className="text-xs mt-2">
        {resumeData.city && resumeData.state && `${resumeData.city}, ${resumeData.state}  | `}
        {resumeData.phone && `${resumeData.phone} | `}
        {resumeData.email}
        <br />
        {resumeData.linkedin && `LinkedIn: ${resumeData.linkedin} | `}
        {resumeData.portfolio && `Portfolio: ${resumeData.portfolio}`}
        <br />
        
      </div>
    </div>
      

      {/* Education */}
      {resumeData.education.some(edu => edu.institution) && (
        <div className="mb-6">
          <h2 className="text-center font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Education
          </h2>
          <p className="text-xs italic mb-2">
            
          </p>
          
          {resumeData.education.map((edu, index) => (
            edu.institution && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <strong>{edu.institution}</strong>
                    <br />
                    {edu.degree && `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`}
                    {edu.gpa && ` (${edu.gpa})`}
                  </div>
                  <div className="text-right">
                    {edu.location}
                    <br />
                    {edu.graduationMonth && edu.graduationYear && 
                      `Graduation Date [${edu.graduationMonth} ${edu.graduationYear}]`
                    }
                  </div>
                </div>
                {edu.coursework && (
                  <div className="mt-1">
                    <em>Relevant Coursework:</em> {edu.coursework}
                  </div>
                )}
                {edu.honors && (
                  <div className="mt-1">
                    <em>Honors:</em> {edu.honors}
                  </div>
                )}
                {edu.awards && (
                  <div className="mt-1">
                    <em>Awards:</em> {edu.awards}
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Experience */}
      {resumeData.experience.some(exp => exp.organization) && (
        <div className="mb-6">
          <h2 className="text-center font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Experience
          </h2>
          
          {resumeData.experience.map((exp, index) => (
            exp.organization && (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <strong>{exp.organization}</strong>
                    <br />
                    <em>{exp.position}</em>
                  </div>
                  <div className="text-right">
                    {exp.location}
                    <br />
                    {exp.startMonth && exp.startYear && 
                      `${exp.startMonth} ${exp.startYear} – ${
                        exp.current ? 'Present' : 
                        exp.endMonth && exp.endYear ? `${exp.endMonth} ${exp.endYear}` : 'Present'
                      }`
                    }
                  </div>
                </div>
                
                {exp.bullets.some(bullet => bullet.trim()) && (
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    {exp.bullets.map((bullet, bulletIndex) => (
                      bullet.trim() && (
                        <li key={bulletIndex} className="text-xs leading-relaxed">
                          {bullet}
                        </li>
                      )
                    ))}
                  </ul>
                )}
              </div>
            )
          ))}
        </div>
      )}

      {/* Skills */}
      {(resumeData.technical || resumeData.languages || resumeData.laboratory) && (
        <div className="mb-6">
          <h2 className="text-center font-bold uppercase tracking-wider border-b border-black pb-1 mb-3">
            Skills
          </h2>
          <p className="text-xs italic mb-2">
            
          </p>
          
          {resumeData.technical && (
            <div className="mb-2">
              <strong>Technical:</strong> {resumeData.technical}
            </div>
          )}
          {resumeData.languages && (
            <div className="mb-2">
              <strong>Languages:</strong> {resumeData.languages}
            </div>
          )}
          {resumeData.laboratory && (
            <div className="mb-2">
              <strong>Specialized Skills:</strong> {resumeData.laboratory}
            </div>
          )}
        </div>
      )}
    </div>
  )
);

  if (previewMode) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={() => setPreviewMode(false)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <User className="w-5 h-5" />
              <span>Back to Edit</span>
            </button>
            <div className="flex space-x-4">
              <button 
                onClick={handlePrint}
                className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors">
                <Save className="w-5 h-5" />
                <span>Save Resume</span>
              </button>
            </div>
          </div>
          <ResumePreview ref={componentRef} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
            <h1 className="text-3xl font-bold flex items-center space-x-3">
              <User className="w-8 h-8" />
              <span>ATS Resume Builder</span>
            </h1>
            <p className="mt-2 opacity-90">Create a professional, ATS-optimized resume</p>
            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setPreviewMode(true)}
                className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Eye className="w-5 h-5" />
                <span>Preview Resume</span>
              </button>
            </div>
          </div>

          <div className="p-8 space-y-12">
            {/* Personal Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <User className="w-6 h-6 text-blue-600" />
                <span>Personal Information</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={resumeData.firstName}
                    onChange={(e) => handleInputChange('personal', null, 'firstName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={resumeData.lastName}
                    onChange={(e) => handleInputChange('personal', null, 'lastName', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your last name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={resumeData.city}
                    onChange={(e) => handleInputChange('personal', null, 'city', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={resumeData.state}
                    onChange={(e) => handleInputChange('personal', null, 'state', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={resumeData.phone}
                    onChange={(e) => handleInputChange('personal', null, 'phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => handleInputChange('personal', null, 'email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    type="url"
                    value={resumeData.linkedin}
                    onChange={(e) => handleInputChange('personal', null, 'linkedin', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website</label>
                  <input
                    type="url"
                    value={resumeData.portfolio}
                    onChange={(e) => handleInputChange('personal', null, 'portfolio', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourportfolio.com"
                  />
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                  <span>Education</span>
                </h2>
                <button
                  onClick={() => addSection('education')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Education</span>
                </button>
              </div>

              {resumeData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Education {index + 1}</h3>
                    {resumeData.education.length > 1 && (
                      <button
                        onClick={() => removeSection('education', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name *</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => handleInputChange('education', index, 'institution', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Harvard University"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleInputChange('education', index, 'degree', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Bachelor of Arts"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Field of Study</label>
                      <input
                        type="text"
                        value={edu.field}
                        onChange={(e) => handleInputChange('education', index, 'field', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Month</label>
                      <select
                        value={edu.graduationMonth}
                        onChange={(e) => handleInputChange('education', index, 'graduationMonth', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Graduation Year</label>
                      <select
                        value={edu.graduationYear}
                        onChange={(e) => handleInputChange('education', index, 'graduationYear', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) => handleInputChange('education', index, 'location', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Cambridge, MA"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA (Optional)</label>
                      <input
                        type="text"
                        value={edu.gpa}
                        onChange={(e) => handleInputChange('education', index, 'gpa', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="3.8/4.0"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Relevant Coursework</label>
                      <textarea
                        value={edu.coursework}
                        onChange={(e) => handleInputChange('education', index, 'coursework', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows="2"
                        placeholder="Data Structures, Algorithms, Software Engineering"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Honors</label>
                      <input
                        type="text"
                        value={edu.honors}
                        onChange={(e) => handleInputChange('education', index, 'honors', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Magna Cum Laude, Dean's List"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Awards</label>
                      <input
                        type="text"
                        value={edu.awards}
                        onChange={(e) => handleInputChange('education', index, 'awards', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Outstanding Student Award"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </section>

            {/* Experience */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center space-x-2">
                  <Briefcase className="w-6 h-6 text-blue-600" />
                  <span>Experience</span>
                </h2>
                <button
                  onClick={() => addSection('experience')}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              {resumeData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Experience {index + 1}</h3>
                    {resumeData.experience.length > 1 && (
                      <button
                        onClick={() => removeSection('experience', index)}
                        className="text-red-600 hover:text-red-800 p-2"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization *</label>
                      <input
                        type="text"
                        value={exp.organization}
                        onChange={(e) => handleInputChange('experience', index, 'organization', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Google Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Position Title *</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => handleInputChange('experience', index, 'position', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleInputChange('experience', index, 'location', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Mountain View, CA"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`current-${index}`}
                        checked={exp.current}
                        onChange={(e) => handleInputChange('experience', index, 'current', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor={`current-${index}`} className="text-sm font-medium text-gray-700">
                        Currently work here
                      </label>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Month</label>
                      <select
                        value={exp.startMonth}
                        onChange={(e) => handleInputChange('experience', index, 'startMonth', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Month</option>
                        {months.map(month => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Year</label>
                      <select
                        value={exp.startYear}
                        onChange={(e) => handleInputChange('experience', index, 'startYear', e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select Year</option>
                        {years.map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                    {!exp.current && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Month</label>
                          <select
                            value={exp.endMonth}
                            onChange={(e) => handleInputChange('experience', index, 'endMonth', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Month</option>
                            {months.map(month => (
                              <option key={month} value={month}>{month}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">End Year</label>
                          <select
                            value={exp.endYear}
                            onChange={(e) => handleInputChange('experience', index, 'endYear', e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Select Year</option>
                            {years.map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Experience Bullets */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium text-gray-700">Job Responsibilities & Achievements</label>
                      <button
                        type="button"
                        onClick={() => addBullet(index)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Bullet</span>
                      </button>
                    </div>
                    
                    {exp.bullets.map((bullet, bulletIndex) => (
                      <div key={bulletIndex} className="flex items-start space-x-2 mb-3">
                        <span className="text-gray-500 mt-3">•</span>
                        <textarea
                          value={bullet}
                          onChange={(e) => handleInputChange('experience', index, 'bullets', {
                            bulletIndex,
                            bulletValue: e.target.value
                          })}
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows="2"
                          placeholder="Describe your accomplishment with quantifiable results..."
                        />
                        {exp.bullets.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeBullet(index, bulletIndex)}
                            className="text-red-600 hover:text-red-800 p-2 mt-1"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Skills */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                <Award className="w-6 h-6 text-blue-600" />
                <span>Skills</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                  <textarea
                    value={resumeData.technical}
                    onChange={(e) => handleInputChange('skills', null, 'technical', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="List computer software and programming languages"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <textarea
                    value={resumeData.languages}
                    onChange={(e) => handleInputChange('skills', null, 'languages', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="List foreign languages and your level of fluency"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Laboratory/Specialized Skills</label>
                  <textarea
                    value={resumeData.laboratory}
                    onChange={(e) => handleInputChange('skills', null, 'laboratory', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    placeholder="List scientific/research lab techniques or tools"
                  />
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t">
              <button
                onClick={() => setPreviewMode(true)}
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
              >
                <Eye className="w-5 h-5" />
                <span>Preview Resume</span>
              </button>
              
              <button 
                onClick={handlePrint}
                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg"
              >
                <Download className="w-5 h-5" />
                <span>Download PDF</span>
              </button>
              
              <button className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-8 py-4 rounded-lg hover:bg-gray-700 transition-colors font-semibold text-lg">
                <Save className="w-5 h-5" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;