import { useEffect, useState } from "react";
import { Table, Spinner, TextInput, Select, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState("");
  const booksPerPage = 10;

  // Sorting State
  const [sortOrder, setSortOrder] = useState("");

  // Fetch books from the API
  const fetchBooks = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/books`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch books");
        }
        return res.json();
      })
      .then((data) => {
        const sortedBooks = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllBooks(sortedBooks);
        setFilteredBooks(sortedBooks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again later.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Listen for changes in local storage to detect new book uploads
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "newBookAdded") {
        fetchBooks(); // Re-fetch books when a new book is added
        localStorage.removeItem("newBookAdded"); // Clear the flag
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle delete button click
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleting(true); // Start deletion process
        fetch(`${import.meta.env.VITE_API_URL}/books/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              toast.success("Book deleted successfully!");
              const updatedBooks = allBooks.filter((book) => book._id !== id);
              setAllBooks(updatedBooks);
              setFilteredBooks(updatedBooks);
            } else {
              toast.error("Failed to delete the book.");
            }
          })
          .catch((error) => {
            console.error("Error deleting book:", error);
            toast.error("An error occurred while deleting the book.");
          })
          .finally(() => {
            setDeleting(false); // End deletion process
          });
      }
    });
  };

  // Search Handler (Dynamic Search)
  const handleSearch = () => {
    let filtered = allBooks.filter((book) => {
      const normalizedSearchQuery = searchQuery.replace(/\s+/g, "").toLowerCase();
      const normalizedTitle = book.title.replace(/\s+/g, "").toLowerCase();
      const normalizedAuthor = book.author.replace(/\s+/g, "").toLowerCase();

      return (
        normalizedTitle.includes(normalizedSearchQuery) ||
        normalizedAuthor.includes(normalizedSearchQuery)
      );
    });
    setFilteredBooks(filtered);
  };

  // Filter Handler
  const handleFilter = () => {
    let filtered = allBooks;

    if (categoryFilter) {
      filtered = filtered.filter((book) => book.category === categoryFilter);
    }

    if (priceFilter) {
      const [minPrice, maxPrice] = priceFilter.split("-").map(Number);
      filtered = filtered.filter((book) => {
        const price = parseFloat(book.rentalPrice);
        return price >= minPrice && price <= maxPrice;
      });
    }

    setFilteredBooks(filtered);
  };

  // Sort Handler
  const handleSort = () => {
    let sorted = [...filteredBooks];
  
    if (sortOrder === "asc") {
      sorted.sort((a, b) => {
        return parseFloat(a.rentalPrice || 0) - parseFloat(b.rentalPrice || 0);
      });
    } else if (sortOrder === "desc") {
      sorted.sort((a, b) => {
        return parseFloat(b.rentalPrice || 0) - parseFloat(a.rentalPrice || 0);
      });
    }
  
    setFilteredBooks(sorted);
  };
  
  // Reset Filters
  const resetFilters = () => {
    setSearchQuery("");
    setCategoryFilter("");
    setPriceFilter("");
    setSortOrder("");
    setFilteredBooks(allBooks);
    toast.success("Filters reset successfully!");
  };

  // Dynamic search triggered as the user types
  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  // Apply filters when category or price filter changes
  useEffect(() => {
    handleFilter();
  }, [categoryFilter, priceFilter]);

  // Apply sorting when sort order changes
  useEffect(() => {
    handleSort();
  }, [sortOrder]);

  // Extract unique categories from allBooks
  const getUniqueCategories = () => {
    const categories = new Set(allBooks.map((book) => book.category));
    return Array.from(categories).filter((category) => category);
  };

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(filteredBooks.length / booksPerPage)) {
      toast.error("Invalid page number.");
      return;
    }
    setCurrentPage(pageNumber);
  };

  // Handle "Go to Page" input
  const handleGoToPage = () => {
    const page = parseInt(pageInput, 10);
    if (page >= 1 && page <= Math.ceil(filteredBooks.length / booksPerPage)) {
      paginate(page);
      setPageInput(""); // Clear input after navigation
    } else {
      toast.error("Invalid page number.");
    }
  };

  // Handle Enter key press in "Go to Page" input
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  // Show "No Books Found" message when there are no books in filteredBooks
  const noBooksFound = filteredBooks.length === 0;

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage Your Books</h2>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Total Books Counter */}
      <div className="mb-4">
        <p className="text-gray-600">
          Showing {filteredBooks.length} of {allBooks.length} books
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex gap-4 mb-8">
        {/* Search Input */}
        <div className="relative flex-1">
          <TextInput
            placeholder="Search by book name or author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          )}
        </div>

        {/* Category Filter */}
        <Select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {getUniqueCategories().map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </Select>

        {/* Price Filter */}
        <Select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="">All Prices</option>
          <option value="0-100">₹0 - ₹100</option>
          <option value="101-500">₹101 - ₹500</option>
          <option value="501-1000">₹501 - ₹1000</option>
          <option value="1001-5000">₹1001 - ₹5000</option>
        </Select>

        {/* Sort Order */}
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </Select>

        <Button onClick={resetFilters} className="bg-gray-400">
          Reset Filters
        </Button>

        {/* Refresh Data Button */}
        <Button onClick={fetchBooks} className="bg-green-600 hover:bg-green-700">
          Refresh Data
        </Button>
      </div>

      {noBooksFound && (
        <div className="flex flex-col items-center mt-12">
          <h2 className="text-3xl font-bold mb-4">No Books Found</h2>
          <p className="text-gray-600">Try adding some books or adjust your filters to see results.</p>
        </div>
      )}

      {!noBooksFound && (
        <>
          <Table className="lg:w-[1180px]">
            <Table.Head>
              <Table.HeadCell>No.</Table.HeadCell>
              <Table.HeadCell>Book Image</Table.HeadCell>
              <Table.HeadCell>Book Name</Table.HeadCell>
              <Table.HeadCell>Author Name</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>Edit or Manage</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {currentBooks.map((book, index) => (
                <Table.Row key={book._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {indexOfFirstBook + index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={book.imageURL}
                      alt={book.title || "No Title Available"}
                      className="h-16 w-16 object-cover rounded"
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white truncate">
                    {book.title || "No Title Available"}
                  </Table.Cell>
                  <Table.Cell>{book.author || "Unknown Author"}</Table.Cell>
                  <Table.Cell>{book.category || "Uncategorized"}</Table.Cell>
                  <Table.Cell>₹{book.rentalPrice || "N/A"}</Table.Cell>
                  <Table.Cell>
                  <Link
                       className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-5"
                      to={`/admin/dashboard/edit-books/${book._id}`}
>
                      Edit
                  </Link>
                    <button
                      onClick={() => handleDelete(book._id)}
                      disabled={deleting}
                      className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleting ? "Deleting..." : "Delete"}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-white text-black"}`}
              >
                {i + 1}
              </button>
            ))}
            <div className="flex gap-2">
              <TextInput
                type="number"
                placeholder="Go to page"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                onKeyDown={handleKeyDown} // Handle Enter key press
                className="w-24"
                min="1"
                max={Math.ceil(filteredBooks.length / booksPerPage)}
              />
              <Button
                onClick={handleGoToPage}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full"
              >
                Go
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ManageBooks;