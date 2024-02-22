import { useState } from "react";
import "./settings.styles.scss";
import SectionBar from "./components/sections-bar/section-bar";
import SectionBox from "./components/section-box/section-box";
import AdminForm from "./components/form/admin-form";

const Settings = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isTypeEdit, setIsTypeEdit] = useState<boolean>(false);
  return (
    <div className="settings">
      <div className="page__title">Settings</div>
      <div className="page__body">
        <SectionBar />
        <SectionBox
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isTypeEdit={isTypeEdit}
          setIsTypeEdit={setIsTypeEdit}
        />
        <AdminForm
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isTypeEdit={isTypeEdit}
          setIsTypeEdit={setIsTypeEdit}
        />
      </div>
    </div>
  );
};

export default Settings;
