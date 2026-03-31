import React, { useState, useRef } from 'react';
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadBook = () => {
  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction",
    "Fantasy", "Horror", "Biography", "Autobiography", "History", "Self-help", 
    "Memoir", "Business", "Children Books", "Travel", "Religion", "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
  const [status, setStatus] = useState("Yes");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: false,
    author: false,
    publisher: false,
    imageURL: false,
    isbn: false,
    price: false,
    description: false,
  });
  const [descriptionLength, setDescriptionLength] = useState(0);
  const [showGoUpButton, setShowGoUpButton] = useState(false); // State for "Go Up" button

  const formRef = useRef();
  const previewRef = useRef();

  const handleChangeSelectedValue = (event) => setSelectedBookCategory(event.target.value);
  const handleStatusChange = (event) => setStatus(event.target.value);

  const handlePreviewClick = () => {
    const form = formRef.current;
    const errors = {
      title: !form.bookTitle.value,
      author: !form.authorName.value,
      publisher: !form.publisher.value,
      imageURL: !form.imageURL.value,
      isbn: !form.isbn.value,
      price: !form.price.value,
      description: !form.bookDescription.value,
    };

    setFormErrors(errors);

    if (!Object.values(errors).includes(true)) {
      setPreviewVisible(true); // Show the preview section
      setShowGoUpButton(true); // Show the "Go Up" button
      setTimeout(() => {
        previewRef.current.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll after the DOM updates
      }, 0); // Use setTimeout to ensure the DOM is updated before scrolling
    } else {
      toast.error("Please fill all mandatory fields before previewing.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleGoUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top of the page
    setShowGoUpButton(false); // Hide the "Go Up" button after clicking it
  };

  const handleBookSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const errors = {
      title: !form.bookTitle.value,
      author: !form.authorName.value,
      publisher: !form.publisher.value,
      imageURL: !form.imageURL.value,
      isbn: !form.isbn.value,
      price: !form.price.value,
      description: !form.bookDescription.value,
    };

    setFormErrors(errors);

    if (Object.values(errors).includes(true)) {
      toast.error("Please fill all mandatory fields before uploading.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    const bookobj = {
      title: form.bookTitle.value,
      author: form.authorName.value,
      imageURL: form.imageURL.value,
      category: selectedBookCategory,
      description: form.bookDescription.value,
      isbn: form.isbn.value,
      rentalPrice: parseFloat(form.price.value),
      publisher: form.publisher.value,
      status,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookobj),
      });

      if (response.ok) {
        form.reset();
        setPreviewVisible(false);
        setShowGoUpButton(false); // Hide the "Go Up" button after submission
        toast.success("Book uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Notify ManageBooks component to refresh the book list
        localStorage.setItem("newBookAdded", "true");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to upload book");
      }
    } catch (error) {
      console.error("Error uploading book:", error);
      toast.error(`Failed to upload book: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const renderErrorMessage = (field) => formErrors[field] && <span className="text-red-500 text-sm">* This field is required</span>;

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>

      <form ref={formRef} onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
        <div className='flex gap-8'>
          <div className="lg:w-1/2">
            <Label htmlFor="bookTitle" value="Book Title" className="mb-2 block" />
            <TextInput
              id="bookTitle"
              name="bookTitle"
              type="text"
              placeholder="Book Name"
              required
              className={formErrors.title ? 'border-red-500' : ''}
            />
            {renderErrorMessage('title')}
          </div>

          <div className="lg:w-1/2">
            <Label htmlFor="authorName" value="Author Name" className="mb-2 block" />
            <TextInput
              id="authorName"
              name="authorName"
              type="text"
              placeholder="Author Name"
              required
              className={formErrors.author ? 'border-red-500' : ''}
            />
            {renderErrorMessage('author')}
          </div>
        </div>

        <div className='flex gap-8'>
          <div className="lg:w-1/2">
            <Label htmlFor="publisher" value="Publisher" className="mb-2 block" />
            <TextInput
              id="publisher"
              name="publisher"
              type="text"
              placeholder="Publisher"
              required
              className={formErrors.publisher ? 'border-red-500' : ''}
            />
            {renderErrorMessage('publisher')}
          </div>

          <div className="lg:w-1/2">
            <Label htmlFor="imageURL" value="Book Image URL" className="mb-2 block" />
            <TextInput
              id="imageURL"
              name="imageURL"
              type="text"
              placeholder="Book Image URL"
              required
              className={formErrors.imageURL ? 'border-red-500' : ''}
            />
            {renderErrorMessage('imageURL')}
          </div>
        </div>

        <div>
          <Label htmlFor="bookDescription" value="Book Description" className="mb-2 block" />
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Write your book description..."
            className='w-full'
            rows={6}
            required
            onChange={(e) => setDescriptionLength(e.target.value.length)}
          />
          <p className="text-sm text-gray-500">{descriptionLength}/500 characters</p>
          {renderErrorMessage('description')}
        </div>

        <div className='flex gap-8'>
          <div className="lg:w-1/3">
            <Label htmlFor="isbn" value="ISBN Number" className="mb-2 block" />
            <TextInput
              id="isbn"
              name="isbn"
              type="text"
              placeholder="ISBN"
              required
              className={formErrors.isbn ? 'border-red-500' : ''}
            />
            {renderErrorMessage('isbn')}
          </div>

          <div className="lg:w-1/3">
            <Label htmlFor="price" value="Price" className="mb-2 block" />
            <TextInput
              id="price"
              name="price"
              type="number"
              placeholder="Price"
              required
              className={formErrors.price ? 'border-red-500' : ''}
            />
            {renderErrorMessage('price')}
          </div>

          <div className="lg:w-1/3">
            <Label htmlFor="category" value="Category" className="mb-2 block" />
            <select
              id="category"
              name="category"
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
              className="w-full p-2 border border-gray-300 rounded-lg"
            >
              {bookCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handlePreviewClick}
          className='mt-5 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'
        >
          Preview Book
        </button>

        <button
          type="submit"
          className="mt-5 w-full rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4"
        >
          Upload Book
        </button>

        {previewVisible && (
          <div ref={previewRef} className="mt-8">
            <h3 className="text-xl font-bold">Book Preview</h3>
            <div className="flex flex-col items-center gap-4">
              <img src={formRef.current.imageURL.value} alt="Book Cover" className="w-60 h-80 object-cover" />
              <p><strong>Title:</strong> {formRef.current.bookTitle.value}</p>
              <p><strong>Author:</strong> {formRef.current.authorName.value}</p>
              <p><strong>Publisher:</strong> {formRef.current.publisher.value}</p>
              <p><strong>Category:</strong> {selectedBookCategory}</p>
              <p><strong>ISBN:</strong> {formRef.current.isbn.value}</p>
              <p><strong>Price:</strong> ₹{formRef.current.price.value}</p>
            </div>
          </div>
        )}
      </form>

      {/* "Go Up" Button */}
      {showGoUpButton && (
        <button
          onClick={handleGoUp}
          className="fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all"
          title="Go Up"
        >
          ↑
        </button>
      )}

      <ToastContainer />
    </div>
  );
};

export default UploadBook;