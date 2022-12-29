import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("")
  const [query, setQuery] = useState('java')
  const [books, setBooks] = useState([]);
  const [id, setId] = useState("");
  const [term, setTerm] = useState(false);

  useEffect(() => {
    fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyC73bboWcM3knl9kyPPpHV7UDdaeKt4wiQ`
    )
      .then((res) => res.json())
      .then((result) => {
        setBooks(result.items);
      })
      .catch((error) => alert(error.message));
  }, [query]);

  const getSearch = e => {
    e.preventDefault()

    if(search !== ''){
      setQuery(search)
      setSearch('')
    } else {
      alert('Enter Book Name!!')
    }
  }
  
  const checkIt = (id) => {
    setId(id)
    setTerm(true)
  }

  return (
    <div className="App">
      <div className="app_new">
      {/* <img className="img" src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80" alt="" /> */}
      <h1 className="title">Book Mania</h1>

      <form onSubmit={getSearch} className="search--form">
        <input
          type="text"
          placeholder="Search Book..."
          className="search--bar"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type="submit" className="search--btn">
          <img
            src="https://img.icons8.com/color/344/4a90e2/search--v1.png"
            alt=""
          />
        </button>
      </form>

      <div className="books">
        {books.slice(0, 4).map((book, key) => (
          <div key={key} className="book--item">
            <img
              src={Object.values(book?.volumeInfo.imageLinks)[0]}
              alt="cover img"
              className="BookImg"
            />
            <div className="book--item-btns">
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noreferrer"
                className="preview--btn"
              >
                Preview
              </a>

              {book?.accessInfo.pdf["acsTokenLink"] !== undefined ? (
                <button className="read--btn" onClick={() => checkIt(book?.id)}>Read Online</button>
              ) : (
                <h3 className="null--point">Not Available</h3>
              )}
            </div>
          </div>
        ))}
      </div>

      {term ? (
        <div className="reading--block">
          <button className="close--btn" onClick={() => setTerm(false)}>X</button>
          <iframe
            src={`https://books.google.com.pk/books?id=${id}&lpg=PP1&pg=PP1&output=embed`}
            title="Pdf Viewer"
            className="iframe"
          ></iframe>
        </div>
      ) : (
        ""
      )}
      </div>
    </div>
  );
}

export default App;

// how to add a blurry backgroung image in css file?  
