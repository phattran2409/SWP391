import { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function ResetPasswordPage() {
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();



    const resetPasswordAPI = async (newPassword) => {
        const response = await axios.post(`http://localhost:8081/v1/auth/reset-password/${token}`, { newPassword });
        return response.data;
    };

    const { token } = useParams();

    const handleResetPassword = async (values) => {
        try {
            // Gọi API để khôi phục mật khẩu
            await resetPasswordAPI(values.newPassword, token); // Giả sử resetPasswordAPI là hàm gọi API của bạn
            notification.success({
                message: "Khôi phục mật khẩu thành công!",
                description: "Mật khẩu của bạn đã được cập nhật. Bạn có thể đăng nhập bằng mật khẩu mới.",
            });
            navigate("/login"); // Chuyển hướng về trang đăng nhập
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: "Có lỗi xảy ra khi khôi phục mật khẩu.",
            });
        }
    };

    return (
        <div className="w-full h-full min-w-fit flex items-center min-h-screen bg-cover bg-center bg-no-repeat sm:bg-[url('https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740184/live-koi-fish-mtvpcoc3yknxrj5g_fsuwik.jpg')]">
            <div className="w-full h-full sm:min-w-[640px] min-h-[640px]  sm:w-1/2 sm:h-1/2 bg-white rounded-3xl mx-auto my-14 ">
                <h1 className="mt-14 mb-14 text-4xl font-extrabold  text-center ">Reset account password</h1>
                <p className="text-center mb-16 font-medium ">Please enter your new passworrd for your account</p>


                <div className="px-28">
                    <Form labelCol={{ span: 24 }} onFinish={handleResetPassword}>
                        <Form.Item
                            name="newPassword"
                            label={
                                <label className=" font-extrabold block">
                                    New password
                                </label>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your new password!"
                                },
                                {
                                    min: 6,
                                    max: 20,
                                    message: 'Password must be between 6 and 20 characters!',
                                },
                            ]}
                        >
                            <Input.Password
                                className="mb-4 py-3 border border-black focus:border-black hover:border-black rounded-2xl focus:shadow-lg shadow-lg"
                                placeholder="ABC123@gmail.com"
                                onChange={(e) => setNewPassword(e.target.value)} />
                        </Form.Item>
                        <div className="mb-9">
                            <Form.Item
                                name="confirmPassword"
                                label={
                                    <label className=" font-extrabold block">
                                        Confirm password
                                    </label>
                                }
                                rules={[
                                    { required: true, message: "Please confirm your new password!" },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    className="mb-4 py-3 border border-black focus:border-black hover:border-black rounded-2xl focus:shadow-lg shadow-lg"
                                    placeholder="ABC123@gmail.com"
                                />
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <Button
                                type='primary   '
                                variant="solid"
                                color='danger'
                                htmlType="submit"
                                className="w-full h-12 rounded-[32px]"
                            >
                                Confirm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordPage;
