// src/components/books/BookList.jsx
import { Box, Typography, Paper } from "@mui/material";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{
          p: 4,
          textAlign: "center",
          borderStyle: "dashed",
          color: "text.secondary",
          bgcolor: "#fafafa",
        }}
      >
        <Typography variant="body1" sx={{ mb: 0.5 }}>
          등록된 책이 아직 없습니다.
        </Typography>
        <Typography variant="body2" color="text.disabled">
          첫 번째 책을 등록해 보세요.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 1.5, md: 2 },
        width: "100%",
      }}
    >
      {books.map((book) => (
        <BookCard
          key={book.id}
          id={book.id}
          title={book.title}
          author={book.author}
          description={book.description}
          thumbnail={book.thumbnail}
          createdAt={book.createdAt}
        />
      ))}
    </Box>
  );
}
