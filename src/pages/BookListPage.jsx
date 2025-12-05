// src/pages/BookListPage.jsx
import { useState } from "react";
import BookList from "../components/books/BookList";
import { Box, Pagination, Typography, Stack } from "@mui/material";

export default function BookListPage() {
  // 더 자세한 테스트를 위한 더미 데이터 (이미지의 스키마 기반)
  const books = [
    {
      id: 1,
      title: "클린 코드",
      author: "로버트 C. 마틴",
      description: "가독성과 유지보수성을 높이는 코드 작성 원칙을 다루는 책입니다.",
      genre: "개발/프로그래밍",
      ownerName: "홍길동",
      createdAt: "2024-11-12",
      thumbnail: "https://placehold.co/80x110?text=Clean+Code",
    },
    {
      id: 2,
      title: "리팩터링 2판",
      author: "마틴 파울러",
      description: "기존 코드를 개선하는 다양한 리팩터링 기법을 소개합니다.",
      genre: "개발/프로그래밍",
      ownerName: "이몽룡",
      createdAt: "2024-10-03",
      thumbnail: "https://placehold.co/80x110?text=Refactoring",
    },
    {
      id: 3,
      title: "이펙티브 자바",
      author: "조슈아 블로크",
      description: "자바 개발에서 실천할 수 있는 90여 가지 베스트 프랙티스 모음.",
      genre: "개발/프로그래밍",
      ownerName: "성춘향",
      createdAt: "2024-09-21",
      thumbnail: "https://placehold.co/80x110?text=Effective+Java",
    },
    {
      id: 4,
      title: "소프트웨어 장인",
      author: "산드로 만쿠소",
      description: "장인 정신을 갖춘 개발자가 되기 위한 태도와 실천법을 다룹니다.",
      genre: "개발/문화",
      ownerName: "임꺽정",
      createdAt: "2024-08-18",
      thumbnail: "https://placehold.co/80x110?text=Craftsmanship",
    },
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
