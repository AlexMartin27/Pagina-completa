import express from "express";
import cors from "cors";

//SDK de Mercado Pafo
import {MercadoPagoConfig, Preference} from 'mercadopago';
//Agregar credenciales
const client = new MercadoPagoConfig({ accessToken: 'YOUR_ACCESS_TOKE'});

const app = express();
const port = 3000;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Soy el server :)");
});




app.post("/create_preference", async (req,res)=>{
    try{
const body = {
    items: [
        {
        title: req.body.title,
        quantity: Number(req.body.quantity),
        unit_price: Number(req.body.price),
        currency_id: "USD",
    },
],
back_urls: {
    succes:"https://www.youtube.com/@onthecode",
    failure:"https://www.youtube.com/@onthecode",
    pending:"https://www.youtube.com/@onthecode",
},
auto_return: "approved",
};

    const preference = new Preference(client);
    const result = await preference.createCheckoutButton({ body});
    res.json({
        id: result.id,
    })

    }catch(error){
console.log(error)
res.status(500).json({
    error: "Error al crear la preferencia :("
})
}
})


app.listen(port, () =>{
    console.log(`El servidor esta corriendo en el puerto ${port}`)
})
