import { useState } from "react";
import { Button, Form, Input } from "antd";
import api from "../../config/axios.js";


function RecoverPage() {

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await api.post('v1/auth/reset-password', { email }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            // Kiểm tra trạng thái phản hồi từ server
            if (response.status === 200) {
                setMessage('Email sent. Please check!!');
            } else {
                throw new Error('Failed to send email');
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                // Nếu server trả về thông báo lỗi cụ thể
                setMessage(error.response.data.message);
            } else {
                // Lỗi chung chung
                setMessage(error.message || 'Failed to send email');
            }
        }
    }

    return (
        <div className="w-full h-full min-w-fit flex items-center min-h-screen bg-cover bg-center bg-no-repeat sm:bg-[url('https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740184/live-koi-fish-mtvpcoc3yknxrj5g_fsuwik.jpg')]">
            <div className="w-full h-full sm:min-w-[640px] min-h-[640px] sm:w-1/2 sm:h-1/2 bg-white rounded-3xl mx-auto my-14">

                <h1 className="mt-14 mb-16 text-4xl font-extrabold text-center">Reset account password</h1>
                <p className="text-center mb-16 font-medium">Please enter your email to search for your account</p>

                <div className="px-20">
                    <Form labelCol={{ span: 24 }} onFinish={handleSubmit}>
                        <Form.Item
                            label={
                                <label className="mb-1 font-extrabold block">
                                    Enter your email
                                </label>
                            }
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email!",
                                },
                                {
                                    type: "email",
                                    message: 'The input is not valid Email!',
                                }
                            ]}
                        >
                            <div className="mx-5 mb-2">
                                <Input className="my-4 py-3 border border-black focus:border-black hover:border-black rounded-2xl focus:shadow-lg shadow-lg"
                                    placeholder="ABC123@gmail.com"
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </Form.Item>

                        <Form.Item>
                            <div className="flex justify-end mt-20">
                                <Button
                                    className="w-full sm:w-1/4 h-12 border rounded-[32px] bg-white text-black"
                                    style={{
                                        border: '1px solid gray'
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.backgroundColor = 'gray'; // Màu xám
                                        e.currentTarget.style.color = 'white'; // Chữ trắng
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.backgroundColor = 'white'; // Trở lại màu trắng
                                        e.currentTarget.style.color = 'black'; // Trở lại chữ đen
                                    }}
                                    onClick={() => window.location.href = "/login"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    variant='solid'
                                    style={{
                                        backgroundColor: '#d9534f'
                                    }}
                                    className="w-full sm:w-1/4 ml-4 rounded-[32px] h-12"
                                >
                                    Send email
                                </Button>
                            </div>
                        </Form.Item>

                        {message && (
                            <p className="text-center mt-4 font-semibold text-red-500">
                                {message}
                            </p>
                        )}

                    </Form>
                </div>

            </div>
        </div>
    );
}

export default RecoverPage;
