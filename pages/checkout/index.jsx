import classNames from "classnames";
import Head from "next/head";
import Link from "next/link";

import { Modal, ModalBody } from "reactstrap";
import HeaderBottom from "../../components/home/HeaderBottom";
import FooterHome from "../../components/home/FooterHome";
import styles from "../../styles/cart/cartPage.module.scss";
import provinces from "../../services/provinces.json";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
// import { getLogin } from '../../store/actions/userAction'
import SyncLoader from "react-spinners/SyncLoader";
import { addNewAddressUser, getAddressUser, setDefaultAddress, deleteAddresUser, editAddressUser, getListCartUser, editAmountCart, chooseProdcutInCart, deleteProductInCart, updateClassifyProductInCart, handlePurchase, chooseAddProductInCart, buyProductByCard, getListCartUserOffline, taoTaiKhoanKhach } from '../../services/userService';
import { useEffect } from "react";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { useCallback } from "react";
import { useMemo } from "react";
import { useRouter } from "next/router";
// import actionTypes from '../../store/actions/actionTypes'
import { checkLogin } from "../../services/common";
import LoadingBar from "react-top-loading-bar";
import Background from "../../components/background";
import { nameWeb } from "../../utils/constants";
import actionTypes from '../../store/actions/actionTypes';
import TextField from '@mui/material/TextField';
import { Input } from 'antd';
const { TextArea } = Input;

const options1 = provinces.map((item, index) => {
  return {
    name: item.name,
    value: index,
  };
});

