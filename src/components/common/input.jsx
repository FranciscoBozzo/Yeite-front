import React from "react";

const Input = ({ name, label, error, type, ...rest }) => {
  const typeFile = type === "file";

  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        type={type}
        name={name}
        id={name}
        hidden={typeFile}
        className="form-control"
      />
      {typeFile && <label htmlFor={name} className="form-control"></label>}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
