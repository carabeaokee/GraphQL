// import {
//   CSidebar,
//   CSidebarToggler,
//   CSidebarHeader,
//   CNavGroup,
//   CSidebarBrand,
//   CSidebarNav,
//   CNavTitle,
//   CBadge,
//   CNavItem,
// } from "@coreui/react";
// import SelectGenre from "@/components/SelectGenre";

// export default function Sidebar() {
//     const [selectedGenres, setSelectedGenres] = React.useState<string[]>([]);

//   const handleGenreChange = (newGenres: string[]) => {
//     setSelectedGenres(newGenres);

// return (
// <CSidebar className="border-end">
//   <CSidebarHeader className="border-bottom">
//     <CSidebarBrand>AniList</CSidebarBrand>
//   </CSidebarHeader>
//   <CSidebarNav>
//     <CNavTitle>Filter</CNavTitle>
//     <CNavItem> <SelectGenre
//           selectedGenres={selectedGenres}
//           onGenreChange={handleGenreChange}
//         />
//         </CNavItem>
//     <CNavItem href="#">
//       {" "}
//       With badge <CBadge color="primary ms-auto">NEW</CBadge>
//     </CNavItem>
//     <CNavGroup toggler={<>Nav dropdown</>}>
//       <CNavItem href="#">
//         <span className="nav-icon">
//           <span className="nav-icon-bullet"></span>
//         </span>{" "}
//         Nav dropdown item
//       </CNavItem>
//       <CNavItem href="#">
//         <span className="nav-icon">
//           <span className="nav-icon-bullet"></span>
//         </span>{" "}
//         Nav dropdown item
//       </CNavItem>
//     </CNavGroup>
//     <CNavItem href="https://coreui.io">Download CoreUI</CNavItem>
//     <CNavItem href="https://coreui.io/pro/"> Try CoreUI PRO</CNavItem>
//   </CSidebarNav>
//   <CSidebarHeader className="border-top">
//     <CSidebarToggler />
//   </CSidebarHeader>
// </CSidebar>;
