
import express from "express"
import cors from "cors"
import { configDotenv } from "dotenv";
import { connectDB } from "./config/DB.js";
import { foodRouter } from "./routes/foodRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { cartRouter } from "./routes/cartRoute.js";
import { orderRouter } from "./routes/orderRoute.js"
import { aiRouter } from "./routes/aiRoute.js";

configDotenv();



// app configaretion...
const app = express();
const port = process.env.PORT || 2000;

// middleware....
app.use(express.json());
app.use(cors());

// DB connection...
connectDB();

// api endpoind...
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);
app.use("/api/ai", aiRouter);


app.get("/", (req, res) => {
    res.send("API is working...");
});

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);

})

//