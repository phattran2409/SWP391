// eslint-disable-next-line no-unused-vars
import React from "react";
// import "./register.scss";
import { useState } from "react";
import { Button, Divider, Form, Input, Select } from "antd";
<<<<<<< HEAD


const { Option } = Select;  // Thay đổi ở đây

function RegisterPage() {
  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [Year, setYear] = useState()
  const [email, setEmail] = useState()
  const [Phone, setPhone] = useState()
  const [password, setPassword] = useState()



=======
// import Link from "antd/es/typography/Link";
import { Link, useNavigate } from "react-router-dom";
import api from "../../config/axios";
import { toast } from "react-toastify";

const { Option } = Select; // Thay đổi ở đây

function RegisterPage() {
  const [name, setName] = useState();
  const [gender, setGender] = useState();
  const [Year, setYear] = useState();
  const [email, setEmail] = useState();
  const [Phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleRegister = async (values) => {
    //submit xuong backend
    try {
      values.role = "CUSTOMER"; //cho nay dang de tam la customer de test
      const response = await api.post("/v1/auth/register", values);
      toast.success("Successfully register new account!");
      navigate("/login");

    } catch (err) {
      // console.log
      toast.error(err.response.data);
    }
  };
>>>>>>> 62e274878aab737080067527491c7915c0644949

  return (
    <div className="w-full h-full flex items-center min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/ddqgjy50x/image/upload/v1726740184/live-koi-fish-mtvpcoc3yknxrj5g_fsuwik.jpg')]">
      <div className="w-full max-w-2xl lg:max-w-3xl bg-white mx-auto rounded-3xl my-14">
        <div className="px-20">
<<<<<<< HEAD
          <h1 className="text-3xl font-normal mb-4 text-center mt-7">Sign up</h1>
          <Button className="google-button h-14 mb-0" >
=======
          <h1 className="text-3xl font-normal mb-4 text-center mt-7">
            Sign up
          </h1>
          <Button className="google-button h-14 mb-0">
>>>>>>> 62e274878aab737080067527491c7915c0644949
            <svg width="24" height="24" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18"
              />
              <path
                fill="#34A853"
                d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17"
              />
              <path
                fill="#FBBC05"
                d="M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z"
              />
              <path
                fill="#EA4335"
                d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3"
              />
            </svg>
            <h2 className="font-normal text-base">Continue with Google</h2>
          </Button>
<<<<<<< HEAD
          <Divider style={{ marginTop: '5' }}>
            <span className="font-light">OR</span>
          </Divider >
        </div>
        <div className="px-28 ">
          <Form labelCol={{ span: 24 }} >
            <Form.Item
              name="username"
              label={<span className="text-[#716767] pb-0">Username</span>}
              rules={[{ required: true, message: 'Please input your username!' }]}

            >
              <Input
                onChange={(e) => setName(e.target.value)}
              />
=======
          <Divider style={{ marginTop: "0" }}>
            <span className="font-light">OR</span>
          </Divider>
        </div>
        <div className="px-28 ">
          <Form labelCol={{ span: 24 }} onFinish={handleRegister}>
            <Form.Item
              name="userName"
              label={<span className="text-[#716767] pb-0">Username</span>}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="name"
              label={<span className="text-[#716767] pb-0">Full Name</span>}
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input onChange={(e) => setName(e.target.value)} />
>>>>>>> 62e274878aab737080067527491c7915c0644949
            </Form.Item>
            <div className="flex space-x-4">
              <Form.Item
                name="gender"
                label={<span className="custom-label">Gender</span>}
                className="w-1/2"
<<<<<<< HEAD
                rules={[{ required: true, message: 'Please select gender!' }]}
              >
                <Select placeholder="Select"
                  onChange={(value) => setGender(value)}
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select >
              </Form.Item>
              <Form.Item
                name="yearOfBirth"
                label={<span className="custom-label">Year of birth</span>}
                className="w-1/2"
                rules={[
                  { required: true, message: 'Please input your year of birth!' },
                  {
                    validator: (_, value) => {
                      if (value && isNaN(Number(value))) {
                        return Promise.reject(new Error('Year of birth must be a number!'));
                      }
                      const year = Number(value);
                      if (year < 1900 || year > 2050) {
                        return Promise.reject(new Error('Year of birth must be between 1900 and 2050!'));
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <Input placeholder="YYYY"
                  onChange={(e) => setYear(e.target.value)} />
=======
                rules={[{ required: true, message: "Please select gender!" }]}
              >
                <Select
                  placeholder="Select"
                  onChange={(value) => setGender(value)}
                >
                  <Option value="0">Male</Option>
                  <Option value="1">Female</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="birthDate"
                label={<span className="custom-label">Year of birth</span>}
                className="w-1/2"
                rules={[
                  {
                    required: true,
                    message: "Please input your year of birth!",
                  },
                  {
                    validator: (_, value) => {
                      if (value && isNaN(Number(value))) {
                        return Promise.reject(
                          new Error("Year of birth must be a number!")
                        );
                      }
                      const year = Number(value);
                      if (year < 1900 || year > 2050) {
                        return Promise.reject(
                          new Error(
                            "Year of birth must be between 1900 and 2050!"
                          )
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input
                  placeholder="YYYY"
                  onChange={(e) => setYear(e.target.value)}
                />
>>>>>>> 62e274878aab737080067527491c7915c0644949
              </Form.Item>
            </div>
            <Form.Item
              name="email"
              label={<span className="custom-label">Email address</span>}
              rules={[
                {
<<<<<<< HEAD
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}

            >
              <Input
                onChange={(e) => setEmail(e.target.value)}
              />
=======
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
>>>>>>> 62e274878aab737080067527491c7915c0644949
            </Form.Item>
            <Form.Item
              name="phone"
              label={<span className="custom-label">Phone number</span>}
              rules={[
                {
                  required: true,
<<<<<<< HEAD
                  message: 'Please Input Your Phone Number!',
=======
                  message: "Please Input Your Phone Number!",
>>>>>>> 62e274878aab737080067527491c7915c0644949
                },
                {
                  validator: (_, value) => {
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phoneRegex.test(value)) {
<<<<<<< HEAD
                      return Promise.reject(new Error('Please enter a valid phone number with 10 digits!'));
=======
                      return Promise.reject(
                        new Error(
                          "Please enter a valid phone number with 10 digits!"
                        )
                      );
>>>>>>> 62e274878aab737080067527491c7915c0644949
                    }

                    // Nếu tất cả các điều kiện đều hợp lệ
                    return Promise.resolve();
                  },
                },
              ]}
<<<<<<< HEAD
              validateTrigger={['onBlur', 'onPressEnter']}
            >
              <Input
                onChange={(e) => setPhone(e.target.value)}
              />
=======
              validateTrigger={["onBlur", "onPressEnter"]}
            >
              <Input onChange={(e) => setPhone(e.target.value)} />
>>>>>>> 62e274878aab737080067527491c7915c0644949
            </Form.Item>
            <Form.Item
              name="password"
              label={<span className="custom-label ">Password</span>}
              rules={[
                {
                  required: true,
<<<<<<< HEAD
                  message: 'Please input your password!',

=======
                  message: "Please input your password!",
>>>>>>> 62e274878aab737080067527491c7915c0644949
                },

                {
                  min: 6,
                  max: 20,
<<<<<<< HEAD
                  message: 'Password must be between 6 and 20 characters!',
=======
                  message: "Password must be between 6 and 20 characters!",
>>>>>>> 62e274878aab737080067527491c7915c0644949
                },
              ]}
              hasFeedback
            >
<<<<<<< HEAD
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="c-password"
=======
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="c_password"
>>>>>>> 62e274878aab737080067527491c7915c0644949
              label={<span className="custom-label ">Confirm password</span>}
              rules={[
                {
                  required: true,
<<<<<<< HEAD
                  message: 'Please input your Confirm password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords do not match!'));
=======
                  message: "Please input your Confirm password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords do not match!")
                    );
>>>>>>> 62e274878aab737080067527491c7915c0644949
                  },
                }),
              ]}
              hasFeedback
            >
<<<<<<< HEAD
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginTop: '28px' }}>
              <Button className="mt-5"
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: 'gray',
                  color: 'white',
                  border: 'none',
                  borderRadius: '2rem',
                  width: '100%',
                  height: '50px',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'red'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'gray'}
=======
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item style={{ marginTop: "28px" }}>
              <Button
                className="mt-5"
                type="primary"
                htmlType="submit"
                style={{
                  backgroundColor: "gray",
                  color: "white",
                  border: "none",
                  borderRadius: "2rem",
                  width: "100%",
                  height: "50px",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "red")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "gray")
                }
>>>>>>> 62e274878aab737080067527491c7915c0644949
              >
                Sign up
              </Button>
            </Form.Item>
<<<<<<< HEAD
=======
            <Link to="/login">Already have Account? Go to Login!</Link>
>>>>>>> 62e274878aab737080067527491c7915c0644949
          </Form>
        </div>
      </div>
    </div>
<<<<<<< HEAD

  )
=======
  );
>>>>>>> 62e274878aab737080067527491c7915c0644949
}

export default RegisterPage;
