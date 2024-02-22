import React, { useState } from "react";
import "./admin-form.styles.scss";
import { useClickOutside } from "../../../../hooks/useClickOutside";
import { Meal } from "../../../../redux/meals/meals-actions";

export interface AdminFormProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isTypeEdit: boolean;
  setIsTypeEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminForm: React.FC<AdminFormProps> = ({
  isOpen,
  setIsOpen,
  isTypeEdit,
}) => {
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });

  const [inputValue, setInputValue] = useState<Partial<Meal>>({
    name: "",
    price: 0,
    available: 0,
    imgUrl: "",
    categories: [],
  });

  const { name, price, available, imgUrl } = inputValue;
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.currentTarget;
    setInputValue({
      ...inputValue,
      [name]: type === "number" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // SEND REQUESTS TO THE ENPOINT
    setInputValue({
      ...inputValue,
      name: "",
      price: 0,
      available: 0,
      imgUrl: "",
      categories: [],
    });
    console.log(inputValue);
  };

  const handleCancel = () => {
    setIsOpen(false);
    setInputValue({
      ...inputValue,
      name: "",
      price: 0,
      available: 0,
      imgUrl: "",
      categories: [],
    });
  };

  return (
    <div
      className={isOpen ? "admin-form__container" : "admin-form__closed"}
      ref={ref}
    >
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2>{isTypeEdit ? "Edit dish" : "Add new dish"}</h2>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Enter name"
          className="admin-form__input"
          onChange={handleOnChange}
        />
        <input
          type="number"
          name="price"
          value={price?.toString()}
          placeholder="Enter price"
          className="admin-form__input"
          onChange={handleOnChange}
        />
        <input
          type="number"
          name="available"
          value={available?.toString()}
          placeholder="Enter available"
          className="admin-form__input"
          onChange={handleOnChange}
        />
        <input
          type="text"
          name="imgUrl"
          value={imgUrl}
          placeholder="Enter imgURL"
          className="admin-form__input"
          onChange={handleOnChange}
        />
        <div className="admin-form__footer">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">{isTypeEdit ? "Edit" : "Add"}</button>
        </div>
      </form>
    </div>
  );
};

export default AdminForm;
