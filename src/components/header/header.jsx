import React from 'react';
import { Link } from "react-router-dom";

import "./header.scss";

export const Header = () => {
  return (
    <header className="app-header">
      <div className="app-logo">
        <div className="app-logo__img"></div>
        <Link to="/" className="app-logo__link">WA</Link>
      </div>
    </header>
  )
}