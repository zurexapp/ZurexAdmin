// GA
import ReactGA from "react-ga4";

// utils
import { lazy, Suspense } from "react";

// styles
import "./styles/index.scss";
import "react-toastify/dist/ReactToastify.min.css";
import ThemeStyles from "./styles/theme";

// fonts
import "./fonts/icomoon/icomoon.woff";

// contexts
import { SidebarProvider } from "./contexts/sidebarContext";
import { ThemeProvider } from "styled-components";

// hooks
import { useTheme } from "./contexts/themeContext";
import { useEffect, useRef } from "react";
import { useWindowSize } from "react-use";

// components
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Sidebar from "./layout/Sidebar";
//import Copyright from "@components/Copyright";
import AppBar from "./layout/AppBar";
// import Categories from "./pages/Categories";
// import EmployRolesPage from "./pages/EmployRolesPage";
import EmployUsers from "./pages/EmployUsers";
// import RevenuePage from "./pages/RevenuePage";
// import OrderPage from "./pages/OrderPage";
// import HighRatedTeams from "./pages/HighRatedTeams";
// import HighRatedSupervisor from "./pages/HighRatedSupervisor";
// import MostRequestedServices from "./pages/MostRequestedServices";
// import OrdersByNeighborHood from "./pages/OrdersByNeighborHood";
// import OrdersByCityPage from "./pages/OrdersByCityPage";
import { useDispatch, useSelector } from "react-redux";
import { database } from "./db/databaseFunction";
import {
  setAdminCarsData,
  setAdminMesgs,
  setBatteryData,
  setCityArr,
  setClientAccountData,
  setEngineOilPetrolData,
  setClientReviewsWeb,
  setClientsBanner,
  setEmployAcountData,
  setEmploysData,
  setDiscountData,
  setEngineOilData,
  setFiltersDta,
  setMobileClientsBanner,
  setMyOrdersData,
  setNeighborArr,
  setOilsData,
  setTireData,
} from "./store/projectSlice";
import AddEmployUsers from "./pages/AddEmployUsers";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import { setAuth } from "./store/authSlice";
import CarsManagement from "./pages/CarsManagement";
import AddCarsData from "./pages/AddCarsData";
import UpdateCarsData from "./pages/UpdateCarsData";
import OrderDetailsPage from "./pages/OrderDetailsPage";
// import Coupons from "./pages/Coupons";

