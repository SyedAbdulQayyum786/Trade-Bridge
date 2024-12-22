import React from "react";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        <a href="/" className="not-found-link">
          Go to Home
        </a>
      </p>
    </div>
  );
}
