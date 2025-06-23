import { useState } from "react";
const token = localStorage.getItem('tokenFinanceApp');

export default function FormDataCSV(){
    const [file, setFile] = useState<File | null>(null)
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) { // Check if a file is selected, meaning the user has chosen a file
            setFile(selectedFile);

            const fileReader = new FileReader()
            fileReader.onload = () => {
                const fileContent = fileReader.result as string;
                console.log(fileContent)
            }
            fileReader.readAsText(selectedFile)
        }

        
    }

    const handleUpload = async () => {
        if(!file){
            alert("Please select a file to upload;")
            return;
        }

        const formData = new FormData();
        formData.append("fileCSV", file);

        try {
            const res = await fetch("http://localhost:4000/api/upload", {
                method: "POST",
                headers: { 
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            })

            if (res.ok) {
                console.log("File uploaded successfully");
                console.log("Response:", res);
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
            <input type='file' name='fileCSV' accept=".csv" onChange={handleFileChange} className="border m-2 p-3 text-black cursor-pointer"/>
            <button onClick={handleUpload}>Upload CSV</button>
        </div>
    )
}