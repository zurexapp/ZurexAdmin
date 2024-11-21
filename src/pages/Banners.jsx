// components
import { useSelector } from "react-redux";
import PageHeader from "../layout/PageHeader";
import DropFiles from "../components/DropFiles";
import { postData, removeData, uploadTheImage } from "../db/databaseFunction";
import { toast } from "react-toastify";
import trash from "../assets/icons/trash.svg";
import { useState } from "react";
const Banners = () => {
  const [isLoadingModal, setisLoadingModal] = useState(false);
  const [isLoadingModalMob, setisLoadingModalMob] = useState(false);
  const { clientsBanner, mobileClientsBanner } = useSelector(
    (state) => state.project
  );
  const removeImageFromDb = async (dbId, index) => {
    if (
      !window.confirm(
        `Are you sure you want to delete web banner ${
          index + 1
        } image with id ${dbId}?`
      )
    ) {
      return;
    } else {
      setisLoadingModal(true);
      await removeData("webClientsBanner", dbId)
        .then(() => {
          toast.success("Image Deleted SuccessFully");
        })
        .catch((e) => {
          toast.error("Error " + e);
        });
      setisLoadingModal(false);
    }
  };
  const uploadImageFunction = async (e) => {
    setisLoadingModal(true);
    await uploadTheImage(e[0])
      .then(async (dat) => {
        if (dat) {
          await postData("webClientsBanner", { imgLink: dat })
            .then(() => {
              toast.success("Banner Uploaded Successfully");
            })
            .catch((e) => {
              toast.error("Error " + e);
            });
        }
      })
      .catch((e) => {
        toast.error("Error" + e);
      });
    setisLoadingModal(false);
  };
  const removeImageFromDbMob = async (dbId, index) => {
    if (
      !window.confirm(
        `Are you sure you want to delete mobile banner ${
          index + 1
        } image with id ${dbId}?`
      )
    ) {
      return;
    } else {
      setisLoadingModalMob(true);
      await removeData("mobClientsBanner", dbId)
        .then(() => {
          toast.success("Image Deleted SuccessFully");
        })
        .catch((e) => {
          toast.error("Error " + e);
        });
      setisLoadingModalMob(false);
    }
  };
  const uploadImageFunctionMob = async (e) => {
    setisLoadingModalMob(true);
    await uploadTheImage(e[0])
      .then(async (dat) => {
        if (dat) {
          await postData("mobClientsBanner", { imgLink: dat })
            .then(() => {
              toast.success("Banner Uploaded Successfully");
            })
            .catch((e) => {
              toast.error("Error " + e);
            });
        }
      })
      .catch((e) => {
        toast.error("Error" + e);
      });
    setisLoadingModalMob(false);
  };
  return (
    <>
      <PageHeader title="Banners" />
      <h1 className="mb-6">Web Banners</h1>
      <div className="widgets-grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <div className="widgets-grid grid-cols-1">
          <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {clientsBanner &&
              clientsBanner?.map((dat, index) => (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    onClick={() => removeImageFromDb(dat.dbId, index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "50px",
                      height: "50px",
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={trash}
                      style={{
                        width: "30px",
                        height: "25px",
                        objectFit: "contain",
                      }}
                      alt="trash"
                    />
                  </div>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                    key={index}
                    src={dat.imgLink}
                    alt="banner"
                  />
                </div>
              ))}
            {isLoadingModal ? (
              <div className="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg">
                <img
                  className="w-[40px] h-[40px]"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                  alt="loading"
                />
              </div>
            ) : (
              <DropFiles
                type="image"
                multiple={false}
                onChange={uploadImageFunction}
                wrapperClass="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg"
              >
                <i
                  className="icon-circle-plus-regular"
                  style={{ fontSize: "5rem" }}
                />
              </DropFiles>
            )}
          </div>
        </div>
      </div>
      <h1 className="mb-6 mt-6">Mobile Banners</h1>
      <div className="widgets-grid grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
        <div className="widgets-grid grid-cols-1">
          <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {mobileClientsBanner &&
              mobileClientsBanner?.map((dat, index) => (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div
                    onClick={() => removeImageFromDbMob(dat.dbId, index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "50px",
                      height: "50px",
                      background: "rgba(0,0,0,0.5)",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={trash}
                      style={{
                        width: "30px",
                        height: "25px",
                        objectFit: "contain",
                      }}
                      alt="trash"
                    />
                  </div>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "10px",
                    }}
                    key={index}
                    src={dat.imgLink}
                    alt="banner"
                  />
                </div>
              ))}
            {isLoadingModalMob ? (
              <div className="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg">
                <img
                  className="w-[40px] h-[40px]"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
                  alt="loading"
                />
              </div>
            ) : (
              <DropFiles
                type="image"
                multiple={false}
                onChange={uploadImageFunctionMob}
                wrapperClass="flex justify-center min-h-[120px] items-center w-100 h-100 btn--primary rounded-lg"
              >
                <i
                  className="icon-circle-plus-regular"
                  style={{ fontSize: "5rem" }}
                />
              </DropFiles>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Banners;
