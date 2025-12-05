// src/components/books/BookCard.jsx
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";

export default function BookCard({
  id,
  title,
  author,
  description,
  thumbnail,
  createdAt,
}) {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/books/${id}`);

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        border: "1px solid #d5d5d5",
        overflow: "hidden",
        transition: "all 0.22s ease-out",
        minHeight: { xs: 0, sm: 170 }, // 모바일은 자동, sm부터 높이 확보
        "&:hover": {
          boxShadow: "0 6px 18px rgba(0,0,0,0.10)",
          borderColor: "transparent",
          transform: "translateY(-3px)",
        },
      }}
    >
      <CardActionArea onClick={handleClick} sx={{ height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 1.5, sm: 2 },
            height: "100%",
          }}
        >
          
          {/* 🔥 썸네일 크게 */}
          {thumbnail && (
            <CardMedia
              component="img"
              image={thumbnail}
              alt={title}
              sx={{
                width: { xs: "100%", sm: 120 },   // 모바일 전체폭, sm부터 고정폭
                height: { xs: 200, sm: 160 },
                maxHeight: { xs: 220, sm: "none" },
                padding: 1,
                objectFit: "cover",
                borderRadius: 2,
              }}
            />
          )}

          {/* 텍스트 영역 */}
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: { xs: 1, sm: 1.2 },
              py: 1.5,
              px: { xs: 1, sm: 1.5 },
            }}
          >
            <Typography variant="h6" fontWeight={700}>
              {title}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              저자: {author}
            </Typography>

            {/* 설명 – 3줄 정도로 늘림 */}
            {description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: { xs: 4, sm: 3 }, // 모바일 4줄, sm부터 3줄
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  lineHeight: 1.45,
                }}
              >
                {description}
              </Typography>
            )}

            {/* 하단 메타 정보 */}
            {createdAt && (
              <Box sx={{ mt: "auto", display: "flex", justifyContent: "flex-end" }}>
                <Typography variant="caption" color="text.disabled">
                  업로드: {createdAt}
                </Typography>
              </Box>
            )}
          </CardContent>
        </Box>
      </CardActionArea>
    </Card>
  );
}
