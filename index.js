const {initializeDatabase} = require("./db/db.connect")
const express = require("express")
const cors = require("cors")

const corsOption = {
  option: "*",
  credentials: true
}
initializeDatabase()

const Hotel = require("./models/hotel.models")
const app = express()
app.use(express.json())
app.use(cors(corsOption))
// const newHotel = {
//     name: "New Hotel",
//     category: "Mid-Range",
//     location: "123 Main Street, Frazer Town",
//     rating: 4.0,
//     reviews: [],
//     website: "https://hotel-example.com",
//     phoneNumber: "+1234567890",
//     checkInTime: "2:00 PM",
//     checkOutTime: "12:00 PM",
//     amenities: ["Laundry", "Room Service"],
//     priceRange: "$$$ (31-60)",
//     reservationsNeeded: true,
//     isParkingAvailable: true,
//     isWifiAvailable: true,
//     isPoolAvailable: false,
//     isSpaAvailable: false,
//     isRestaurantAvailable: true,
//     photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
//   };

  // async function saveData() {
  //   try{
  //       const hotel = new Hotel(newHotel);
  //       await hotel.save()
  //       console.log("Data Saved Succesfully")
  //   }catch(error){
  //       throw error
  //   }
  // }
  // saveData()

  async function getAllHotels(){
    try{
      const allHotels = await Hotel.find()
    return allHotels
    }catch(error){
      console.log(error)
    }
  }

  app.get("/hotels" ,async(req,res) =>{
    try{
const allHotels = await getAllHotels()
if(allHotels.length != 0){
  res.json(allHotels)
}else{
  res.status(404).json({message: "Error in fetching hotels"})
}
    }catch(error){
      res.status(500).json({error: "Failed to get hotels"})
    }
  })


  async function deleteHotel(hotelId){
try{
  const deletedHotel = await Hotel.findByIdAndDelete(hotelId)
  return deletedHotel
}catch(error){
  console.log(error)
}
  }
 app.get("/hotels/:hotelId",async(req,res) =>{
  try{
    const hotelId = await deleteHotel(req.params.id)
    if(hotelId){
      res.status(200).json({message:"Hotel deleted successfully" ,hotel: hotelId})
    }else{
      res.status(400).json({messgae: "Error in deleting hotel"})
    }
  }catch(error){
    res.status(500).json({error:"Error in deleting hotel"})
  }
 })

  const PORT = 3002

  app.listen(PORT , () => {
    console.log("Server is running on ",PORT)
  })
  