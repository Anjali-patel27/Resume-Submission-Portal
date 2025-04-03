import { useState } from 'react';
import axios from 'axios';

function ResumeForm() {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [submissions, setSubmissions] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('name', name);

    try {
      await axios.post('/api/resumes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchSubmissions();
    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const fetchSubmissions = async () => {
    const response = await axios.get('/api/resumes');
    setSubmissions(response.data);
  };

  return (
    <div>
      <h2>Submit Your Resume</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input type="file" accept="application/pdf" onChange={handleFileChange} required />
        <button type="submit">Submit</button>
      </form>

      <h2>Submissions</h2>
      <ul>
        {submissions.map((submission) => (
          <li key={submission._id}>
            {submission.name} - <a href={submission.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResumeForm;