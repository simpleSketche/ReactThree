import { useState } from 'react'
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    // Get the selected file
    const file = event.target.files[0];
    if (file) {
        // Check if the file is a .glb file
        const fileExtension = file.name.split(".").pop().toLowerCase();
        if (fileExtension === 'glb') {
            console.log(file)
            setSelectedFile(file);
        } else {
            console.log(file)
            alert('Please select a .glb file.');
        }
    }
  };

  // Function to handle the file upload
  const handleUpload = () => {
    if (selectedFile) {
        // Handle the file upload process here
        console.log('Uploading', (selectedFile as any).name);
        // ... upload logic
    }
  };  

  return (
    <>
      <h1>GLB viewer</h1>
      <div className="card">
          <input type="file" onChange={handleFileChange} accept=".glb" />
          <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
      </div>
      <p className="read-the-docs">
        Upload the glb file to see it in 3d scene
      </p>
    </>
  )
}

export default App