// pages
const Login = lazy(() => import("./pages/Login"));
const SalesAnalytics = lazy(() => import("./pages/SalesAnalytics"));
// const SellersList = lazy(() => import("./pages/SellersList"));
// const TopProducts = lazy(() => import("./pages/TopProducts"));
const Banners = lazy(() => import("./pages/Banners"));
const Orders = lazy(() => import("./pages/Orders"));
const Statistics = lazy(() => import("./pages/Statistics"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Customers = lazy(() => import("./pages/Customers"));
const Transactions = lazy(() => import("./pages/Transactions"));

const Discounts = lazy(() => import("./pages/Discounts"));
const Coupons = lazy(() => import("./pages/Coupons"));

// const GeneralSettings = lazy(() => import("./pages/GeneralSettings"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const ProductsManagement = lazy(() => import("./pages/ProductsManagement"));

function App() {
  const { width } = useWindowSize();
  const appRef = useRef(null);
  const { theme } = useTheme();
  const path = useLocation().pathname;
  const withSidebar = path !== "/" && path !== "/404";
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);

  // Google Analytics init
  const gaKey = import.meta.env?.VITE_GA ? import.meta.env?.VITE_GA : "";
  gaKey && ReactGA.initialize(gaKey);

  useEffect(() => {
    appRef.current && appRef.current.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const result = window.localStorage.getItem("aczurex_admin_login");
    if (result) {
      dispatch(setAuth({ isAuth: result }));
    }
    database.ref("orders").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ id: dat[0], ...dat[1] });
        });
        dispatch(setMyOrdersData({ myOrdersData: returnArr }));
      } else {
        dispatch(setMyOrdersData({ myOrdersData: [] }));
      }
    });
    database.ref("employ").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setEmployAcountData({ employAcountData: returnArr }));
      } else {
        dispatch(setEmployAcountData({ employAcountData: [] }));
      }
    });
    database.ref("user").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setClientAccountData({ clientAccountData: returnArr }));
      } else {
        dispatch(setClientAccountData({ clientAccountData: [] }));
      }
    });
    database.ref("webClientsBanner").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setClientsBanner({ clientsBanner: returnArr }));
      } else {
        dispatch(setClientsBanner({ clientsBanner: [] }));
      }
    });
    database.ref("mobClientsBanner").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setMobileClientsBanner({ mobileClientsBanner: returnArr }));
      } else {
        dispatch(setMobileClientsBanner({ mobileClientsBanner: [] }));
      }
    });
    database.ref("btteries").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "btteries" });
        });
        dispatch(setBatteryData({ batteryData: returnArr }));
      } else {
        dispatch(setBatteryData({ batteryData: [] }));
      }
    });
    database.ref("Tyres").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Tyres" });
        });
        dispatch(setTireData({ tireData: returnArr }));
      } else {
        dispatch(setTireData({ tireData: [] }));
      }
    });
    database.ref("Filters").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Filters" });
        });
        dispatch(setFiltersDta({ filtersData: returnArr }));
      } else {
        dispatch(setFiltersDta({ filtersData: [] }));
      }
    });

    database.ref("engineOil").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "engineOil" });
        });
        dispatch(setEngineOilData({ engineOilData: returnArr }));
      } else {
        dispatch(setEngineOilData({ engineOilData: [] }));
      }
    });

    database.ref("engineOilPetrol").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();

      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({
            dbId: dat[0],
            ...dat[1],
            reference: "engineOilPetrol",
          });
        });

        dispatch(setEngineOilPetrolData({ engineOilPetrolData: returnArr }));
      } else {
        dispatch(setEngineOilPetrolData({ engineOilPetrolData: [] }));
      }
    });

    database.ref("discount").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setDiscountData({ discountData: returnArr }));
      } else {
        dispatch(setDiscountData({ discountData: [] }));
      }
    });

    database.ref("Oils").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1], reference: "Oils" });
        });
        dispatch(setOilsData({ oilsData: returnArr }));
      } else {
        dispatch(setOilsData({ oilsData: [] }));
      }
    });
    database.ref("adminMesg").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setAdminMesgs({ adminMesgs: returnArr }));
      } else {
        dispatch(setAdminMesgs({ adminMesgs: [] }));
      }
    });
    database.ref("webReview").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setClientReviewsWeb({ clientReviewsWeb: returnArr }));
      } else {
        dispatch(setClientReviewsWeb({ clientReviewsWeb: [] }));
      }
    });
    database.ref("OrderCity").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setCityArr({ cityArr: returnArr }));
      } else {
        dispatch(setCityArr({ cityArr: [] }));
      }
    });
    database.ref("NeighborHodCity").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setNeighborArr({ neighborArr: returnArr }));
      } else {
        dispatch(setNeighborArr({ neighborArr: [] }));
      }
    });
    database.ref("adminCarsData").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setAdminCarsData({ adminCarsData: returnArr }));
      } else {
        dispatch(setAdminCarsData({ adminCarsData: [] }));
      }
    });
    database.ref("employ").on("value", async (snapshot) => {
      let returnArr = [];
      const result = await snapshot.val();
      if (result) {
        await Object.entries(result).forEach((dat) => {
          returnArr.push({ dbId: dat[0], ...dat[1] });
        });
        dispatch(setEmploysData({ employsData: returnArr }));
      } else {
        dispatch(setEmploysData({ employsData: [] }));
      }
    });
  }, [dispatch]);

  return (
    <>
      <SidebarProvider>
        <ThemeProvider theme={{ theme: theme }}>
          <ThemeStyles />
          <ToastContainer
            theme={theme}
            autoClose={2000}
            style={{ padding: "20px" }}
          />
          {width < 1280 && withSidebar && <AppBar />}
          <div className={`app ${!withSidebar ? "fluid" : ""}`} ref={appRef}>
            <ScrollToTop />
            {withSidebar && <Sidebar />}
            <div className="app_content">
              {width >= 1280 && withSidebar && <AppBar />}
              <Suspense fallback={<Loader />}>
                <div className="main">
                  <Routes>
                    <Route
                      path="/"
                      element={
                        isAuth === "Authenticated" ? (
                          <Navigate to={"/home"} />
                        ) : (
                          <Login />
                        )
                      }
                    />
                    <Route
                      path="/home"
                      element={
                        isAuth === "Authenticated" ? (
                          <SalesAnalytics />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    {/* <Route path="sellers-list" element={<SellersList />} /> */}
                    {/* <Route path="/revenue-page" element={<RevenuePage />} />
                     <Route path="/order-page" element={isAuth === "Authenticated" ?<OrderPage />} /> */}
                    {/* <Route
                      path="/highest-rated-teams-page"
                      element={<HighRatedTeams />}
                    />
                    <Route
                      path="/orders-by-city-page"
                      element={<OrdersByCityPage />}
                    /> */}
                    {/* <Route
                      path="/orders-by-neighborhood-page"
                      element={<OrdersByNeighborHood />}
                    />
                    <Route
                      path="/most-requested-services-page"
                      element={<MostRequestedServices />}
                    />
                    <Route
                      path="/highest-rated-supervisors-page"
                      element={<HighRatedSupervisor />}
                    /> */}
                    {/* <Route path="top-products" element={<TopProducts />} /> */}
                    <Route
                      path="products-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <ProductsManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="car-management"
                      element={
                        isAuth === "Authenticated" ? (
                          <CarsManagement />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/editProduct/:id/:refer"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateProduct />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/editCarData/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <UpdateCarsData />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="/orderDetails/:id"
                      element={
                        isAuth === "Authenticated" ? (
                          <OrderDetailsPage />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="orders"
                      element={
                        isAuth === "Authenticated" ? (
                          <Orders />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addEmploy"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddEmployUsers />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addProducts"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddProduct />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="addCars"
                      element={
                        isAuth === "Authenticated" ? (
                          <AddCarsData />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="banners"
                      element={
                        isAuth === "Authenticated" ? (
                          <Banners />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="statistics"
                      element={
                        isAuth === "Authenticated" ? (
                          <Statistics />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="reviews"
                      element={
                        isAuth === "Authenticated" ? (
                          <Reviews />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="customers"
                      element={
                        isAuth === "Authenticated" ? (
                          <Customers />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="transactions"
                      element={
                        isAuth === "Authenticated" ? (
                          <Transactions />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    <Route
                      path="discounts"
                      element={
                        isAuth === "Authenticated" ? (
                          <Discounts />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />

                    <Route
                    path="coupons"
                    element={
                      isAuth === "Authenticated" ? (
                        <Coupons />
                      ) : (
                        <Navigate to="/" />
                      )
                    }
                  />

                    {/* <Route path="categories" element={<Categories />} /> */}
                    <Route
                      path="employ-users"
                      element={
                        isAuth === "Authenticated" ? (
                          <EmployUsers />
                        ) : (
                          <Navigate to="/" />
                        )
                      }
                    />
                    {/* <Route
                      path="EmployRolesPage"
                      element={<EmployRolesPage />}
                    />
                    <Route
                      path="general-settings"
                      element={<GeneralSettings />}
                    /> */}
                    <Route path="*" element={<Navigate to="/404" />} />
                    <Route path="/404" element={<PageNotFound />} />
                  </Routes>
                </div>
              </Suspense>
            </div>
          </div>
        </ThemeProvider>
      </SidebarProvider>
    </>
  );
}

export default App;
