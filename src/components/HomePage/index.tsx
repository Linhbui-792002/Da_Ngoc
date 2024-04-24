import React from "react";
import SoilLayer from "../SoilLayer";
import PileForm from "../Pile";
import Link from "next/link";
import { BackTop, Button } from "antd";
import { useRouter } from "next/router";
import RecordForm from "../FormRecord";

const HomePage = () => {
  const router = useRouter();
  const recordId = router.query.recordId;

  return (
    <div className="container">
      <div className="mt-4 text-xl">Tính Toán SCT Cọc</div>
      <SoilLayer />
      <PileForm />
      <div className="block fixed bottom-0 right-[50%] left-[50%] my-5">
        <RecordForm type="update" recordId={recordId} label="TÍnh toán" />
      </div>
    </div>
  );
};

export default HomePage;
