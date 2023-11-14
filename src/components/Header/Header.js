import "./Header.css";
import logo from "./vecteezy_quiz-neon-signs-style-text-vector_7834798.jpg";
function Header() {
  return (
    <>
      <header className="app-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="90"
          viewBox="0 0 50 90"
          fill="none"
          className="elipse-1"
        >
          <circle cx="0" cy="45" r="45" fill="#4E5085" fillOpacity="0.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="90"
          height="56"
          viewBox="0 0 90 56"
          fill="none"
          className="elipse-2"
        >
          <circle cx="45" cy="11" r="45" fill="#1C7FAB" fillOpacity="0.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="elipse-3"
        >
          <circle cx="20" cy="20" r="20" fill="#4E5085" fillOpacity="0.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="58"
          height="90"
          viewBox="0 0 58 90"
          fill="none"
          className="elipse-4"
        >
          <circle cx="45" cy="45" r="45" fill="#1C7FAB" fillOpacity="0.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="elipse-5"
        >
          <circle cx="20" cy="20" r="20" fill="#1C7FAB" fillOpacity="0.5" />
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="elipse-6"
        >
          <circle cx="20" cy="20" r="20" fill="#4E5085" fillOpacity="0.5" />
        </svg>

        <div className="logo-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="175"
            height="175"
            viewBox="0 0 175 175"
            fill="none"
            className="elipse-center-1"
          >
            <circle
              cx="87.5"
              cy="87.5"
              r="87.5"
              fill="#4E5085"
              fillOpacity="0.3"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="139"
            height="139"
            viewBox="0 0 139 139"
            fill="none"
            className="elipse-center-2"
          >
            <circle
              cx="69.5"
              cy="69.5"
              r="69.5"
              fill="#4E5085"
              fillOpacity="0.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="116"
            height="116"
            viewBox="0 0 116 116"
            fill="none"
            className="elipse-center-3"
          >
            <circle cx="58" cy="58" r="58" fill="white" />
          </svg>

          <img src={logo} alt="quiz" className="logo" />
        </div>
      </header>
    </>
  );
}

export default Header;
