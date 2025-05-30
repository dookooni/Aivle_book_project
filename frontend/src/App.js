// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookForm from './pages/BookForm';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import { useState } from 'react';
import Layout from './components/Layout';


function App() {
  const [books, setBooks] = useState([]);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
          <Route path="/books/new" element={<BookForm books={books} setBooks={setBooks} />} />
          <Route path="/books/:id" element={<BookDetail books={books} setBooks={setBooks} />} />
          <Route path="/books/:id/edit" element={<BookEdit books={books} setBooks={setBooks} />} />
          <Route path="*" element={<p>페이지를 찾을 수 없습니다</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
