import React from "react";

const ListGroup = ({
  textProperty,
  valueProperty,
  items,
  selectedItem,
  onItemSelect,
}) => {
  const getClasses = (item) => {
    const classes =
      selectedItem === item ? "list-group-item active" : "list-group-item";
    return classes;
  };

  return (
    <ul className="list-group">
      {items.map((item) => {
        return (
          <li
            onClick={() => {
              onItemSelect(item);
            }}
            className={getClasses(item)}
            key={item[valueProperty]}
          >
            {item[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
