const express = require('express');
const stockService = require('../services/stockService');

const router = express.Router();

router.post('/createStockList',
   async(req,res,next) => {
      try{
         console.log(req.body);
         req.body.forEach(async p => {
         const createdStock = await stockService.create(p);
      });
         res.status(200).send();
      }catch(error){
         res.status(400).send();
         console.log(error);
      }
      next();
   });

router.get('/getAllStock', async (req,res,next) => {
   const stocks = await stockService.getAll(req.query);
   res.status(200).json({
      stocks
   });
   next();
});

router.post('/createStock',
  async(req,res,next) => {
      try{
         const createdStock = await stockService.create(req.body);
         if (createdStock != null){
            res.status(200).send({createdStock});
            res.locals.createdOk = true;
            console.log(res.locals);
         }
         else
            res.status(403).send({ error: "stock already exists!" });
      }catch(error){
         console.log(error);
         res.status(400).send();
      }
      next();
   },
   );

router.get('/getStock', async (req,res,next) => {
   try {
	   console.log(req.query)
      const stock = await stockService.getByName(req.query);
      if (stock != null)
         res.status(201).json({stock});
      else
         res.status(204).send();
   } catch {
      res.status(404).send({ error: "Error" });
   }
   next();
});

router.delete('/deleteStock', async(req,res,next) => {
   try{
      const deletedStock = await stockService.deleteByName(req.query);
      if (deletedStock != null){
         res.locals.deletedOk = true;
         res.status(200).send({deletedStock});
      }
      else
         res.status(202).send({ error: "Stock doesn't exists!" });
   }catch(error){
      console.log(error);
      res.status(404).send();
   }
   next();
});

module.exports = router;
