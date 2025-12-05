// src/pages/BookDetailPage.jsx
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Card,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 로그인한 사용자 정보 (수정/삭제 권한 체크용)
  const currentUser = JSON.parse(localStorage.getItem("user")); // { userId, email, name }

  // === 가상의 User / Book 데이터 (실제에선 API로 받아올 것) ===
  const users = [
    {
      userId: 10,
      email: "clean@code.com",
      name: "클린코드유저",
      createdAt: "2025-11-01",
    },
    {
      userId: 20,
      email: "refactor@book.com",
      name: "리팩터링유저",
      createdAt: "2025-11-10",
    },
  ];

  const books = [
    {
      id: "1",
      title: "클린 코드",
      author: "로버트 C. 마틴",
      description:
        "가독성과 유지보수성을 높이는 코드 작성 원칙을 다루는 책입니다...가독성과 유지보수성을 높이는 코드 작성 원칙을 다루는 책입니다가독성과 유지보수성을 높이는 코드 작성 원칙을 다루는 책입니다.",
      thumbnail: "https://placehold.co/200x260",
      createdAt: "2025-12-05",
      genre: "개발 / 프로그래밍",   // 🔥 장르 추가
      userId: 10,
    },
    {
      id: "2",
      title: "리팩터링 2판",
      author: "마틴 파울러",
      description: "기존 코드를 개선하는 여러 기법을 소개하며...",
      thumbnail: "https://placehold.co/200x260?text=Book",
      createdAt: "2025-12-01",
      genre: "개발 / 프로그래밍",
      userId: 20,
    },
  ];

  const book = books.find((b) => String(b.id) === id);
  if (!book) {
    return (
      <Box sx={{ width: "100%", px: 4, py: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          책 정보를 찾을 수 없습니다.
        </Typography>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          뒤로가기
        </Button>
      </Box>
    );
  }

  // 이 책을 등록한 사용자
  const owner = users.find((u) => u.userId === book.userId);
  const ownerName = owner ? owner.name : "알 수 없음";

  // 현재 로그인한 유저가 작성자인지 여부
  const isOwner = currentUser && currentUser.userId === book.userId;

  return (
    <Box sx={{ width: "100%", px: 4, py: 3 }}>
      {/* 상단 헤더 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.author}
          </Typography>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          {/* 장르를 Chip으로 표시 */}
          {book.genre && (
            <Chip
              label={book.genre}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, mb: 0.5 }}
            />
          )}
          <Typography variant="caption" color="text.secondary" display="block">
            업로드: {book.createdAt}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* 상세 카드 */}
      <Card
        sx={{
          width: "100%",
          borderRadius: 2,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}
      >
        <CardMedia
          component="img"
          image={book.thumbnail}
          alt={book.title}
          sx={{
            width: { xs: "100%", sm: 260 },
            height: { xs: 260, sm: "auto" },
            objectFit: "cover",
          }}
        />

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          {/* 장르 + 저자 */}
          <Box>
            {book.genre && (
              <>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  장르
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {book.genre}
                </Typography>
              </>
            )}

            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >
              저자
            </Typography>
            <Typography variant="body1">{book.author}</Typography>
          </Box>

          {/* 설명 */}
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              gutterBottom
            >
              책 설명
            </Typography>
            <Typography
              variant="body1"
              sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
            >
              {book.description}
            </Typography>
          </Box>

          {/* 하단: 등록한 사용자 + 업로드일 + 버튼 */}
          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 1,
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                등록한 사용자: {ownerName}
              </Typography>
              <Typography variant="caption" color="text.disabled" display="block">
                업로드일: {book.createdAt}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              {isOwner && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/books/${book.id}/edit`)}
                  >
                    수정하기
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      if (window.confirm("정말 삭제하시겠습니까?")) {
                        console.log("DELETE 요청:", book.id);
                        // TODO: axios.delete(`/api/v1/books/${book.id}`)
                        navigate("/books");
                      }
                    }}
                  >
                    삭제하기
                  </Button>
                </>
              )}
              <Button
                variant="outlined"
                size="small"
                onClick={() => navigate(-1)}
              >
                목록으로
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
