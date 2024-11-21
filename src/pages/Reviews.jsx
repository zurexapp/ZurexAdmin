// components
//import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postData } from "../db/databaseFunction";
import PageHeader from "../layout/PageHeader";
// import CustomersInfobox from "../components/CustomersInfobox";
// import ReviewsRate from "../widgets/ReviewsRate";
// import ReviewsScore from "../widgets/ReviewsScore";
import LatestAcceptedReviews from "../widgets/LatestAcceptedReviews";
import { useState } from "react";
import Spring from "../components/Spring";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Reviews = () => {
  // const navigate = useNavigate();
  const { clientReviewsWeb } = useSelector((state) => state.project);

  const [openCreateReviewModal, setopenCreateReviewModal] = useState(false);
  const [formData, setformData] = useState({
    userEmail: "",
    userName: "",
    ratting: 0,
    review: "",
  });
  const handlePasswordReminder = async (e) => {
    e.preventDefault();
    if (Number(formData.ratting) > 0 && Number(formData.ratting) <= 5) {
      await postData("webReview", {
        ...formData,
        createdAt: new Date().toString(),
      })
        .then(() => {
          toast.success("Review posted");
          setformData({});
          setopenCreateReviewModal(false);
        })
        .catch((e) => {
          toast.error("Error " + e);
        });
    } else {
      toast.error("Ratting should be between 1 and 5");
    }
  };
  return (
    <>
      <PageHeader title="Reviews" />
      <div className="flex flex-col flex-1 gap-5 md:gap-[26px]">
        {/* <div className="grid grid-cols-1 gap-y-5 md:gap-y-[26px] xl:grid-cols-6 xl:gap-x-[26px]">
           <div className="widgets-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:col-span-4">
            <ReviewsScore score={4.5} />
            <CustomersInfobox label="Total" count={348} color="green" />
            <CustomersInfobox
              label="New"
              count={25}
              suffix="%"
              iconClass="user-plus-solid"
            />
            <CustomersInfobox
              label="Regular"
              count={75}
              suffix="%"
              color="red"
              iconClass="user-group-crown-solid"
            />
          </div> 
           <ReviewsRate /> 
        </div> */}
        <div className="flex flex-col-reverse gap-4 mb-5 md:flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-4 md:flex-row md:gap-[14px]">
            <button
              onClick={() => setopenCreateReviewModal(!openCreateReviewModal)}
              className="btn btn--primary"
            >
              Add new review <i className="icon-circle-plus-regular" />
            </button>
          </div>
        </div>
        {openCreateReviewModal ? (
          <div className="bg-widget flex items-center justify-center w-full py-10 px-4 lg:p-[60px]">
            <Spring
              className="w-full max-w-[560px]"
              type="slideUp"
              duration={400}
              delay={300}
            >
              <form
                className="mt-5 flex flex-col gap-5"
                onSubmit={handlePasswordReminder}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="field-wrapper">
                    <label htmlFor="phone" className="field-label">
                      User Name
                    </label>
                    <input
                      className={classNames("field-input")}
                      required
                      id="phone"
                      type="text"
                      minLength={5}
                      placeholder="User Name"
                      value={formData.userName}
                      onChange={(e) =>
                        setformData({ ...formData, userName: e.target.value })
                      }
                    />
                  </div>
                  <div className="field-wrapper">
                    <label htmlFor="phone" className="field-label">
                      User Email
                    </label>
                    <input
                      className={classNames("field-input")}
                      required
                      id="phone"
                      type="text"
                      minLength={10}
                      placeholder="User Email"
                      value={formData.userEmail}
                      onChange={(e) =>
                        setformData({ ...formData, userEmail: e.target.value })
                      }
                    />
                  </div>

                  <div className="field-wrapper">
                    <label htmlFor="phone" className="field-label">
                      Ratting
                    </label>
                    <input
                      className={"field-input"}
                      required
                      id="phone"
                      type="number"
                      placeholder="Ratting 1-5"
                      value={formData.ratting}
                      onChange={(e) =>
                        setformData({ ...formData, ratting: e.target.value })
                      }
                    />
                  </div>
                  <div className="field-wrapper">
                    <label htmlFor="phone" className="field-label">
                      Review
                    </label>
                    <textarea
                      rows={4}
                      className={"field-input"}
                      minLength={15}
                      style={{ height: "120px", padding: "0.5rem" }}
                      required
                      id="phone"
                      type="text"
                      placeholder="Review"
                      value={formData.review}
                      onChange={(e) =>
                        setformData({ ...formData, review: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                  <button type="submit" className="btn btn--primary w-full">
                    Upload
                  </button>
                </div>
              </form>
            </Spring>
          </div>
        ) : null}
        {clientReviewsWeb && clientReviewsWeb?.length > 0 ? (
          <LatestAcceptedReviews />
        ) : null}
      </div>
    </>
  );
};

export default Reviews;
