import { useState } from "react";
const token = localStorage.getItem('tokenFinanceApp');

export default function UploadCSV(){
    const [file, setFile] = useState<File | null>(null)
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) { // Check if a file is selected, meaning the user has chosen a file
            setFile(selectedFile);
        }
    }

    const handleUpload = async () => {
        if(!file){
            alert("Please select a file to upload;")
            return;
        }

        const formData = new FormData();
        formData.append("csv", file);

        try {
            const res = await fetch("http://localhost:4000/api/upload", {
                method: "POST",
                headers: { 
                    'Authorization': `Bearer ${token}` 
                },
                body: formData,
            })

            console.log("Response:", res);
            if (res.ok) {
                console.log("File uploaded successfully");
            } else {
                const errorMsg = await res.text()
                alert("Upload failed: " + errorMsg);
                console.error("Upload failed:", errorMsg);
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    }

    return (
        <div>
            <input type='file' accept=".csv" onChange={handleFileChange}/>
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    )
}