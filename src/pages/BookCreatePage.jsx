// src/pages/BookCreatePage.jsx
import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  Stack,
  Alert,
} from "@mui/material";

const categories = [
  "소설",
  "에세이",
  "추리",
  "판타지",
  "로맨스",
  "인문",
  "자기계발",
  "경제/경영",
  "과학/기술",
  "역사/문화",
];

const initialForm = {
  title: "",
  subTitle: "",
  description: "",
  category: "",
};

export default function BookCreatePage() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!form.title.trim()) next.title = "제목은 필수입니다.";
    if (!form.description.trim()) next.description = "소개는 필수입니다.";
    if (!form.category) next.category = "카테고리를 선택해 주세요.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("서버 오류");

      setMessage("도서가 정상적으로 등록되었습니다.");
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setMessage("등록 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // 🔵 오른쪽 메인 영역 안에서 카드 자체를 가운데 정렬
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 3 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Paper
        sx={{
          width: "100%",
          p: { xs: 3, md: 4 },
          borderRadius: 2,
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography variant="h5" fontWeight={700} gutterBottom>
          도서 등록
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          읽은 책을 기록하고 다른 사람들과 정보를 공유해보세요.
        </Typography>

        <Stack component="form" spacing={2.5} onSubmit={handleSubmit}>
          {/* 제목 */}
          <TextField
            label="제목 *"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="제목을 입력해주세요."
            fullWidth
            size="small"
            error={Boolean(errors.title)}
            helperText={errors.title || " "}
          />

          {/* 부제목 */}
          <TextField
            label="부제목"
            name="subTitle"
            value={form.subTitle}
            onChange={handleChange}
            placeholder="부제목이 있을 경우 입력해주세요."
            fullWidth
            size="small"
          />

          {/* 소개 */}
          <TextField
            label="책 소개 *"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="책에 대한 소개를 작성해주세요."
            fullWidth
            multiline
            minRows={4}
            size="small"
            error={Boolean(errors.description)}
            helperText={errors.description || " "}
          />

          {/* 카테고리 */}
          <FormControl
            fullWidth
            size="small"
            error={Boolean(errors.category)}
          >
            <InputLabel id="category-label">카테고리 *</InputLabel>
            <Select
              labelId="category-label"
              label="카테고리 *"
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.category ? errors.category : " "}
            </FormHelperText>
          </FormControl>

          {/* 버튼 + 메시지 */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              disabled={submitting}
              sx={{ alignSelf: "flex-end", minWidth: 140 }}
            >
              {submitting ? "등록 중..." : "등록하기"}
            </Button>

            {message && (
              <Alert
                severity={
                  message.includes("정상") || message.includes("성공")
                    ? "success"
                    : "error"
                }
              >
                {message}
              </Alert>
            )}
          </Box>  
        </Stack>
      </Paper>
    </Box>
  );
}
