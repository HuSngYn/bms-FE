// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AivleLogo from '../assets/aivle_logo.png';


const API_BASE_URL = "/api/v1/auth"; // TODO: 백엔드 준비 후 실제 요청 테스트 필요 (POST /api/v1/auth/register)

export default function SignupPage() {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });

    const [isEmailChecked, setIsEmailChecked] = useState(false);

    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'email') {
            setIsEmailChecked(false);
        }
    };

    const handleCheckEmail = async () => {
        setError('');

        if (!formData.email) {
            setError("이메일을 먼저 입력해주세요.");
            return;
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.name || !formData.email || !formData.password) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        if (!isEmailChecked) {
            setError("이메일 중복 확인을 해주세요.");
            return;
        }

        if (formData.password !== formData.passwordConfirm) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const dataToSend = {
            email: formData.email,
            password: formData.password,
            name: formData.name
        };

        try {
            console.log("서버로 전송할 데이터:", dataToSend);

            // TODO: 백엔드 연결 후 주석 해제하여 회원가입 요청 테스트
            /*
            const res = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            if (!res.ok) {
                if (res.status === 409) setError("이미 등록된 이메일입니다.");
                else setError("회원가입 중 오류가 발생했습니다.");
                return;
            }
            */

            alert("회원가입 성공! 로그인 페이지로 이동합니다. (백엔드 연결 후 실 테스트 필요)");
            navigate('/login');

        } catch (err) {
            console.error(err);
            setError("회원가입 실패. 다시 시도해주세요.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8, display: 'flex', justifyContent: 'center' }}>
            <Paper elevation={3} sx={{ p: 5, width: '100%', borderRadius: 4, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <img
                                        src={AivleLogo}
                                        alt="AIVLE Logo"
                                        style={{ width: 200, height: 'auto' }}
                                    />
                                </Box>
                                <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
                                    AIVLE 도서관리 시스템
                                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSignup} noValidate>


                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mt: 2, mb: 1 }}>
                        <TextField
                            required fullWidth
                            label="이메일 (ID)" name="email" type="email"
                            value={formData.email} onChange={handleChange}
                            sx={{ flex: 1, backgroundColor: isEmailChecked ? '#e8f5e9' : 'inherit' }}
                        />
                        <Button
                            variant="outlined"
                            sx={{ height: 56, whiteSpace: 'nowrap' }}
                            onClick={handleCheckEmail}
                        >
                            중복확인
                        </Button>
                    </Box>
                    {isEmailChecked && (
                        <Typography variant="caption" color="success.main" display="block" textAlign="left" sx={{ mb: 1 }}>
                            사용 가능한 이메일입니다.
                        </Typography>
                    )}

                    <TextField
                        margin="normal" required fullWidth
                        label="비밀번호" name="password" type="password"
                        value={formData.password} onChange={handleChange}
                    />

                    <TextField
                        margin="normal" required fullWidth
                        label="비밀번호 확인" name="passwordConfirm" type="password"
                        value={formData.passwordConfirm} onChange={handleChange}
                        error={formData.password !== formData.passwordConfirm && formData.passwordConfirm.length > 0}
                        helperText={formData.password !== formData.passwordConfirm && formData.passwordConfirm.length > 0 ? "비밀번호가 일치하지 않습니다." : ""}
                    />

                    <TextField
                        margin="normal" required fullWidth
                        label="이름" name="name" autoFocus
                        value={formData.name} onChange={handleChange}
                    />

                    <Button
                        type="submit" fullWidth variant="contained"
                        sx={{ mt: 4, mb: 2, py: 1.5, fontSize: '1.1rem', fontWeight: 'bold' }}
                    >
                        SignUp
                    </Button>

                </Box>
            </Paper>
        </Container>
    );
};
