// src/pages/BookListPage.jsx
import { useState } from "react";
import BookList from "../components/books/BookList";
import { Box, Pagination, Typography, Stack } from "@mui/material";

export default function BookListPage() {
  // TODO: 나중에는 여기 데이터를 서버에서 받아오면 됨
  const books = [
    {
      id: 1,
      title: "클린 코드",
      author: "로버트 C. 마틴",
      description: "가독성과 유지보수성을 높이는 코드 작성 원칙을 다루는 책입니다.",
      thumbnail: "https://placehold.co/80x110",
      createdAt: "2025-12-05",
    },
    {
      id: 2,
      title: "리팩터링 2판",
      author: "마틴 파울러",
      description: "기존 코드를 개선하는 다양한 리팩터링 기법을 소개합니다.",
      thumbnail: "https://placehold.co/80x110?text=Book",
      createdAt: "2025-12-01",
    },
    // TODO: 나중에 실제 데이터가 더 많아지면 이 배열이 길어질 것
  ];

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(books.length / itemsPerPage) || 1;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBooks = books.slice(startIndex, endIndex);

  const handleChangePage = (_event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          책 목록
        </Typography>
        <Typography variant="body2" color="text.secondary">
          사용자들이 업로드한 책 정보를 공유하는 페이지입니다.
        </Typography>
      </Stack>

      <BookList books={currentBooks} />

      <Box
        sx={{
          mt: 4,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
