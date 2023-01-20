import { useRef } from "react";
import { Link } from "react-router-dom";

const Dropdown = ({ submenu, dropdown }) => {
  const inputFile = useRef(null);

  const openFile = (e) => {
    inputFile.current.click();
  };

  const uploadFile = (e) => {
    e.preventDefault();
    console.log(e);

    console.log(inputFile.current);
    const file = e.target.files[0];


    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        const fileData = reader.result;
        /***if (fileData) {
          const formData = new FormData();
          formData.append("file", file);
        }***/
      };
    }
  };
  return (
    <>
      <ul className={`dropdown ${dropdown ? "show" : ""}`}>
        {submenu.map((item, index) => (
          <li key={index} className="menu-item">
            {item.to === "uploadfile" ? (
              <Link to="#" onClick={(e) => openFile(e)}>
                {item.title}
              </Link>
            ) : (
              <Link to={item.to}>{item.title}</Link>
            )}
          </li>
        ))}
      </ul>
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={uploadFile}
        style={{ display: "none" }}
      />
    </>
  );
};

export default Dropdown;
