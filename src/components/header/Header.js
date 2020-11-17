import React from "react";
import Link from "../router/Link";
const Header = () => {
    return (
        <div className="ui secondarypointing menu">
            <Link href="/" className="item">
                Path finding
      </Link>
            <Link href="/sortingvisualizer" className="item">
                sorting visualizer
      </Link>
        </div>
    );
};

export default Header;
