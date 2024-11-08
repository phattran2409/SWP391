import React from "react";
import { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { useNavigate, useLocation } from "react-router-dom"; // Ensure useLocation is imported

import api from "../../config/axios.js";
function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  // Optional: Handle the case where token is missing
  if (!token) {
    notification.error({
      message: 'Invalid Request',
      description: 'No token provided. Please initiate the password reset process again.',
    });
    navigate('/forget'); // Redirect to forgot password page
    return null;
  }

  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    const { newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'The passwords you entered do not match.',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('v1/auth/resetNewPass', { token, password: newPassword });

      notification.success({
        message: 'Success',
        description: 'Your password has been reset successfully. Redirecting to login...',
      });

      // Redirect to login after a short delay
      setTimeout(() => navigate('/login'), 5173);
    } catch (err) {
      notification.error({
        message: 'Error',
        description: err.response?.data || 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-w-fit flex items-center min-h-screen bg-cover bg-center bg-no-repeat sm:bg-[url('https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740184/live-koi-fish-mtvpcoc3yknxrj5g_fsuwik.jpg')]">
      <div className="w-full h-full sm:min-w-[640px] min-h-[640px] sm:w-1/2 sm:h-1/2 bg-white rounded-3xl mx-auto my-14 ">
        <h1 className="mt-14 mb-14 text-4xl font-extrabold text-center">Reset Account Password</h1>
        <p className="text-center mb-16 font-medium">Please enter your new password for your account</p>

        <div className="px-28">
          <Form
            labelCol={{ span: 24 }}
            onFinish={handleFinish}
            layout="vertical"
          >
            <Form.Item
              name="newPassword"
              label={<label className="font-extrabold">New Password</label>}
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
                {
                  min: 6,
                  max: 20,
                  message: 'Password must be between 6 and 20 characters!',
                },
              ]}
              hasFeedback
            >
              <Input.Password
                className="mb-4 py-3 border border-black focus:border-black hover:border-black rounded-2xl focus:shadow-lg"
                placeholder="Enter your new password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={<label className="font-extrabold">Confirm Password</label>}
              dependencies={['newPassword']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
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
                className="mb-4 py-3 border border-black focus:border-black hover:border-black rounded-2xl focus:shadow-lg"
                placeholder="Confirm your new password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                variant="solid"
                style={{ backgroundColor: '#d9534f' }}
                className="w-full h-12 rounded-[32px]"
                loading={loading}
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
