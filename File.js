import React, { useState } from 'react';

function FilePreview() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [mrp, setMrp] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setFileSize(`File size: ${Math.round(selectedFile.size / 1024)} KB`);
      setImageUrl(URL.createObjectURL(selectedFile)); // Preview the selected file
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-input').click();
  };

  const allFieldsFilled = productName && description && price && mrp && file;

  return (
    <div className="item" style={styles.item}>
      <input
        type="text"
        placeholder="Enter Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        style={styles.inputField}
      />
      <input
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.inputField}
      />
      <input
        type="text"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={styles.inputField}
      />
      <input
        type="text"
        placeholder="Enter M.R.P"
        value={mrp}
        onChange={(e) => setMrp(e.target.value)}
        style={styles.inputField}
      />

      {/* Trigger file upload */}
      <div onClick={triggerFileInput} style={styles.addToCart}>
        Upload Image
      </div>
      <input 
        type="file" 
        id="file-input" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />

      {/* Show preview only if all fields are filled */}
      {allFieldsFilled ? (
        <div style={styles.previewSection}>
          <img src={imageUrl} alt="Product" style={styles.image} />
          <h3>{productName}</h3>
          <p>{description}</p>
          <p>{fileSize}</p>
          <p style={styles.price}>
            ₹{price} <span style={styles.mrp}>M.R.P: ₹{mrp}</span>
          </p>
        </div>
      ) : (
        <p style={styles.warning}>Please fill all fields and upload an image to preview the product.</p>
      )}
    </div>
  );
}

// Inline styles for the component
const styles = {
  item: {
    border: '1px solid #ccc',
    padding: '16px',
    maxWidth: '300px',
    textAlign: 'center'
  },
  image: {
    maxWidth: '100px',
    marginBottom: '10px'
  },
  inputField: {
    marginBottom: '10px',
    padding: '8px',
    width: '100%',
    boxSizing: 'border-box'
  },
  price: {
    fontSize: '20px',
    color: 'green'
  },
  mrp: {
    fontSize: '14px',
    textDecoration: 'line-through'
  },
  addToCart: {
    marginTop: '10px',
    backgroundColor: 'yellow',
    padding: '10px',
    cursor: 'pointer'
  },
  previewSection: {
    marginTop: '20px',
    borderTop: '1px solid #ccc',
    paddingTop: '10px'
  },
  warning: {
    color: 'red',
    marginTop: '10px'
  }
};

export default FilePreview;
