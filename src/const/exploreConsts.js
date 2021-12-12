import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
export const Outer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 8px;
`;

export const GlobalStyles = createGlobalStyle`
header#myHeader.navbar.sticky.white {
  background: #403f83;
  border-bottom: solid 1px #403f83;
}
header#myHeader.navbar .search #quick_search{
  color: #fff;
  background: rgba(255, 255, 255, .1);
}
header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
  color: #fff;
}
header#myHeader .dropdown-toggle::after{
  color: rgba(255, 255, 255, .5);;
}
header#myHeader .logo .d-block{
  display: none !important;
}
header#myHeader .logo .d-none{
  display: block !important;
}
@media only screen and (max-width: 1199px) {
  .navbar{
    background: #403f83;
  }
  .navbar .menu-line, .navbar .menu-line1, .navbar .menu-line2{
    background: #fff;
  }
  .item-dropdown .dropdown a{
    color: #fff !important;
  }
}
`;

export const customStyles = {
  option: (base, state) => ({
    ...base,
    background: "#fff",
    color: "#333",
    borderRadius: state.isFocused ? "0" : 0,
    "&:hover": {
      background: "#eee",
    },
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    marginTop: 0,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  control: (base, state) => ({
    ...base,
    padding: 2,
  }),
};

export const options = [
  { label: "All", value: 0 },
  { label: "Metamon", value: 13 },
  { label: "R-Metamon", value: 23 },
  { label: "SR-Metamon", value: 24 },
  { label: "SSR-Metamon", value: 25 },
  { label: "Metamon Avatar", value: 5 },
  { label: "Egg", value: 17 },
  { label: "Egg Avatar", value: 14 },
  { label: "Potion", value: 15 },
  { label: "Tesla", value: 3 },
  { label: "Diamond Avatar", value: 4 },
  { label: "Potion Avatar", value: 6 },
  { label: "Musk USM LAND", value: 7 },
  { label: "Metamon USM LAND", value: 8 },
  { label: "SpaceXNaut Dog", value: 9 },
  { label: "Matrix Plus Box", value: 10 },
  { label: "Bake Musk Mixer", value: 11 },
  { label: "DING", value: 12 },
  { label: "Diamond", value: 16 },
  { label: "BMBMUSK", value: 18 },
  { label: "BMBRACA", value: 19 },
  { label: "Kiss-up State Land", value: 20 },
  { label: "Mystery Box", value: 21 },
  { label: "Super Rare Kiss-Up-Dog", value: 22 },
  { label: "Dragon Fruit Dog", value: 26 },
  { label: "SSR Kiss-Up-Dog", value: 27 },
  { label: "RACAPunk", value: 28 },
  { label: "Others", value: 1 },
];

export const options1 = [
  { value: 0, label: "Recently listed" },
  // { value: 1, label: "Lowest total Price" },
  // { value: 2, label: "Highest total Price" },
  { value: 3, label: "Lowest fixed Price" },
  { value: 4, label: "Highest fixed Price" },
];

export const options2 = [
  { value: 10, label: "10 seconds reload" },
  { value: 5, label: "5 seconds reload" },
  { value: 3, label: "3 seconds reload" },
];

export const options3 = [
  { value: 5, label: "5 items" },
  { value: 10, label: "10 items" },
  { value: 20, label: "20 items" },
  { value: 30, label: "30 items" },
];

export const alarm = new Audio("/police.mp3");
