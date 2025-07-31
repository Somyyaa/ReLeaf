import logo from "./logo.svg";
import gmail_logo from "./gmail_logo.svg";
import facebook_logo from "./facebook_logo.svg";
import instagram_logo from "./instagram_logo.svg";
import twitter_logo from "./twitter_logo.svg";
import menu_icon from "./menu_icon.svg";
import search_icon from "./search_icon.svg"
import close_icon from "./close_icon.svg"
import users_icon from "./users_icon.svg"
import car_icon from "./car_icon.svg"
import location_icon from "./location_icon.svg"
import fuel_icon from "./fuel_icon.svg"
import addIcon from "./addIcon.svg"
import carIcon from "./carIcon.svg"
import carIconColored from "./carIconColored.svg"
import dashboardIcon from "./dashboardIcon.svg"
import dashboardIconColored from "./dashboardIconColored.svg"
import addIconColored from "./addIconColored.svg"
import listIcon from "./listIcon.svg"
import listIconColored from "./listIconColored.svg"
import cautionIconColored from "./cautionIconColored.svg"
import arrow_icon from "./arrow_icon.svg"
import star_icon from "./star_icon.svg"
import check_icon from "./check_icon.svg"
import tick_icon from "./tick_icon.svg"
import delete_icon from "./delete_icon.svg"
import eye_icon from "./eye_icon.svg"
import eye_close_icon from "./eye_close_icon.svg"
import filter_icon from "./filter_icon.svg"
import edit_icon from "./edit_icon.svg"
import calendar_icon_colored from "./calendar_icon_colored.svg"
import location_icon_colored from "./location_icon_colored.svg"
import testimonial_image_1 from "./testimonial_image_1.png"
import testimonial_image_2 from "./testimonial_image_2.png"
import main_farm from "./main_farm1.png"
import banner_farm_image from "./main_farm1.png"
import user_profile from "./user_profile.png"
import upload_icon from "./upload_icon.svg"
import waste_image1 from "./cereal-straw-and-husk.png"
import waste_image2 from "./wheat_stubble.png"
import waste_image3 from "./rice_husk.png"
import waste_image4 from "./bagasse.png"

export const cityList = ['Amritsar', 'Ludhiana', 'Firozpur', 'Patiala', 'Karnal', 'Ambala', 'Panipat']

export const assets = {
    logo,
    gmail_logo,
    facebook_logo,
    instagram_logo,
    twitter_logo,
    menu_icon,
    search_icon,
    close_icon,
    users_icon,
    edit_icon,
    car_icon,
    location_icon,
    fuel_icon,
    addIcon,
    carIcon,
    carIconColored,
    dashboardIcon,
    dashboardIconColored,
    addIconColored,
    listIcon,
    listIconColored,
    cautionIconColored,
    calendar_icon_colored,
    location_icon_colored,
    arrow_icon,
    star_icon,
    check_icon,
    tick_icon,
    delete_icon,
    eye_icon,
    eye_close_icon,
    filter_icon,
    testimonial_image_1,
    testimonial_image_2,
    main_farm,
    banner_farm_image,
    waste_image1,
    upload_icon,
    user_profile,
    waste_image2,
    waste_image3,
    waste_image4
}

export const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Residue Available", path: "/Wastes" },
    { name: "My Bookings", path: "/my-bookings" },
]

export const ownerMenuLinks = [
    { name: "Dashboard", path: "/owner", icon: dashboardIcon, coloredIcon: dashboardIconColored },
    { name: "Add Waste", path: "/owner/add-waste", icon: addIcon, coloredIcon: addIconColored },
    { name: "Manage Waste", path: "/owner/manage--waste", icon: star_icon, coloredIcon: star_icon },
    { name: "Manage Bookings", path: "/owner/manage-bookings", icon: listIcon, coloredIcon: listIconColored },
]

