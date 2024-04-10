import React from "react";
import SoilLayer from "../SoilLayer";
import PileForm from "../Pile";
import Link from "next/link";
import { Button } from "antd";

const HomePage = () => {
  return (
    <div className="container">
      <div className="mt-4 text-xl">Tính Toán SCT Cọc</div>
      <SoilLayer />
      <PileForm />
      <Link href="/tinh-toan" className="block fixed bottom-0 right-[50%] left-[50%] my-5">
        <Button
          type="primary"
          className="!bg-b-success text-white hover:!bg-b-success-opcity"
        >
          Tính toán
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
