// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import BookListPage from "./pages/BookListPage.jsx";
import BookCreatePage from "./pages/BookCreatePage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import BookDetailPage from "./pages/BookDetailPage.jsx";
import BookEditPage from "./pages/BookEditPage.jsx";
import ApiTestPage from "./pages/ApiTestPage.jsx";
import MyBookListPage from "./pages/MyBookListPage.jsx";
import ImageCreatePage from "./pages/ImageCreatePage.jsx";

function App() {
  return (
    <Routes>
      {/* Layout이 공통 레이아웃 */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="books" element={<BookListPage />} />
        <Route path="books/new" element={<BookCreatePage />} />
        {/* 추후: <Route path="books/:id" element={<BookDetailPage />} /> 등 추가 */}
        <Route path="login" element={<LogInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="books/:id" element={<BookDetailPage />} />
        <Route path="books/:id/edit" element={<BookEditPage />} />
        <Route path="api_test" element={<ApiTestPage />} />
        <Route path="my/books" element={<MyBookListPage />} />
        <Route path="images/:id" element={<ImageCreatePage />} />

        <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} />
      </Route>
    </Routes>
  );
}

export default App;
