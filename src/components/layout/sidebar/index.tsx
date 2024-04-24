import React, { useEffect, useState } from "react";
import { DeleteOutlined, FileUnknownOutlined } from "@ant-design/icons";
import { Empty, Spin, Tooltip } from "antd";
import { useRouter } from "next/router";
import { getWindowDimensions } from "@src/common/lib/getWindowDimensions";
import { cn, dateFormatter } from "@src/common/lib/utils";
import { useQuery } from "../../../common/hooks/useQuery";
import { AlertButton } from "@src/common/components/alert-button";
import { toast } from "react-toastify";
import { useMutation } from "@src/common/hooks/useMutation";
import RecordForm from "@src/components/FormRecord";
import Link from "next/link";

const Sidebar = () => {
  const router = useRouter();
  const [id, setId] = useState<any>();
  const {
    data: listRecord,
    isLoading: recordLoading,
    reload,
  } = useQuery("record");

  const [trigger, { data, isLoading, error }] = useMutation();

  useEffect(() => {
    if (data) {
      toast.success("Xóa bản ghi thành công!");
      reload();
      if (listRecord.length > 0) {
        setId(listRecord[0]._id);
        router.replace(`/${listRecord[0]._id}`);
      } else {
        router.push(`/`);
        router.replace('/')
      }
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Lỗi xóa bản ghi!");
    }
  }, [error]);

  useEffect(() => {
    reload();
  }, [isLoading]);

  const handleDeleteEvent = () => {
    trigger("DELETE", `record/${id}`);
  };

  const [current, setCurrent] = useState(router.pathname);
  useEffect(() => {
    setCurrent(router.pathname);
    reload();
    setId(router.query.recordId);
  }, [router.pathname, router.asPath]);

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (windowDimensions.width && windowDimensions.width <= 960) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [windowDimensions]);
  const handleSetId = (id: any) => {
    setId(id);
  };
  return (
    <Spin spinning={recordLoading}>
      <div
        style={{ height: "calc(100vh - 55px)" }}
        className={cn(
          "shadow-sm bg-b-white px-2 py-1 overflow-scroll",
          !collapsed ? "w-60" : ""
        )}
      >
        {listRecord && listRecord.length != 0 ? (
          listRecord.map((item: any, index: number) => (
            <Link
              href={"/" + item._id}
              key={index}
              className={cn(
                "flex justify-between my-2 p-2 cursor-pointer rounded-md hover:bg-b-gray !text-t-black",
                id == item._id ? "bg-b-gray" : "bg-b-primary"
              )}
              onClick={() => handleSetId(item._id)}
            >
              <div>
                <span className="text-md">{item?.name}</span>
                <span className="block text-sm">Ngày tạo:</span>
                <span className="block text-sm">
                  {dateFormatter(item.createdAt)}
                </span>
              </div>
             {  id == item._id   && <div className="flex flex-col gap-2">
                <Tooltip title="Xóa bản ghi" color="red">
                  <AlertButton
                    modalTitle={"Xóa bản ghi"}
                    icon={<DeleteOutlined />}
                    shape="circle"
                    danger
                    message="Bạn có muốn xóa bàn ghi này không ?"
                    onConfirm={handleDeleteEvent}
                  />
                </Tooltip>
               <RecordForm recordId={id} title={"Sửa bản ghi"}  successCallback={reload}/>
              </div>
              }
            </Link>
          ))
        ) : (
          <Empty className="!mt-10" description="Không có dữ liệu" />
        )}
      </div>
    </Spin>
  );
};

export default Sidebar;
