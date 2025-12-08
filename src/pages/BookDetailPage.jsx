// src/pages/BookDetailPage.jsx
import { useEffect, useState } from "react";
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
  Alert,
  Stack,
} from "@mui/material";

const API_BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;

export default function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);

  // ✅ 로그인한 사용자 ID (localStorage에 "userId"가 "1" 이런 식으로 들어있다고 가정)
  const rawUserId = localStorage.getItem("userId"); // 문자열 또는 null
  const currentUserId = rawUserId != null ? Number(rawUserId) : null;

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchBook = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/books/${id}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        console.log("BOOK DETAIL RES:", res);

        if (res.status === 401) {
          setError("도서 정보를 보려면 로그인이 필요합니다.");
          setLoading(false);
          return;
        }
        if (res.status === 404) {
          setError("도서를 찾을 수 없습니다.");
          setLoading(false);
          return;
        }
        if (res.status === 403) {
          setError("열람 권한이 없습니다.");
          setLoading(false);
          return;
        }
        if (!res.ok) throw new Error("도서 정보를 불러오지 못했습니다.");

        const raw = await res.json();
        console.log("BOOK DETAIL RAW:", raw);

        // { status, message, data: {...} } 구조 언패킹
        const data = raw?.data ?? raw;

        const thumbnail =
          data.coverUrl || data.coverImageUrl || data.thumbnail || "";

        setBook({
          ...data,
          thumbnail,
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("도서 정보를 불러오지 못했습니다.");
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  // ✅ 내가 작성한 책인지 여부 (숫자 vs 숫자 비교)
  const isOwner =
    book != null &&
    currentUserId != null &&
    Number(book.userId) === currentUserId;

  console.log("IS OWNER:", isOwner);
  console.log("CURRENT USER ID:", currentUserId);
  console.log("BOOK OWNER ID:", book?.userId);

  // ✅ 삭제 처리
  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    setDeleting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/books/${id}`, {
        method: "DELETE",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (res.status === 401) {
        setError("도서를 삭제하려면 로그인이 필요합니다.");
        return;
      }
      if (res.status === 404) {
        setError("도서를 찾을 수 없습니다.");
        return;
      }
      if (res.status === 403) {
        setError("삭제 권한이 없습니다.");
        return;
      }
      if (!res.ok) throw new Error("도서 삭제 중 오류가 발생했습니다.");

      navigate("/books");
    } catch (err) {
      console.error(err);
      setError("도서 삭제 중 오류가 발생했습니다.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
        <Typography variant="h6">도서 정보를 불러오는 중입니다...</Typography>
      </Box>
    );
  }

  if (error || !book) {
    return (
      <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto", px: 2, py: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || "도서를 찾을 수 없습니다."}
        </Alert>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          돌아가기
        </Button>
      </Box>
    );
  }

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
          flexWrap: "wrap",
          rowGap: 1,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {book.author}
          </Typography>
        </Box>

        <Box sx={{ textAlign: { xs: "left", sm: "right" } }}>
          {book.genre && (
            <Chip
              label={book.genre}
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, mb: 0.5 }}
            />
          )}
          {book.createdAt && (
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
            >
              업로드: {book.createdAt}
            </Typography>
          )}
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

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
        {book.thumbnail && (
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
        )}

        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            p: 3,
          }}
        >
          <Stack spacing={1.5}>
            {book.genre && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  장르
                </Typography>
                <Typography variant="body1">{book.genre}</Typography>
              </Box>
            )}

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                저자
              </Typography>
              <Typography variant="body1">{book.author}</Typography>
            </Box>

            {book.description && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  gutterBottom
                >
                  책 소개
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ whiteSpace: "pre-line", lineHeight: 1.6 }}
                >
                  {book.description}
                </Typography>
              </Box>
            )}
          </Stack>

          <Box
            sx={{
              mt: "auto",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              flexWrap: "wrap",
              rowGap: 1,
              gap: 1,
            }}
          >
            {/* ✅ 내가 쓴 책일 때만 수정/삭제 버튼 노출 */}
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
                  onClick={handleDelete}
                  disabled={deleting}
                >
                  {deleting ? "삭제 중..." : "삭제하기"}
                </Button>
              </>
            )}

            <Button variant="outlined" size="small" onClick={() => navigate(-1)}>
              목록으로
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
