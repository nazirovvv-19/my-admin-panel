// import { Button, Form, Input, message } from "antd";
// import api from "../api/Api";
// import useGlobalStore from "../store/store";

// function Login() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
//         <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
//           Login
//         </h2>

//         <Form className="space-y-4" onFinish={(values)=>{
//             console.log('values',values);
//             api.post('/api/auth/login',values).then((res)=>{
//                 console.log(res.data);
//                 message.success('muvaffaqiyatli bajarildi')
//                 useGlobalStore.setState({
//                   accessToken:res.data.accessToken,
//                   user:res.data.user
//                 })
//                 api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`
//                 localStorage.setItem('auth',JSON.stringify(res.data))

//             }).catch(e=>{
//                 message.error('xatolik boldi')
//                 console.log(e);

//             })

//         }}>
//           <Form.Item
//             label="Username"
//             name="email"
//             rules={[{ required: true, message: "Please input your username!" }]}
//           >
//             <Input
//               placeholder="Enter your username"
//               className="border-2 border-gray-300 rounded-md p-2"
//             />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[{ required: true, message: "Please input your password!" }]}
//           >
//             <Input.Password
//               placeholder="Enter your password"
//               className="border-2 border-gray-300 rounded-md p-2"
//             />
//           </Form.Item>

//           <Form.Item>
//             <Button
//                 htmlType="submit"
//               type="primary"
//               block
//               className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 rounded-md"
//             >
//               Login
//             </Button>
//           </Form.Item>

//           <div className="flex justify-between text-sm text-gray-600">
//             <a href="#" className="hover:text-blue-600">
//               Forgot Password?
//             </a>
//             <a href="#" className="hover:text-blue-600">
//               Sign Up
//             </a>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { Button, Form, Input, message } from "antd";
import api from "../api/Api";
import useGlobalStore from "../store/store";
import { useEffect, useRef } from "react";
import logo1 from "../assets/logo.png"; // Replace with your actual logo paths
import logo2 from "../assets/logo.png";
import logo3 from "../assets/logo.png";
import logo4 from "../assets/logo.png";
import logo5 from "../assets/logo.png";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LogoConfig {
  src: string;
  size: string;
  speed: number;
  rotationSpeed: number;
  delay: number;
  opacity: number;
}

function Login() {
  const [form] = Form.useForm<LoginFormValues>();
  const iconsRef = useRef<HTMLDivElement[]>([]);

  const logoConfigs: LogoConfig[] = [
    {
      src: logo1,
      size: "w-16 h-16",
      speed: 0.3,
      rotationSpeed: 0.2,
      delay: 0,
      opacity: 0.4,
    },
    {
      src: logo2,
      size: "w-20 h-20",
      speed: 0.5,
      rotationSpeed: 0.3,
      delay: 1000,
      opacity: 0.5,
    },
    {
      src: logo3,
      size: "w-14 h-14",
      speed: 0.4,
      rotationSpeed: 0.4,
      delay: 2000,
      opacity: 0.3,
    },
    {
      src: logo4,
      size: "w-24 h-24",
      speed: 0.2,
      rotationSpeed: 0.1,
      delay: 3000,
      opacity: 0.6,
    },
    {
      src: logo5,
      size: "w-18 h-18",
      speed: 0.6,
      rotationSpeed: 0.5,
      delay: 4000,
      opacity: 0.4,
    },
  ];

  useEffect(() => {
    const animationIds: number[] = [];
    const startTimes: number[] = [];

    const animateIcons = (timestamp: number, index: number) => {
      const icon = iconsRef.current[index];
      if (!icon) return;

      if (!startTimes[index]) {
        startTimes[index] = timestamp;
      }

      const elapsed = timestamp - startTimes[index];
      const config = logoConfigs[index];

      // Only start animating after the delay
      if (elapsed < config.delay) {
        animationIds[index] = requestAnimationFrame((ts) =>
          animateIcons(ts, index)
        );
        return;
      }

      const rect = icon.getBoundingClientRect();

      // Reset position if icon goes below viewport
      if (rect.top > window.innerHeight) {
        icon.style.top = `-${rect.height}px`;
        icon.style.left = `${Math.random() * 80 + 10}%`;
      }

      // Current positions
      const currentTop = parseFloat(icon.style.top || "0");
      const currentRotation = parseFloat(icon.style.rotate || "0");

      // Update positions
      icon.style.top = `${currentTop + config.speed}px`;
      icon.style.rotate = `${currentRotation + config.rotationSpeed}deg`;

      animationIds[index] = requestAnimationFrame((ts) =>
        animateIcons(ts, index)
      );
    };

    // Start animations for each logo
    logoConfigs.forEach((_, index) => {
      animationIds[index] = requestAnimationFrame((ts) =>
        animateIcons(ts, index)
      );
    });

    return () => {
      // Clean up all animation frames
      animationIds.forEach((id) => cancelAnimationFrame(id));
    };
  }, []);

  const onFinish = async (values: LoginFormValues) => {
    try {
      const res = await api.post("/api/auth/login", values);
      message.success("muvaffaqiyatli bajarildi");

      useGlobalStore.setState({
        accessToken: res.data.accessToken,
        user: res.data.user,
      });

      api.defaults.headers.Authorization = `Bearer ${res.data.accessToken}`;
      localStorage.setItem("auth", JSON.stringify(res.data));
    } catch (e) {
      message.error("xatolik boldi");
      console.error(e);
    }
  };

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      iconsRef.current[index] = el;
      // Set initial random horizontal position and start above viewport
      el.style.left = `${Math.random() * 80 + 10}%`;
      el.style.top = `${Math.random() * -100}px`;
      el.style.opacity = "0"; // Start invisible

      // Fade in after delay
      setTimeout(() => {
        el.style.transition = `opacity 1s ease-in`;
        el.style.opacity = `${logoConfigs[index].opacity}`;
      }, logoConfigs[index].delay);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      {/* Floating Logos in Background */}
      {logoConfigs.map((config, index) => (
        <div
          key={`logo-${index}`}
          ref={(el) => addToRefs(el, index)}
          className={`absolute ${config.size} transition-all duration-1000 will-change-transform`}
          style={{ opacity: 0 }} // Initial opacity set to 0 (will fade in)
        >
          <img
            src={config.src}
            alt={`Logo ${index + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
      ))}

      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 z-10">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Login
        </h2>

        <Form<LoginFormValues>
          form={form}
          className="space-y-4"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input
              placeholder="Enter your username"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              className="border-2 border-gray-300 rounded-md p-2"
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              block
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-2 rounded-md"
            >
              Login
            </Button>
          </Form.Item>

          <div className="flex justify-between text-sm text-gray-600">
            <a href="#" className="hover:text-blue-600">
              Forgot Password?
            </a>
            <a href="#" className="hover:text-blue-600">
              Sign Up
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