const CartPage = () => {
  const router = useRouter();

  const [country, setCountry] = useState(-1);
  const [district, setDistrict] = useState(-1);
  const [nameAddress, setNameAddress] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [sdtUser, setSdtUser] = useState("");
  const [addressText, setAddressText] = useState("");

  const [isShowModalAddAddress, setIsShowModalAddAddress] = useState(false);
  const [isShowModalChooseAddress, setIsShowModalChooseAddress] =
    useState(false);
  const [listAddresUser, setListAddresUser] = useState([]);
  const [listCart, setListCart] = useState([]);
  const [isAddOrEdit, setIsAddOrEdit] = useState(true);
  const [idAddressEdit, setIdAddressEdit] = useState("");
  const [note, setNote] = useState("");
  const Totals = useRef(0);
  const [isBuyStart, setIsBuyStart] = useState(false);
  const [payment, setPayment] = useState("hand");
  const [vanChuyen, setVanChuyen] = useState(17500);
  const [hoTenKhach, setHoTenKhach] = useState('');
  const [sdtKhach, setSdtKhach] = useState('');
  const [diaChiKhach, setDiaChiKhach] = useState('');
  const [modelDaThanhToan, setModelDaThanhToan] = useState(false);
  const [soSanPhamMua, setSoSanPhamMua] = useState(0);

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const refreshToken = useSelector((state) => state.user.refreshToken);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // await getUserLogin()
    getListAddresUser();
    getListCart();
  };

  const options2 = useMemo(() => {
    if (country === -1) return;
    return provinces[country].districts.map((item, index) => {
      return {
        name: item.name,
        value: index,
      };
    });
  }, [country]);

  // const isChooseAll = useMemo(() => {
  //   if (listCart.length === 0) return false;
  //   let kq = true;
  //   listCart.forEach((item) => {
  //     if (item.isChoose === "false") {
  //       kq = false;
  //     }
  //   });
  //   return kq;
  // }, [listCart]);

  const getListAddresUser = async () => {
    if (!accessToken) return;
    let res = await getAddressUser(accessToken);
    if (res && res.errCode === 0) {
      setListAddresUser(res.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "Token hết hạn",
        text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
    }
  };

  const getListCart = async () => {
    let dataCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if (dataCart.length === 0) return

    let res = await getListCartUserOffline(dataCart);
    if (res && res.errCode === 0) {
      setListCart(res.data);
      setSoSanPhamMua(res.data.length)
    }
    return;


  };

  const handleAddAddress = async () => {
    if (
      country === -1 ||
      district === -1 ||
      nameAddress === "" ||
      nameUser === "" ||
      sdtUser === "" ||
      addressText === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Vui lòng điền đầy đủ thông tin 😙😙",
      });
      return;
    }
    if (accessToken === null) {
      Swal.fire({
        icon: "error",
        title: "Cảnh báo",
        text: "Đã có lỗi xảy ra, vui lòng tải lại trang và thử lại!",
      });
      return;
    }
    var regex = /^\d{10,}$/;
    if (!regex.test(sdtUser)) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Số điện thoại không đúng định dạng!",
      });
      return;
    }

    let data = {
      country: country + "",
      district: district + "",
      nameAddress,
      nameUser,
      sdtUser,
      addressText,
      accessToken,
    };
    let res = await addNewAddressUser(data);

    if (res && res.errCode === 0) {
      setIsShowModalAddAddress(false);
      getListAddresUser();
      resetInputAddAddress();
    } else if (res && res.errCode === 2) {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: res?.errMessage || "Có lỗi xảy ra!",
      });
    }
  };

  const handleSetDefaultAddress = async (id) => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
      return;
    }

    let data = {
      id: id,
      accessToken,
    };

    let res = await setDefaultAddress(data);
    if (res && res.errCode === 0) {
      getListAddresUser();
    } else if (res && res.errCode === 2) {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
    }
  };

  const resetInputAddAddress = () => {
    setNameAddress("");
    setNameUser("");
    setSdtUser("");
    setCountry(-1);
    setDistrict(-1);
    setAddressText("");
    setIdAddressEdit("");
    setIsAddOrEdit(true);
  };

  const handleDeleteAddressUser = async (id) => {
    if (!accessToken) return;

    let res = await deleteAddresUser({
      accessToken,
      id,
    });

    if (res && res.errCode === 0) {
      getListAddresUser();
    } else if (res && res.errCode === 2) {
      window.location.reload();
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
    }
  };

  const handleSetupEdit = (item) => {
    setIsShowModalAddAddress(true);
    setIdAddressEdit(item.id);
    setNameAddress(item.nameAddress);
    setNameUser(item.fullname);
    setSdtUser(item.sdt);
    setCountry(+item.country);
    setDistrict(+item.district);
    setAddressText(item.addressText);
    setIsAddOrEdit(false);
  };

  const handleEditAddress = async () => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng tải lại trang và thử lại!",
      });
      return;
    }
    if (
      country === -1 ||
      district === -1 ||
      nameAddress === "" ||
      nameUser === "" ||
      sdtUser === "" ||
      addressText === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Vui lòng điền đầy đủ thông tin 😙😙",
      });
      return;
    }

    var regex = /^\d{10,}$/;
    if (!regex.test(sdtUser)) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Số điện thoại không đúng định dạng!",
      });
      return;
    }

    let res = await editAddressUser({
      id: idAddressEdit,
      accessToken,
      country,
      district,
      nameUser,
      nameAddress,
      sdtUser,
      addressText,
    });

    if (res && res.errCode === 0) {
      resetInputAddAddress();
      setIsShowModalAddAddress(false);
      getListAddresUser();
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
    }
  };

  const renderContent = (index, item) => {
    let priceRoot;
    if (item?.classifyProduct?.nameClassifyProduct === "default") {
      priceRoot = +item.product.priceProduct;
    } else {
      priceRoot = +item.classifyProduct.priceClassify;
    }

    //check promotion
    if (item.product.promotionProducts.length === 0) {
      let sum = priceRoot * item.amount;

      return (
        <div className={styles.content}>
          <div className={styles.left}>
            <Link
              href={`/product/${item?.product.id}?name=${item.product.nameProduct}`}
              aria-label={`${item.product.nameProduct}`}
              className={styles.name}
            >
              {item.product.nameProduct.charAt(0).toUpperCase() +
                item.product.nameProduct.slice(1)}
            </Link>
            <div className={styles.classify}>
              {(item.product["classifyProduct-product"].length === 1 &&
                item.product["classifyProduct-product"][0].nameClassifyProduct !== "default") ||
                (item.product["classifyProduct-product"].length !== 1 && (
                  <>
                    <select
                      value={item.classifyProduct.id}
                      onChange={(e) =>
                        handleChangeClassifyProductInCart(
                          e.target.value,
                          item.id,
                          index
                        )
                      }
                    >
                      {item.product["classifyProduct-product"].map(
                        (item, index) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {item?.nameClassifyProduct
                                .charAt(0)
                                .toUpperCase() +
                                item?.nameClassifyProduct.slice(1)}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <div className={styles.amount}>
                      Kho: {item.classifyProduct.amount}
                    </div>
                  </>
                ))}
            </div>
            <div className={styles.Wrap_price}>
              <div>{new Intl.NumberFormat("ja-JP").format(priceRoot)}₫</div>
              <div></div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              {new Intl.NumberFormat("ja-JP").format(sum)}₫
            </div>
            <div className={styles.Wrap_count}>
              <button
                onClick={() => handleEditAmountCart(index, item.id, "prev", item.product.id)}
              >
                -
              </button>
              <input
                type="number"
                value={item.amount}
                onChange={(e) =>
                  handleChangeAmoutProductCart(index, item.id, e.target.value, item.product.id)
                }
                min={1}
              />
              <button
                onClick={() => handleEditAmountCart(index, item.id, "next", item.product.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (item.product.promotionProducts[0].numberPercent === 0) {
      let sum = priceRoot * item.amount;

      return (
        <div className={styles.content}>
          <div className={styles.left}>
            <Link
              href={`/product/${item.product.id}?name=${item.product.nameProduct}`}
              aria-label={`${item?.product?.nameProduct}`}
              className={styles.name}
            >
              {item.product.nameProduct.charAt(0).toUpperCase() +
                item.product.nameProduct.slice(1)}
            </Link>
            <div className={styles.classify}>
              {(item.product["classifyProduct-product"].length === 1 &&
                item.product["classifyProduct-product"][0]
                  .nameClassifyProduct !== "default") ||
                (item.product["classifyProduct-product"].length !== 1 && (
                  <>
                    <select
                      value={item.classifyProduct.id}
                      onChange={(e) =>
                        handleChangeClassifyProductInCart(
                          e.target.value,
                          item.id,
                          index
                        )
                      }
                    >
                      {item.product["classifyProduct-product"].map(
                        (item, index) => {
                          return (
                            <option key={item.id} value={item.id}>
                              {" "}
                              {item?.nameClassifyProduct
                                .charAt(0)
                                .toUpperCase() +
                                item?.nameClassifyProduct.slice(1)}
                            </option>
                          );
                        }
                      )}
                    </select>
                    <div className={styles.amount}>
                      Kho: {item.classifyProduct.amount}
                    </div>
                  </>
                ))}
            </div>
            <div className={styles.Wrap_price}>
              <div>{new Intl.NumberFormat("ja-JP").format(priceRoot)}₫</div>
              <div></div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.top}>
              {new Intl.NumberFormat("ja-JP").format(sum)}₫
            </div>
            <div className={styles.Wrap_count}>
              <button
                onClick={() => handleEditAmountCart(index, item.id, "prev", item.product.id)}
              >
                -
              </button>
              <input
                type="number"
                value={item.amount}
                onChange={(e) =>
                  handleChangeAmoutProductCart(index, item.id, e.target.value, item.product.id)
                }
                min={1}
              />
              <button
                onClick={() => handleEditAmountCart(index, item.id, "next", item.product.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      let timePromotion = item.product.promotionProducts[0].timePromotion;
      let date = new Date().getTime();

      if (timePromotion < date) {
        let sum = priceRoot * item.amount;

        return (
          <div className={styles.content}>
            <div className={styles.left}>
              <Link
                href={`/product/${item.product.id}?name=${item.product.nameProduct}`}
                aria-label={`${item?.product?.nameProduct}`}
                className={styles.name}
              >
                {item.product.nameProduct.charAt(0).toUpperCase() +
                  item.product.nameProduct.slice(1)}
              </Link>
              <div className={styles.classify}>
                {(item.product["classifyProduct-product"].length === 1 &&
                  item.product["classifyProduct-product"][0]
                    .nameClassifyProduct !== "default") ||
                  (item.product["classifyProduct-product"].length !== 1 && (
                    <>
                      <select
                        value={item.classifyProduct.id}
                        onChange={(e) =>
                          handleChangeClassifyProductInCart(
                            e.target.value,
                            item.id,
                            index
                          )
                        }
                      >
                        {item.product["classifyProduct-product"].map(
                          (item, index) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {" "}
                                {item?.nameClassifyProduct
                                  .charAt(0)
                                  .toUpperCase() +
                                  item?.nameClassifyProduct.slice(1)}
                              </option>
                            );
                          }
                        )}
                      </select>
                      <div className={styles.amount}>
                        Kho: {item.classifyProduct.amount}
                      </div>
                    </>
                  ))}
              </div>
              <div className={styles.Wrap_price}>
                <div>{new Intl.NumberFormat("ja-JP").format(priceRoot)}₫</div>
                <div></div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                {new Intl.NumberFormat("ja-JP").format(sum)}₫
              </div>
              <div className={styles.Wrap_count}>
                <button
                  onClick={() => handleEditAmountCart(index, item.id, "prev", item.product.id)}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleChangeAmoutProductCart(index, item.id, e.target.value, item.product.id)
                  }
                  min={1}
                />
                <button
                  onClick={() => handleEditAmountCart(index, item.id, "next", item.product.id)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      } else {
        let percent = item.product.promotionProducts[0].numberPercent;
        let pricePromotion = Math.floor((priceRoot * (100 - percent)) / 100);
        let sum = pricePromotion * item.amount;

        return (
          <div className={styles.content}>
            <div className={styles.left}>
              <Link
                href={`/product/${item.product.id}?name=${item.product.nameProduct}`}
                aria-label={`${item?.product?.nameProduct}`}
                className={styles.name}
              >
                {item.product.nameProduct.charAt(0).toUpperCase() +
                  item.product.nameProduct.slice(1)}
              </Link>
              <div className={styles.classify}>
                {(item.product["classifyProduct-product"].length === 1 &&
                  item.product["classifyProduct-product"][0]
                    .nameClassifyProduct !== "default") ||
                  (item.product["classifyProduct-product"].length !== 1 && (
                    <>
                      <select
                        value={item.classifyProduct.id}
                        onChange={(e) =>
                          handleChangeClassifyProductInCart(
                            e.target.value,
                            item.id, index
                          )
                        }
                      >
                        {item.product["classifyProduct-product"].map(
                          (item, index) => {
                            return (
                              <option key={item.id} value={item.id}>
                                {" "}
                                {item?.nameClassifyProduct
                                  .charAt(0)
                                  .toUpperCase() +
                                  item?.nameClassifyProduct.slice(1)}
                              </option>
                            );
                          }
                        )}
                      </select>
                      <div className={styles.amount}>
                        Kho: {item.classifyProduct.amount}
                      </div>
                    </>
                  ))}
              </div>
              <div className={styles.Wrap_price}>
                <div>
                  {new Intl.NumberFormat("ja-JP").format(pricePromotion)}₫
                </div>
                <div>{new Intl.NumberFormat("ja-JP").format(priceRoot)}₫</div>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.top}>
                {new Intl.NumberFormat("ja-JP").format(sum)}₫
              </div>
              <div className={styles.Wrap_count}>
                <button
                  onClick={() => handleEditAmountCart(index, item.id, "prev")}
                >
                  -
                </button>
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleChangeAmoutProductCart(index, item.id, e.target.value)
                  }
                  min={1}
                />
                <button
                  onClick={() => handleEditAmountCart(index, item.id, "next")}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );
      }
    }
  };

  const handleEditAmountCart = async (index, id, type) => {

    let listcarttam = [...listCart];

    let value =
      type === "prev"
        ? +listcarttam[index]?.amount - 1
        : +listcarttam[index]?.amount + 1;

    if (value < 1) value = 1

    if (value > listcarttam[index].classifyProduct.amount) value = listcarttam[index].classifyProduct.amount

    listcarttam[index].amount = value;
    setListCart([...listcarttam]);


  };

  const handleChooseProduct = async (id) => {

    let newData = [...listCart]

    newData = newData.map(item => {
      if (item.product.id === id)
        item.isChoose = item.isChoose === 'true' ? 'false' : 'true'
      if (item.isChoose === 'true') {
        setSoSanPhamMua(soSanPhamMua + 1)
      }
      else {
        setSoSanPhamMua(soSanPhamMua - 1)
      }

      return item
    })

    setListCart(newData)


  };

  const handleDeleteProductInCart = async (id, index) => {

    let dataCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    dataCart = dataCart.filter((card, i) => index !== i)

    localStorage.setItem("cart", JSON.stringify(dataCart));

    setSoSanPhamMua(soSanPhamMua - 1)

    getListCart();


  };

  const handleChangeClassifyProductInCart = async (idClassify, idCart, index) => {

    if (isBuyStart) return;

    console.log("index cart: ", index);

    let dataCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    if (dataCart.length === 0) return

    dataCart = dataCart.map((item, i) => {
      if (index === i) item.idClassifyProduct = idClassify
      return item
    })

    localStorage.setItem('cart', JSON.stringify(dataCart))


    getListCart();


  };

  const renderTolal = useCallback(() => {
    if (listCart.length === 0) return;
    let totals = 0;

    listCart.forEach((item) => {
      if (item.isChoose === "true") {
        let priceRoot;
        if (item.classifyProduct?.nameClassifyProduct === "default") {
          priceRoot = +item.product.priceProduct;
        } else {
          priceRoot = item.classifyProduct.priceClassify;
        }

        if (
          item.product.promotionProducts.length === 0 ||
          (item.product.promotionProducts.length === 1 &&
            item.product.promotionProducts[0].numberPercent === 0)
        ) {
          totals = totals + priceRoot * item.amount;
        } else {
          let timePromotion = item.product.promotionProducts[0].timePromotion;
          let date = new Date().getTime();

          if (timePromotion < date) {
            totals += priceRoot * item.amount;
          } else {
            let percent = item.product.promotionProducts[0].numberPercent;
            let pricePromotion = Math.floor(
              (priceRoot * (100 - percent)) / 100
            );
            totals += pricePromotion * item.amount;
          }
        }
      }
    });
    Totals.current = totals + vanChuyen;

    return <>{new Intl.NumberFormat("ja-JP").format(Totals.current)}₫</>;
  }, [listCart, vanChuyen]);

  const handleBuys = async () => {
    const accToken = localStorage.getItem("accessTokenKhach");

    if (!accToken) {
      console.log('token khach: ', accToken);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng tải lại trang và thử lại!",
      });
      return;
    }
    if (Totals.current === 0) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Vui lòng chọn sản phẩm!",
      });
      return;
    }
    if (!isBuyStart) {
      setIsBuyStart(true);
      setTimeout(async () => {
        let res = await handlePurchase({
          accessToken: accToken,
          note,
          Totals: Totals.current,
        });
        console.log(res);
        if (res && res.errCode === 0) {
          setIsBuyStart(false);
          // router.push("/cart/notifycation");

          setModelDaThanhToan(true)
          window.scrollTo({
            top: 0,
            behavior: 'auto' // 'auto' để cuộn ngay lập tức, 'smooth' để cuộn mượt mà
          });

          let dataCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];

          dataCart = dataCart.filter((item, index) => {
            let check = false
            for (let i = 0; i < listCart.length; i++) {
              if (listCart[i].isChoose === 'true' && listCart[i].product.id === item.id) check = true
            }

            return !check
          })

          localStorage.setItem('cart', JSON.stringify(dataCart))


        } else if (res.errCode === 3) {
          setIsShowModalChooseAddress(true);
          setIsBuyStart(false);
        } else {
          setIsBuyStart(false);
          Swal.fire({
            icon: "error",
            title: "Sorry",
            text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
          });
        }
      }, 1000);
    }
  };

  const handleChangeCountry = (rest, value) => {
    setCountry(value.value);
    setDistrict(-1);
  };
  const handleChangeDistrict = (rest, value) => {
    setDistrict(value.value);
  };

  const handleChooseAll = async () => {
    if (!accessToken) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng tải lại trang và thử lại!",
      });
      return;
    }

    if (isBuyStart) return;

    let res = await chooseAddProductInCart({
      accessToken,
      type: !isChooseAll,
    });
    if (res && res.errCode === 0) {
      getListCart();
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: err?.errMessage || "Vui lòng tải lại trang và thử lại!",
      });
    }
  };

  const ChangeAmoutProductCart = useRef();

  const handleChangeAmoutProductCart = async (index, id, value) => {

    if (isBuyStart) return;
    let listcarttam = [...listCart];
    listcarttam[index].amount = value;
    setListCart([...listcarttam]);

    clearTimeout(ChangeAmoutProductCart.current);

    ChangeAmoutProductCart.current = setTimeout(async () => {
      if (value < 0) value = 1
      let listcarttam = [...listCart];
      if (value > listcarttam[index].classifyProduct.amount) value = listcarttam[index].classifyProduct.amount
      listcarttam[index].amount = value;
      setListCart([...listcarttam]);
    }, 1000);


  };

  const ramdomNameAddress = () => {
    let nameAddressTam = "Địa chỉ ";
    let i = 1;
    let isCheck = true;

    while (isCheck) {
      let check = false;
      listAddresUser.forEach((item) => {
        if (
          item.nameAddress.toUpperCase() === (nameAddressTam + i).toUpperCase()
        )
          check = true;
      });

      if (check) {
        i++;
      } else {
        isCheck = false;
      }
    }
    setNameAddress(nameAddressTam + i);
  };

  const onClickBtnBuy = async () => {
    await handleTaoTaiKhoanKhach();

    if (payment === "hand") {
      handleBuys();
    } else {
      if (isBuyStart) return;
      const accToken = localStorage.getItem("accessTokenKhach");
      if (!accToken) {

        Swal.fire({
          icon: "warning",
          title: "Oh no!",
          text: "Vui lòng tải lại trang và thử lại!",
        });
        return;
      }
      setIsBuyStart(true);
      let res = await buyProductByCard({
        accessToken: accToken,
        totalsReq: Totals.current + vanChuyen,
      });
      if (res && res.errCode === 0) {
        window.location.href = res.link;
      } else {
        setIsBuyStart(false);
        console.log('vao day');
        Swal.fire({
          icon: "warning",
          title: "Chú ý",
          text: res?.errMessage || "Vui lòng tải lại trang và thử lại!",
        });
      }
    }
  };


  const handleTaoTaiKhoanKhach = async () => {

    let newListCard = listCart.filter(item => item.isChoose === 'true')
    if (newListCard.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Chú ý",
        text: "Vui lòng chọn sản phẩm muốn mua",
      });
      return;
    }

    let data = {
      sdtKhach, hoTenKhach, diaChiKhach,
      listCart: newListCard
    }
    let res = await taoTaiKhoanKhach(data);
    console.log(res);
    if (res && res?.errCode === 0) {
      localStorage.setItem('accessTokenKhach', res.data);
    }



  }

  const getImageProduct = (item) => {
    if (item.classifyProduct.STTImg === -1) {
      let url = item.product["imageProduct-product"][0].imagebase64;
      return url;
    }

    let url;
    item.product["imageProduct-product"].forEach((img) => {
      if (img.STTImage === item.classifyProduct.STTImg) url = img.imagebase64;
    });

    return url;
  };


  let getNgayHienTai = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = today.getFullYear();

    // Định dạng ngày/tháng/năm
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate
  }

  return (
    <div className={classNames("CartPage", { unShow: false })}>
      <Head>
        <title>Mua hàng | {nameWeb}</title>
      </Head>
      <LoadingBar
        color="#5885E6"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <HeaderBottom hideSearch={true} hideCart={true} link_social={true} />

      {
        !modelDaThanhToan &&
        <div className={styles.CartPage_container}>
          <div className={styles.CartPage_content}>
            <div className={styles.content_left}>
              <div className={styles.wrapContent}>
                <div className={styles.Wrap_header}>
                  <div className={styles.header}>Giỏ hàng của bạn</div>
                  <div></div>
                </div>
                <div className={styles.label}>
                  {listCart.length !== 0 ? (
                    <>
                      Bạn đang có <b>{listCart.length} sản phẩm</b> trong giỏ hàng
                    </>
                  ) : (
                    <>Chưa có sản phẩm trong giỏ hàng.</>
                  )}
                </div>
                <div className={styles.listProducts}>
                  {/* {listCart.length !== 0 && (
                  <div className={styles.btnAddAll}>
                    <div
                      className={classNames(styles.left, {
                        [styles.active]: isChooseAll,
                      })}
                      onClick={handleChooseAll}
                    ></div>
                    <div className={styles.right}>Chọn tất cả</div>
                  </div>
                )} */}

                  {listCart.length !== 0 &&
                    listCart.map((item, index) => {
                      return (
                        <div key={item.id} className={styles.productItem}>
                          <div className={styles.image}>
                            <Link
                              href={`/product/${item.product.id}?name=${item.product.nameProduct}`}
                              aria-label={`${item?.product?.nameProduct}`}
                              className={styles.img}
                              style={{
                                backgroundImage: `url(${getImageProduct(item)})`,
                              }}
                            ></Link>
                            <div
                              className={classNames(styles.checkbox, {
                                [styles.check]: item.isChoose === "true",
                              })}
                              onClick={() => handleChooseProduct(item.product.id)}
                            ></div>
                          </div>
                          {renderContent(index, item)}

                          <button className={styles.delete}>
                            <i className="fa-solid fa-trash-can"></i>
                            <div
                              onClick={() => handleDeleteProductInCart(item.id, index)}
                            >
                              Xóa
                            </div>
                          </button>
                        </div>
                      );
                    })}
                </div>
                {listCart.length !== 0 && (
                  <div className={styles.note}>
                    <div className={styles.title}>
                      Ghi chú đơn hàng (Không bắt buộc)
                    </div>
                    <div className={styles.content}>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        name=""
                        id=""
                        cols="30"
                        rows="5"
                        placeholder="Nhập nội dung..."
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.content_right} style={{ backgroundColor: '#fff' }}>
              <div className={styles.header} style={{ color: '#000', textShadow: 'none', fontWeight: 'bold', textTransform: 'uppercase' }}>Thông tin đơn hàng</div>
              <div className={styles.wrap_address + ' ' + styles.wrap_address2}>
                <div className={styles.header} >ĐỊA CHỈ NHẬN HÀNG</div>
                <div className={styles.address_form}>
                  <TextField value={hoTenKhach} id="filled-basic" label="Họ tên" variant="filled" style={{ width: 'calc(50% - 5px)' }} onChange={e => setHoTenKhach(e.target.value)} />
                  <TextField value={sdtKhach} id="filled-basic" label="Số điện thoại" variant="filled" style={{ width: 'calc(50% - 5px)' }} onChange={e => setSdtKhach(e.target.value)} />
                  <TextArea value={diaChiKhach} rows={4} placeholder="Địa chỉ" onChange={e => setDiaChiKhach(e.target.value)} />
                </div>
              </div>
              <div className={styles.payment_methods}>
                <div className={styles.header} style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>Phương thức thanh toán</div>
                <div className={styles.wrap_radio}>
                  <label style={{ color: '#000' }}>
                    <input
                      value={payment}
                      type="radio"
                      name="payment_methods"
                      id=""
                      checked={payment === "hand"}
                      onChange={(e) => setPayment("hand")}

                    />
                    Thanh toán khi nhận hàng
                  </label>
                  <label style={{ color: '#000' }}>
                    <input
                      value={payment}
                      type="radio"
                      name="payment_methods"
                      id=""
                      checked={payment === "card"}
                      onChange={(e) => setPayment("card")}
                    />
                    Thanh toán PayPal
                  </label>
                </div>
              </div>
              <div className={styles.payment_methods}>
                <div className={styles.header} style={{ color: '#000', fontWeight: 'bold', fontSize: '16px' }}>Vận chuyển</div>
                <div className={styles.wrap_radio}>
                  <label style={{ color: '#000' }}>
                    <input
                      type="radio"
                      name="van_chuyen"
                      id=""
                      checked={vanChuyen === 17500}
                      onChange={(e) => {
                        setVanChuyen(17500)
                      }}
                    />
                    Tiết kiệm
                  </label>
                  <label style={{ color: '#000' }}>
                    <input
                      type="radio"
                      name="van_chuyen"
                      id=""
                      checked={vanChuyen === 42000}
                      onChange={(e) => {
                        setVanChuyen(42000)
                      }}
                    />
                    Hỏa tốc
                  </label>
                </div>
              </div>
              <div className={styles.price} style={{ padding: '10px 20px', borderRadius: '4px' }}>
                <div>Tổng tiền:</div>
                <div>{renderTolal()}</div>
              </div>
              <ul>
                <li>Phí vận chuyển được miễn phí trong thời gian khuyến mãi.</li>
                <li>Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.</li>
                <li>
                  Hiện tại với đơn <b>400.000₫</b> trở lên sẽ có những ưu đãi bất
                  ngờ.
                </li>
              </ul>
              <div className={styles.btn} onClick={onClickBtnBuy} style={{ backgroundColor: 'green' }}>
                <div className={styles.text} >
                  {isBuyStart ? (
                    <SyncLoader color={"#36d7b7"} loading={true} size={10} />
                  ) : (
                    "THANH TOÁN"
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }

      {
        modelDaThanhToan &&
        <div className={styles.modal_da_thanh_toan}>
          <div className={styles.header}>Thành công</div>
          <div className={styles.link_home}>
            <Link href={'/'} className={styles.home}>Trang chủ</Link>
            <div className="">/</div>
            <div className={styles.thanh_toan}>Thanh toán</div>
          </div>
          <div className={styles.don_da_nhan}>
            <div className={styles.header}>Đơn hàng đã nhận</div>
            <div className={styles.sub}>Cảm ơn bạn. Đơn hàng của bạn đã được nhận.</div>
            <table>
              <tbody>
                <tr>
                  <th>Mã đơn hàng</th>
                  <th>Ngày</th>
                  <th>Tổng cộng</th>
                  <th>Phương thức thanh toán</th>
                </tr>
                <tr>
                  <td>365</td>
                  <td>{getNgayHienTai()}</td>
                  <td>{renderTolal()}</td>
                  <td>
                    {
                      payment === 'hand' ? 'Trả tiền mặt khi nhận hàng' : 'Thanh toán qua Paypal'
                    }
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.chi_tiet_don}>
            <div className={styles.header}>Chi tiết đơn hàng</div>
            <table>
              <tbody>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Tổng</th>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>{soSanPhamMua} sản phẩm</td>
                  <td>{
                    new Intl.NumberFormat("ja-JP").format(Totals.current - vanChuyen) + 'đ'
                  }</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Tổng số phụ:</td>
                  <td>
                    {
                      new Intl.NumberFormat("ja-JP").format(Totals.current - vanChuyen) + 'đ'
                    }
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Giao nhận hàng:</td>
                  <td>{new Intl.NumberFormat("ja-JP").format(vanChuyen) + 'đ'}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Phương thức thanh toán:</td>
                  <td>{
                    payment === 'hand' ? 'Trả tiền mặt khi nhận hàng' : 'Thanh toán qua Paypal'
                  }</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 'bold' }}>Tổng cộng:</td>
                  <td>{renderTolal()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      }



      <FooterHome />
      {/* <Modal
        width="80vw"
        className={styles.ModalChooseAddress + " " + "ModalChooseAddress"}
        isOpen={isShowModalChooseAddress}
        size="lg"
        centered={true}
        toggle={() => setIsShowModalChooseAddress(false)}
      >
        <ModalBody>
          <div className={styles.ModalChooseAddressWrap}>
            <div className={styles.header}>Chọn địa chỉ nhận hàng</div>
            <div className={styles.listAddress}>
              {listAddresUser.length === 0 ? (
                " Chưa có địa chỉ nào được lưu"
              ) : (
                <>
                  {listAddresUser.map((item) => {
                    return (
                      <div key={item.id} className={styles.itemAdress}>
                        <div className={styles.left}>
                          {item.isDefault === "true" ? (
                            <div
                              className={styles.radio + " " + styles.active}
                            ></div>
                          ) : (
                            <div
                              className={styles.radio}
                              onClick={() => handleSetDefaultAddress(item.id)}
                            ></div>
                          )}
                        </div>
                        <div className={styles.right}>
                          <div className={styles.nameAdress}>
                            {item.nameAddress.charAt(0).toUpperCase() +
                              item.nameAddress.slice(1)}
                          </div>
                          <div className={styles.nameUserAndSdt}>
                            <div>{item.fullname}</div>|<div>{item.sdt}</div>
                          </div>
                          <div className={styles.addressText}>
                            {item.addressText}
                          </div>
                          <div className={styles.countryAndDistrict}>
                            <span>
                              {
                                provinces[+item.country].districts[
                                  +item.district
                                ].name
                              }
                            </span>
                            <span>-</span>
                            <span>{provinces[+item.country].name}</span>
                          </div>
                        </div>
                        <div className={styles.wrapBtn}>
                          <div className={styles.left}>
                            <i
                              className="fa-solid fa-pencil"
                              onClick={() => handleSetupEdit(item)}
                            ></i>
                          </div>
                          <div className={styles.right}>
                            <i
                              className="fa-solid fa-trash-can"
                              onClick={() => handleDeleteAddressUser(item.id)}
                            ></i>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
            <div
              className={styles.add_address}
              onClick={() => {
                setIsShowModalAddAddress(true);
                ramdomNameAddress();
              }}
            >
              <div>
                <i className="fa-solid fa-plus"></i>
              </div>
              <div>Thêm Địa Chỉ Mới</div>
            </div>
            <div className={styles.close}>
              <i
                className="fa-regular fa-rectangle-xmark"
                onClick={() => setIsShowModalChooseAddress(false)}
              ></i>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal
        width="80vw"
        className={styles.ModalAddAddress + " " + "ModalAddAddress"}
        isOpen={isShowModalAddAddress}
        centered={true}
        size="lg"
      >
        <ModalBody>
          <div className={styles.ModalAddAddressWrap}>
            <div className={styles.header}>
              {isAddOrEdit ? "Địa chỉ mới" : "Sửa địa chỉ"}
            </div>
            <div className={styles.nameAddress}>
              <input
                value={nameAddress}
                onChange={(e) => setNameAddress(e.target.value)}
                type="text"
                placeholder="Tên địa chỉ"
              />
            </div>
            <div className={styles.contact}>
              <div>Liên hệ</div>
              <input
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                type="text"
                placeholder="Họ và tên"
              />
              <br />
              <input
                value={sdtUser}
                onChange={(e) => setSdtUser(e.target.value)}
                type="number"
                placeholder="Số điện thoại"
              />
            </div>
            <div className={styles.wrapAddress}>
              <div>Địa chỉ</div>
              <div className={styles.wrapSelect}>
                <SelectSearch
                  options={options1}
                  value={country}
                  name="language"
                  placeholder="Tỉnh - Thành phố"
                  search={true}
                  onChange={handleChangeCountry}
                  autoComplete="on"
                />

                <SelectSearch
                  options={options2}
                  value={district}
                  name="language"
                  placeholder="Quận - Huyện"
                  search={true}
                  onChange={handleChangeDistrict}
                  autoComplete="on"
                />
              </div>
              <input
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                type="text"
                placeholder="Nhập địa chỉ..."
              />
            </div>
            <div className={styles.wrapBtn}>
              {isAddOrEdit ? (
                <div className={styles.btnAdd} onClick={handleAddAddress}>
                  Thêm
                </div>
              ) : (
                <div className={styles.btnAdd} onClick={handleEditAddress}>
                  Lưu
                </div>
              )}

              <div
                className={styles.btnCancel}
                onClick={() => {
                  setIsShowModalAddAddress(false);
                  resetInputAddAddress();
                }}
              >
                Hủy
              </div>
            </div>
            <div className={styles.clode}>
              <i
                className="fa-regular fa-rectangle-xmark"
                onClick={() => {
                  setIsShowModalAddAddress(false);
                  resetInputAddAddress();
                }}
              ></i>
            </div>
          </div>
        </ModalBody>
      </Modal> */}
      <Background />
    </div>
  );
};

export default CartPage;
