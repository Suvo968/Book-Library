import { useState } from 'react';
import { useLoaderData, useParams, useNavigate } from 'react-router-dom';
import { Label, Textarea, TextInput } from "flowbite-react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditBooks = () => {
  const { id } = useParams(); // Get book ID from the URL params
  const { title, author, imageURL, category, description, isBestseller, rentalPrice, publisher } = useLoaderData();
  const navigate = useNavigate(); // useNavigate hook to handle navigation

  const bookCategories = [
    "Fiction", "Non-Fiction", "Mystery", "Programming", "Science Fiction", "Fantasy", "Horror",
    "Biography", "Autobiography", "History", "Self-help", "Memoir", "Business", "Children Books",
    "Travel", "Religion", "Art and Design"
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);
  const [selectedRentalPrice, setSelectedRentalPrice] = useState(rentalPrice);
  const [selectedPublisher, setSelectedPublisher] = useState(publisher);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleRentalPriceChange = (event) => {
    setSelectedRentalPrice(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
  
    const title = form.title.value;
    const author = form.author.value;
    const imageURL = form.imageURL.value;
    const category = form.categoryName.value;
    const description = form.description.value;
    const isBestseller = form.isBestseller.value;
    const rentalPrice = form.rentalPrice.value;
    const publisher = form.publisher.value;
  
    const updateBookObj = {
      title,
      author,
      imageURL,
      category,
      description,
      isBestseller,
      rentalPrice,
      publisher,
    };
  
    const apiUrl = import.meta.env.VITE_API_URL;
  
    fetch(`${apiUrl}/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookObj),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((err) => {
            throw new Error(err.message || "Failed to update book");
          });
        }
        return res.json();
      })
      .then((data) => {
        toast.success("Book updated successfully!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => navigate("/admin/dashboard/manage"), // Navigate after toast
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Error updating book: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      });
  };
  

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Update the Book Data</h2>

      <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col gap-4">
        <div className='flex gap-8'>
          {/* Book Title */}
          <div className="lg:w-1/2">
            <Label htmlFor="title" value="Book Title" className="mb-2 block" />
            <TextInput
              id="title"
              name='title'
              type="text"
              placeholder="Book Name"
              required
              defaultValue={title}
            />
          </div>

          {/* Author Name */}
          <div className="lg:w-1/2">
            <Label htmlFor="author" value="Author Name" className="mb-2 block" />
            <TextInput
              id="author"
              name='author'
              type="text"
              placeholder="Author Name"
              required
              defaultValue={author}
            />
          </div>
        </div>

        <div className='flex gap-8'>
          {/* Book Image URL */}
          <div className="lg:w-1/2">
            <Label htmlFor="imageURL" value="Book Image URL" className="mb-2 block" />
            <TextInput
              id="imageURL"
              name='imageURL'
              type="text"
              placeholder="Book Image URL"
              required
              defaultValue={imageURL}
            />
          </div>

          {/* Book Category */}
          <div className="lg:w-1/2">
            <Label htmlFor="categoryName" value="Book Category" className="mb-2 block" />
            <select
              name="categoryName"
              id="category"
              className='w-full rounded'
              value={selectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='flex gap-8'>
          {/* Publisher */}
          <div className="lg:w-1/2">
            <Label htmlFor="publisher" value="Publisher" className="mb-2 block" />
            <TextInput
              id="publisher"
              name="publisher"
              type="text"
              placeholder="Publisher"
              required
              defaultValue={selectedPublisher}
              onChange={handlePublisherChange}
            />
          </div>

          {/* Rental Price */}
          <div className="lg:w-1/2">
            <Label htmlFor="rentalPrice" value="Rental Price" className="mb-2 block" />
            <TextInput
              id="rentalPrice"
              name="rentalPrice"
              type="number"
              placeholder="Rental Price"
              required
              defaultValue={selectedRentalPrice}
              onChange={handleRentalPriceChange}
              min="0" // Allow only positive values
              step="0.01" // Allow decimal points
            />
          </div>
        </div>

        {/* Book Description */}
        <div>
          <Label htmlFor="description" value="Description" className="mb-2 block" />
          <Textarea
            id="description"
            name="description"
            placeholder="Write your book description..."
            required
            className='w-full'
            rows={6}
            defaultValue={description}
          />
        </div>

        {/* Is Bestseller */}
        <div>
          <Label htmlFor="isBestseller" value="Bestseller" className="mb-2 block" />
          <Textarea
            id="isBestseller"
            name="isBestseller"
            placeholder="Is the book a bestseller?"
            required
            className='w-full'
            rows={6}
            defaultValue={isBestseller}
          />
        </div>

        <button type='submit' className='mt-5 w-full rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4'>
          Update Book
        </button>
      </form>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default EditBooks;