export const dummyUserData = {
  "_id": "6847f7cab3d8daecdb517095",
  "name": "Mohit",
  "email": "admin@example.com",
  "role": "owner",
  "image": user_profile,
}

export const dummyWasteData = [
    {
        "_id": "67ff5bc069c03d4e45f30b77",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "wasteName": "Cereal straw and husk", 
        "weight": 10,
        "image": waste_image1,
        "email": "abc@gmail.com",
        "proDate": "23-03-2025",
        "price": 10,
        "location": "Ludhiana",
        "chemUsage": "Cereal husks from crops like maize, barley, or millet may retain traces of pre- and post-emergent herbicides such as atrazine and pendimethalin",
        "isAvaliable": true,
        "createdAt": "2025-04-16T07:26:56.215Z",
    },
    {
        "_id": "67ff6b758f1b3684286a2a65",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "wasteName": "Wheat stubble",
        "weight": 12,
        "image": waste_image2,
        "email": "xyz@gmail.com",
        "proDate": "14-04-2025",
        "price": 8,
        "location": "Panipat",
        "chemUsage": "Wheat stubble may contain residues of nitrogen-rich fertilizers like urea and ammonium nitrate, as well as phosphates such as DAP.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:33:57.993Z",
    },
    {
        "_id": "67ff6b9f8f1b3684286a2a68",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "wasteName": "Rice husk ",
        "weight": 15,
        "image": waste_image3,
        "email": "pyq@gmail.com",
        "proDate": "03-05-2025",
        "price": 12,
        "location": "Firozpur",
        "chemUsage": "Rice husk carries residues of fertilizers like urea and zinc sulfate. Herbicides such as butachlor and pretilachlor are frequently used in paddy fields and can remain active in the waste.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    },
    {
        "_id": "68009c93a3f5fc6338ea7e34",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "wasteName": "Sugarcane Bagasse ",
        "weight": 17,
        "image": waste_image4,
        "email": "abc@gmail_logo.com",
        "proDate": "23-06-2025",
        "price": 20,
        "location": "Patiala",
        "chemUsage": "Herbicides such as metribuzin and atrazine are commonly used during early crop stages and may persist in low amounts. Pesticides like malathion and growth regulators like ethephon (used for uniform ripening) can also be found.",
        "isAvaliable": true,
        "createdAt": "2025-04-16T08:34:39.592Z",
    }
];

export const dummyMyBookingsData = [
    {
        "_id": "68482bcc98eb9722b7751f70",
        "waste": dummyWasteData[0],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-13T00:00:00.000Z",
        "status": "confirmed",
        "price": 10,
        "createdAt": "2025-06-10T12:57:48.244Z",
    },
    {
        "_id": "68482bb598eb9722b7751f60",
        "waste": dummyWasteData[1],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-12T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 8,
        "createdAt": "2025-06-10T12:57:25.613Z",
    },
    {
        "_id": "684800fa0fb481c5cfd92e56",
        "waste": dummyWasteData[2],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "67fe3467ed8a8fe17d0ba6e2",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "pending",
        "price": 12,
        "createdAt": "2025-06-10T09:55:06.379Z",
    },
    {
        "_id": "6847fe790fb481c5cfd92d94",
        "waste": dummyWasteData[3],
        "user": "6847f7cab3d8daecdb517095",
        "owner": "6847f7cab3d8daecdb517095",
        "pickupDate": "2025-06-11T00:00:00.000Z",
        "returnDate": "2025-06-12T00:00:00.000Z",
        "status": "confirmed",
        "price": 20,
        "createdAt": "2025-06-10T09:44:25.410Z",
    }
]

export const dummyDashboardData = {
    "totalBookings": 2,
    "pendingBookings": 0,
    "completedBookings": 2,
    "recentBookings": [
        dummyMyBookingsData[0],
        dummyMyBookingsData[1]
    ],
    "monthlyRevenue": 560,
    "totalWeight": 24
}